var Footer = angular.module('footer',[]);
Footer.directive('footer',function(){
	return {
		restrict: 'E',
		templateUrl: '/directive/home/footer',
		link: function(scope,element,attrs){

		},
	}
})