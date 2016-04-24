from pymongo import MongoClient
import pymongo
import datetime

baseUrl = 'mongodb://localhost:27017'
database = 'tasks-db'

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
