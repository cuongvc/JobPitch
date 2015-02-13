var CompanyContact = angular.module('company-contact',[]);
CompanyContact.directive('companyContact',function(){
	return {
		restrict: 'E',
		templateUrl: '/directives/company/company-contact.html',
		link: function(scope,element,attrs){

		},
	}
})