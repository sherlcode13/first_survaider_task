from pymongo import MongoClient

con = MongoClient('localhost',27017)
DB_NAME = "suvaider"
db = con[DB_NAME] #suvaider is the name of db here