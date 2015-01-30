var Jobs = angular.module('jobs',['nightfury-upload']);
Jobs.directive('jobs',function(){
	return {
		restrict: 'E',
		templateUrl: '/directive/home/jobs',
		link: function(scope,element,attrs){

		},
	}
})
Jobs.controller('JobCtrl',function($scope,$http){
	var jobs;
	var data = {
			user_id: $scope.user._id,
			token: $scope.user.token,
			lat: 21.018549,
			lng: 105.812198,
			address: "9 Nguyên Hong, Thành Công, Ba Đình, Hà Nội, Việt Nam"
		}
	$http.post(STR_API_RECENT,data).success(function(response){
		console.log(response);
		if(response.error_code == 0){
			jobs = response.jobs;
		}
		if(jobs != undefined){
			jobs.forEach(function(v,k){
				if(v.description.length > 144){
					jobs[k].description = jobs[k].description.substring(0,144) + '...';
				}
			})
		}
		$scope.jobs = jobs;
	})
	return;
	$scope.jobs = jobs;
	$scope.ViewJob = function(){
		console.log('ViewJob');
		$('#JobModal').modal('show');
	}
	$scope.ViewCompanyProfile = function(evt,id){
		evt.stopPropagation();
		console.log('a');
	}
})