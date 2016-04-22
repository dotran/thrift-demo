from pymongo import MongoClient
import pymongo
import datetime

baseUrl = 'mongodb://localhost:27017'
database = 'tasks-db'

# client = MongoClient('%s/%s' % (baseUrl, database))
db = MongoClient(baseUrl)
client = db[database]

class TaskDB:
    @staticmethod
    def all(userId):
        print('do you want all the tasks for %s' % userId)
        print(client)
        return client.tasks.find({"userId": userId}).sort("createdOn", pymongo.DESCENDING)
        # tasksCursor = client.tasks.find({"userId": userId})
        # tasks = []
        # for task in tasksCursor:
        #     tasks.append(task)
        # print(tasks)
        # return tasks
        # return client.tasks.find({"userId": userId}, sort={"createdOn": -1})

    @staticmethod
    def addOne(userId, name):
        print('will add one')
        print(client)
        print('we will add this shit now %s, %s' % (userId, name))
        instance = {"userId": userId, "name": name, "createdOn": datetime.datetime.utcnow(), "done": False}
        # print(instance)
        instance_id = client.tasks.insert_one(instance).inserted_id
        instance["_id"] = instance_id
        return instance
