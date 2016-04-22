import thriftpy
tasks = thriftpy.load("tasks.thrift", module_name="tasks_thrift")

from thriftpy.rpc import make_server

from db import TaskDB

class Dispatcher(object):
    def ping(self):
        return "pong"

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
        print(instance)
        task = tasks.Task()
        task.id = str(instance['_id'])
        task.userId = instance['userId']
        task.name = instance['name']
        task.createdOn = instance['createdOn'].isoformat()
        task.done = instance['done']
        print(task)
        return task

    def update(self, id, name, done):
        print('update(%s, %s, %b)' % (id, name, done))
        task = tasks.Task(id,'userId',name,'createdOn',done)
        return task

server = make_server(tasks.Tasks, TaskHandler(), '127.0.0.1', 6000)
server.serve()
