from flask import Flask
from flask.ext.pymongo import PyMongo
from pymongo import MongoClient
from HotelApi import hotel_api
from HotelUnitApi import hotel_unit_api
from Reviews import review_api
app = Flask(__name__)
con = MongoClient('localhost',27017)
db = con.suvaider
APP_URL = "http://127.0.0.1:5000"


app.register_blueprint(hotel_api)
app.register_blueprint(hotel_unit_api)
app.register_blueprint(review_api)

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  return response

if __name__ == '__main__':
	app.run(debug=true)