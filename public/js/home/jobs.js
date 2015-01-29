var Jobs = angular.module('jobs',[]);
Jobs.directive('jobs',function(){
	return {
		restrict: 'E',
		templateUrl: '/directive/home/jobs',
		link: function(scope,element,attrs){

		},
	}
})
Jobs.controller('JobCtrl',function($scope,$http){
	var jobs = new Array();
	for(i=0; i < 50; i++){
		var job = new Object();
		jobs.push(job);
	}
	var data = {
		    token         : "$2a$08$X0jvCjP377cp5eqPAwVvr.uZqLN/AssoagMvMBs0YG576LUMZFDSa",
		    user_id       : "54c8580e86d5ce565ceb3168",
		    lat           : 21.018549,
		    lng           : 105.812198,
		    tag           : "HR",
		    address       : "9 Nguyên Hồng, Thành Công, Ba Đình, Hà Nội, Việt Nam"
		};
	$http.post(STR_API_RECENT,data).success(function(response){
		console.log(response);
		
	})
	return;
	$scope.jobs = jobs;
	$scope.ViewJob = function(){
		$('#JobModal').modal('show');
	}
	$scope.ViewCompanyProfile = function(evt,id){
		evt.stopPropagation();
		console.log('a');
	}
})