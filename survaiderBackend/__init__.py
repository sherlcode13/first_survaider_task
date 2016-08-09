from flask import Flask
from flask.ext.pymongo import PyMongo
from pymongo import MongoClient
from HotelApi import hotel_api
from HotelUnitApi import hotel_unit_api
app = Flask(__name__)
con = MongoClient('localhost',27017)
db = con.suvaider
APP_URL = "http://127.0.0.1:5000"


app.register_blueprint(hotel_api)
app.register_blueprint(hotel_unit_api)

if __name__ == '__main__':
	app.run(debug=true)