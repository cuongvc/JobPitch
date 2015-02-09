var TemplateApp = angular.module('TemplateApp',['ngRoute','header','footer','jobs','create-job','setting','database']);
TemplateApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider.
		when('/', {
			templateUrl: 'directives/index.html',   
			controller: 'IndexCtrl'
		}).
		when('/user/:user_id', {
			templateUrl: '../directives/profile.html', 
			controller: 'ProfileCtrl'
		}).
		otherwise({redirectTo: '/'});

		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});

}]);

TemplateApp.controller('ProfileCtrl',function($scope,$http,$routeParams){
	$scope.BASE_URL = BASE_URL;
	$scope.user     = user;
	$scope.logedin  = logedin;
	var profile;
	var data = {
		user_id: $scope.user._id,
		token: $scope.user.token,
		users: [$routeParams.user_id],
	}

	$http.post(STR_API_GET_USER,data).success(function(response){
		console.log(response);
		if(response.error_code == 0){
			profile = response.users[0];
			if(profile.followMes.indexOf($scope.user._id) < 0){
				profile.followed = false;
			}else{
				profile.followed = true;
			}
			profile.follow_number = profile.followMes.length;
			profile.jobs_number = profile.myJobs.length;
			$scope.profile = profile;
		} 
	})
	$scope.follow = function(){
		var data = {
			user_id: $scope.user._id,
			token: $scope.user.token,
			user_follow_id: $routeParams.user_id,
		}
		console.log(data);
		$http.post(STR_API_FOLLOW,data).success(function(response){
			console.log(response);
			if(response.error_code == 0){
				if(profile.followed == true){
					profile.followed = false;
					var index = profile.followMes.indexOf($scope.user._id);
					profile.followMes.splice(index,1);
					profile.follow_number--;
				}else{
					profile.followed = true;
					profile.followMes.push($scope.user._id);
					profile.follow_number++;
				}
				$scope.profile = profile;
			}
		})
	}
})