from flask import request,json,Blueprint
from flask import request,redirect,url_for,jsonify
from bson.json_util import dumps,loads
from flask_restful import Api
from flask.ext.pymongo import PyMongo
from pymongo import MongoClient
from survaiderBackend.utility import *
con = MongoClient('localhost',27017)
db = con.suvaider

hotel_api = Blueprint('hotel_api',__name__)

@hotel_api.route('/hotel',methods=["GET"])
def get():
	name = request.args.get("name","")
	print name
	if name:
		print name
		units = db.Hotels.find_one({"parent.name":name})
		if units:
			print "I'm working."
			return request_utility(db,units)
		else:
			return response_error("This hotel name does not exist")
	else:
		units = db.Hotels.find_one()
		if units:
			return request_utility(db,units)
		else:
			return response_error("There is no hotel in db.")


