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
TemplateApp.controller('IndexCtrl',function($scope,$http){
	$scope.user    = user;
	$scope.logedin = logedin;
})
TemplateApp.controller('ProfileCtrl',function($scope,$http,$routeParams){
	$scope.user    = user;
	$scope.logedin = logedin;
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
			alert('ok');
		})
	}
})