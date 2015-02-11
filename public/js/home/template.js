var TemplateApp = angular.module('TemplateApp',['ngRoute','header','footer','jobs','create-job','setting','database','pitch.service','job.service','hashtag.service']);
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

