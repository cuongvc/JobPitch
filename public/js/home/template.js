var TemplateApp = angular.module('TemplateApp',['ngRoute','header','company-job','company-about','company-contact','jobs','create-job','setting','database','pitch.service','job.service','hashtag.service','company.service']);
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
		when('/u/:user_id', {
			templateUrl: '../directives/user/user-profile.html', 
			controller: 'UserProfileCtrl'
		}).
		when('/job/:job_id', {
			templateUrl: '../directives/home/view-job.html', 
			controller: 'ViewJobCtrl'
		}).
		when('/search/:query', {
			templateUrl: '../directives/home/search/search-result.html', 
			controller: 'SearchResultCtrl'
		}).
		when('/tag/:tag', {
			templateUrl: '../directives/home/search/search-tag-result.html', 
			controller: 'SearchTagResultCtrl'
		}).
		when('/forgot-password', {
			templateUrl: '../directives/forgot-password.html', 
			controller: 'ForgotPasswordCtrl'
		}).
		otherwise({redirectTo: '/'});

		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});

}]);
TemplateApp.filter('unsafe', function($sce) { return $sce.trustAsHtml; });

TemplateApp.run(function($templateCache,$rootScope){
	$rootScope.user     = user;
	$rootScope.logedin  = logedin;
	$rootScope.BASE_URL = BASE_URL;
})