'use strict';

/**
 * @ngdoc function
 * @name survaiderFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the survaiderFrontendApp
 */

 angular.module('survaiderFrontendApp')
 	.service('GetData',function($http){
 		var baseUrl = 'http://localhost:5000/hotel';
 		var service = this;
 		
 		function getParentData(hname){
 			if(hname)
 				return $http.get(baseUrl,{params:{name:hname}});
 			else
 				return $http.get(baseUrl);
 		}

 		function getUnitData(id){
 			console.log(id);
 			if(id){
 				return $http.get(baseUrl+'/unit',{params:{property_id:id}});
 			}
 		}

 		function getReviews(id,start_obj_id,end_obj_id,to){
 			if(id){
 				return $http.get(baseUrl+'/reviews',
 					{params:{property_id:id,start_id:start_obj_id,end_id:end_obj_id,to_move:to}}
 					);
 			}
 		}

 		service.getParentData = getParentData;
 		service.getUnitData  =getUnitData;
 		service.getReviews = getReviews;
 		return service;
 	});


