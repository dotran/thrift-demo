import json

with open('../config.json') as data_file:
    data = json.load(data_file)

class Config:
    @staticmethod
    def getTaskDBConfig():
        return data['taskdb']

    @staticmethod
    def getTaskServiceConfig():
        return data['taskservice']
