import glob
import sys
sys.path.append('gen-py')
import thrift

# from tasks import Tasks
from tasks import Tasks
from tasks.ttypes import Task

# from shared.ttypes import SharedStruct

from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol
from thrift.server import TServer


class TaskHandler:
    def __init__(self):
        self.log = {}

    def all(self):
        return []

    def add(self, userId, name):
        print('add(%s,%s)' % (userId, name))
        task = Task('id',userId,name,'createdOn',False)
        # task.id = 'id'
        # task.userId = userId
        # task.name = name
        # task.createdOn = 'createdOn'
        # task.done = False
        return task

    def update(self, id, name, done):
        print('update(%s, %s, %b)' % (id, name, done))
        task = Task(id,'userId',name,'createdOn',done)
        return task

if __name__ == '__main__':
    handler = TaskHandler()
    processor = Tasks.Processor(handler)
    transport = TSocket.TServerSocket(port=9090)
    tfactory = TTransport.TBufferedTransportFactory()
    pfactory = TBinaryProtocol.TBinaryProtocolFactory()

    server = TServer.TSimpleServer(processor, transport, tfactory, pfactory)

    print('main')
