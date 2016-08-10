'use strict';

/**
 * @ngdoc function
 * @name survaiderFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the survaiderFrontendApp
 */
angular.module('survaiderFrontendApp')
  .controller('MainCtrl', ['$scope','GetData',function ($scope,GetData) {
   
   	$scope.hotelName = "Sterling Holiday Resorts";
   	$scope.data = [];
   	$scope.unitData = {};
   	$scope.units = [];
  	GetData.getParentData($scope.hotelName).then(function(res){
  		console.log(res.data.data);
  		angular.forEach(res.data.data.g_data,function(val){
  			$scope.data.push({key:val._id,y:val.count});
  		});
  		$scope.unitData = JSON.parse(res.data.data.units);
  		$scope.units = $scope.unitData.units;
  		console.log($scope.units);
  	});
  		$scope.options = {
  			chart:{
  				type: 'pieChart',
  				height: 300,
  				x: function(d) { return d.key;},
  				y: function(d) { return d.y;},
  				showLabels:false
  			}
  		};
  
  	
  }]);
