from flask import request,json,Blueprint
from flask import request,redirect,url_for,jsonify
from bson import json_util,ObjectId
from bson.json_util import dumps,loads
from flask_restful import Api
from flask.ext.pymongo import PyMongo
from pymongo import MongoClient

con = MongoClient('localhost',27017)
db = con.suvaider

review_api = Blueprint('review_api',__name__)

@review_api.route('/hotel/reviews',methods=["GET"])
def get():

	id = request.args.get('property_id',None)
	start_id = request.args.get('start_id',None)
	end_id   = request.args.get('end_id',None)
	start_id = ObjectId(start_id) if not None else None # From this id to previous 10 id's
	end_id = ObjectId(end_id) if not None else None # From this id to next 10 id's
	to_move = request.args.get('to_move',1) # This value tell us we query for previous page or next page.

	if id:

		if not start_id and not end_id:
			cursor = db.Reviews.find({"property_id":id}).limit(10).sort([["_id",-1]])
		else:
			to_move = int(to_move)
			if to_move == 1:
				#print "Holllla"
				#print end_id
				cursor = db.Reviews.find({"property_id":id , "_id":{"$lt" : end_id}}).limit(10).sort([["_id",-1]])
			else:
				cursor = db.Reviews.find({"property_id":id, "_id":{"$gt" : start_id}}).limit(10).sort([["_id",-1]])
		
		print cursor
		
		review_data = [{"property_id":c['property_id'],"review":c['review'],"review_link":c['review_link'],"rating":c['rating'],"_id":str(c["_id"])} for c in cursor]
		print review_data
		if len(review_data) > 0 :
			return jsonify({"status":"ok","data":review_data})
		else:
			return jsonify({"status":"ok","response":"We do not have any review for this hotel."})
	else:
		return jsonify({"status":"not found","response":"nothing to show."})
		
