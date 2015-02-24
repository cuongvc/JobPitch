var MobileApp = angular.module('MobileApp',['ngRoute','mobile-nav','mobile-job','user-service','pitch.service','job.service','hashtag.service','like.service','interest.service','route.service','socket.service']);

MobileApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider.
		when('/mobile', {
			templateUrl: 'directives/mobile/index.html',   
			controller: 'IndexCtrl'
		}).
		when('/mobile/pitch', {
			templateUrl: '../directives/mobile/pitch.html', 
			controller: 'MobilePitchCtrl'
		}).
		when('/mobile/notification', {
			templateUrl: '../directives/mobile/notification.html', 
			controller: 'MobileNotificationCtrl'
		}).
		when('/mobile/message', {
			templateUrl: '../directives/mobile/message.html', 
			controller: 'MobileMessageCtrl'
		}).
		when('/mobile/user/:user_id', {
			templateUrl: '../directives/mobile/profile.html', 
			controller: 'ProfileCtrl'
		}).
		when('/mobile/u/:user_id', {
			templateUrl: '../directives/mobile/user/user-profile.html', 
			controller: 'UserProfileCtrl'
		}).
		otherwise({redirectTo: '/mobile'});

		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});

}]);