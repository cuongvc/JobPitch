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
TemplateApp.directive('scroll',function($window,$parse){	
	return {
		restrict: 'AE',
		scope: {
			LoadMore: '&',
		},
		link: function(scope,element,attrs){
	        angular.element($window).bind("scroll", function() {
	        	console.log(scope.LoadMore);
	            var height = {
	            	jobs: $('#jobs').height(),
	            	sidebar: $('#sidebar').height(),
	            };
	            if(height.jobs < height.sidebar){
	            	height.short = height.jobs;
	            }else{
	            	height.short = height.sidebar;
	            }
	            var scrollTop = $(window).scrollTop();
	            if(scrollTop > height.short - 100){
	            	
	            }
	        });
		}
	}
})

