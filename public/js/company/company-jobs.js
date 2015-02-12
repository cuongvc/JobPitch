var CompanyJob = angular.module('company-job',[]);
CompanyJob.directive('companyJob',function(){
	return {
		restrict: 'E',
		templateUrl: '/directives/company/company-job.html',
		link: function(scope,element,attrs){

		},
	}
})