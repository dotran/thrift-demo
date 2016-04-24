import glob
import sys
sys.path.append('gen-py')
import thrift

# from tasks import Tasks
from tasks import Tasks
from tasks.ttypes import Task

from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol
from thrift.server import TServer


from db import TaskDB

import logging
logging.basicConfig()


class TaskHandler:
    def __init__(self):
        self.log = {}

    def all(self, userId):
        print('getting all tasks for user: %s' % userId)
        cursor = TaskDB.all(userId)
        result = []
        task = None
        for t in cursor:
            result.append(TaskHandler.convertInstance(t))

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

    @staticmethod
    def convertInstance(instance):
        task = Task()
        task.id = str(instance['_id'])
        task.userId = instance['userId']
        task.name = instance['name']
        task.createdOn = instance['createdOn'].isoformat()
        task.done = instance['done']
        return task

if __name__ == '__main__':
    port = 6000
    handler = TaskHandler()
    processor = Tasks.Processor(handler)
    transport = TSocket.TServerSocket(port=port)
    tfactory = TTransport.TBufferedTransportFactory()
    pfactory = TBinaryProtocol.TBinaryProtocolFactory()

    server = TServer.TSimpleServer(processor, transport, tfactory, pfactory)

    print('main')
    server.serve()
