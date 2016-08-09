from flask import jsonify
from bson.json_util import dumps,loads

def response_error(msg):
	return jsonify({"status":"ok","response":msg})

def request_utility(db,units):
	tmp = [val["property_id"] for val in units["units"]]
	cursor = db.Reviews.aggregate([{"$match":{"property_id":{"$in":tmp}}},{"$group":{"_id":"$sentiment","count":{"$sum":1}}}])
	graph_data = [c for c in cursor]
	print graph_data
	units = dumps(units)
	if len(graph_data) > 0:
		data = {"units":units,"g_data":graph_data}
		print "I'm here."
		return jsonify({"status": "ok", "data": data})
	else:
		return response_error("This hotel has no unit.")