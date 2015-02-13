var CompanyAbout = angular.module('company-about',[]);
CompanyAbout.directive('companyAbout',function(){
	return {
		restrict: 'E',
		templateUrl: '/directives/company/company-about.html',
		link: function(scope,element,attrs){

		},
	}
})