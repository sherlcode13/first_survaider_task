'use strict';

/**
 * @ngdoc function
 * @name survaiderFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the survaiderFrontendApp
 */

angular.module('survaiderFrontendApp')
  .controller('UnitCtrl', function ($scope, $stateParams, GetData) {

  		$scope.id = $stateParams.id;
  		$scope.hotelName = $stateParams.name;
  		$scope.data = [];
  		if(!$scope.id) $scope.id = "djpKvjWr1mxvMx2bjol";
  		if(!$scope.hotelName) $scope.hotelName = "Villagio,Goa";
  		$scope.start_id = null;
  		$scope.end_id = null;
        $scope.reviews = [];

  		GetData.getUnitData($scope.id).then(function(res){
  			console.log(res);
  			angular.forEach(res.data.data.g_data,function(val){
  				$scope.data.push({key:val._id,y:val.count});
  			});
  			console.log($scope.data);
  		})
    
  		$scope.options = {
  			chart:{
  				type: 'pieChart',
  				height: 300,
  				x: function(d) { return d.key;},
  				y: function(d) { return d.y;},
  				showLabels:false
  			}
  		};

  		GetData.getReviews($scope.id).then(function(res){
  			console.log(res);
  			$scope.start_id = res.data.data[0]._id;
  			$scope.end_id  = res.data.data[res.data.data.length - 1]._id;
  			angular.forEach(res.data.data,function(val){
  				$scope.reviews.push(val);
  			});
  		});

  		$scope.previousReviews = function(){
  			$scope.reviews.length = 0;
  			GetData.getReviews($scope.id,$scope.start_id,$scope.end_id,-1).then(function(res){
  				console.log(res);
	  			$scope.start_id = res.data.data[0]._id;
	  			$scope.end_id  = res.data.data[res.data.data.length - 1]._id;
	  			angular.forEach(res.data.data,function(val){
	  				$scope.reviews.push(val);
  				});
  			});
  		};

  		$scope.nextReviews = function(){
  			$scope.reviews.length = 0;
  			GetData.getReviews($scope.id,$scope.start_id,$scope.end_id,1).then(function(res){
  				console.log(res);
	  			$scope.start_id = res.data.data[0]._id;
	  			$scope.end_id  = res.data.data[res.data.data.length - 1]._id;
	  			angular.forEach(res.data.data,function(val){
	  				$scope.reviews.push(val);
  				});
  			});
  		};
  });