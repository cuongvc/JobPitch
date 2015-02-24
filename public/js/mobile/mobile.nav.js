var MobileNav = angular.module('mobile-nav',['route.service']);

MobileNav.directive('mobileNav',function(){
	return {
		restrict: 'E',
		templateUrl: 'directives/mobile/nav.html',
		link: function(scope,element,attrs){
			$(".button-collapse").sideNav();
			$('ul.tabs').tabs();
		},
		controller: 'MobileNavCtrl',
	}
})
MobileNav.controller('MobileNavCtrl',function($scope,$http,ROUTE){
	$scope.user = user;
	$scope.LoadTab = function(tab_id,evt){
		switch(tab_id){
			case 1: 
				ROUTE.RedirectTo('/mobile',evt);
				break;
			case 2: 
				ROUTE.RedirectTo('/mobile/pitch',evt);
				break;
			case 3: 
				ROUTE.RedirectTo('/mobile/notification',evt);
				break;
			case 4: 
				ROUTE.RedirectTo('/mobile/message',evt);
				break;
		}
	}
})