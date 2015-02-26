var TemplateApp = angular.module('TemplateApp',['ngRoute','header','company-job','company-about','company-contact','jobs','create-job','setting','database','pitch.service','job.service','hashtag.service']);
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
TemplateApp.directive('scroll',function($window,JOB){	
	return {
		restrict: 'AE',
		link: function(scope,element,attrs){
	        angular.element($window).bind("scroll", function() {
	        	if(window.location.pathname != '/') return;
	            var height = {
	            	jobs: $('#jobs').height(),
	            	sidebar: $('#sidebar').height(),
	            };
	            if(height.jobs < height.sidebar){
	            	height.short = {
	            		value: height.jobs,
	            		element: 'jobs',
	            	};
	            }else{
	            	height.short = {
	            		value: height.sidebar,
	            		element: 'sidebar'
	            	};
	            }
	            var scrollTop = $(window).scrollTop() + screen.height;
	            if(scrollTop >= height.short.value - 100){
	            	scope.LoadMore(height.short.element);
	            }
	        });
		}
	}
})

