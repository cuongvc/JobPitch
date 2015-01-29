var Header = angular.module('header',[]);
Header.directive('header',function(){
	return {
		restrict: 'E',
		templateUrl: '/directive/home/header',
		link: function(scope,element,attrs){

		},
	}
})
Header.controller('HeaderCtrl',function($scope,$http){
	
})