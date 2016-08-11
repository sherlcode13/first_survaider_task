from flask import request,json,Blueprint
from flask import request,redirect,url_for,jsonify
from bson.json_util import dumps,loads
from flask_restful import Api
from flask.ext.pymongo import PyMongo
from pymongo import MongoClient
from survaiderBackend.utility import *

con = MongoClient('localhost',27017)
db = con.suvaider

hotel_unit_api = Blueprint('hotel_unit_api',__name__)

@hotel_unit_api.route('/hotel/unit',methods=["GET"])
def get():
	id = request.args.get("property_id","")
	print (id)
	if id:
		cursor = db.Reviews.aggregate([{"$match":{"property_id":id} },{"$group":{"_id":"$sentiment","count":{"$sum":1}}}])
		graph_data = [c for c in cursor]
		if len(graph_data) > 0 :
			data = {"g_data":graph_data}
			return jsonify({"status":"ok","data":data})
		else:
			return response_error("There is no info about this unit.")
	else:
		return response_error("Please provide property_id of units")


