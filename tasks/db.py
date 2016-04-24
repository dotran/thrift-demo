from pymongo import MongoClient
from bson.objectid import ObjectId

import pymongo
import datetime
from config import Config

mongoConfig = Config.getTaskDBConfig()
baseUrl = 'mongodb://%s:%s' % (mongoConfig['host'], mongoConfig['port'])
database = mongoConfig['db']

db = MongoClient(baseUrl)
client = db[database]

class TaskDB:
    @staticmethod
    def all(userId):
        return client.tasks.find({"userId": userId}).sort("createdOn", pymongo.DESCENDING)

    @staticmethod
    def addOne(userId, name):
        instance = {"userId": userId, "name": name, "createdOn": datetime.datetime.utcnow(), "done": False}
        instance_id = client.tasks.insert_one(instance).inserted_id
        instance["_id"] = instance_id
        return instance

    @staticmethod
    def updateOne(id, userId, name=None, done=None):
        print('updateOne(%s,%s,%s,%s)' % (id, name, done, userId))
        criteria = {"userId": userId, "_id": ObjectId(id)}
        # instance = client.tasks.find_one(criteria)
        # print('got instance for update')
        # print(instance)
        # if (instance is not None):
        update = {}
        if (name is not None):
            print('setting name as %s' % name)
            update['name'] = name
        if (done is not None):
            print('setting done as %s' % done)
            update['done'] = done

            # print('will save now')
            # instance.save()

        result = client.tasks.update_one(criteria, {'$set': update})
        instance = None
        if (result.matched_count > 0):
            instance = client.tasks.find_one(criteria)

        return instance
