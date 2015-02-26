var CompanyService = angular.module('company.service',[]);
	CompanyService.service('COMPANY',function($q,$http){
		this.getTop = function(){
			var defferer = $q.defer();
			$http.get(STR_API_TOP_COMPANY).success(function(response){
				defferer.resolve(response);
			})
			return defferer.promise;
		}
	})