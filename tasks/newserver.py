import thriftpy
tasks = thriftpy.load("tasks.thrift", module_name="tasks_thrift")

from thriftpy.rpc import make_server
from thriftpy.protocol import TJSONProtocolFactory

from db import TaskDB

import logging
logging.basicConfig()

from config import Config

class TaskHandler(object):
    def all(self, userId):
        print('getting all tasks for user: %s' % userId)
        cursor = TaskDB.all(userId)
        result = []
        task = None
        for t in cursor:
            task = tasks.Task()
            task.id = str(t['_id'])
            task.name = t['name']
            task.createdOn = t['createdOn'].isoformat()
            task.userId = t['userId']
            task.done = t['done']
            result.append(task)

        return result

    def add(self, userId, name):
        print('add(%s,%s)' % (userId, name))
        instance = TaskDB.addOne(userId, name)

        task = TaskHandler.convertInstance(instance)
        return task

    def update(self, id, name, done, userId):
        print('update(%s, %s, %b, %s)' % (id, name, done, userId))

        instance = TaskDB.updateOne(id, name, done, userId)

        if (instance == None):
            exception = tasks.BaseException()
            exception.code = 404
            exception.mesage = 'Task not found'
            raise exception

        task = TaskHandler.convertInstance(instance)
        return task

    def upsert(self, task):
        print('upsert(%s)' % (task))
        if (task is None):
            exception = tasks.BaseException()
            exception.code = 400
            exception.message = 'Task data is invalid'

        try:
            if (task.id is not None):
                instance = TaskDB.updateOne(task.id, task.userId, task.name, task.done)
            else:
                instance = TaskDB.addOne(task.userId, task.name)
        except (Exception):
            exception = tasks.BaseException()
            exception.code = 400
            exception.message = 'Unkown error'
            raise exception

        print(instance)
        if (instance is None):
            exception = tasks.BaseException()
            exception.code = 404
            exception.message = 'Task not found'
            raise exception

        task = TaskHandler.convertInstance(instance)
        return task

    @staticmethod
    def convertInstance(instance):
        task = tasks.Task()
        task.id = str(instance['_id'])
        task.userId = instance['userId']
        task.name = instance['name']
        task.createdOn = instance['createdOn'].isoformat()
        task.done = instance['done']
        return task

host = Config.getTaskServiceConfig()['host']
port = Config.getTaskServiceConfig()['port']

print('Server is running on %s port %d' % (host, port))
server = make_server(tasks.Tasks,
                    TaskHandler(),
                    host,
                    port)
server.serve()
