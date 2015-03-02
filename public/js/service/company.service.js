var CompanyService = angular.module('company.service',[]);
	CompanyService.service('COMPANY',function($q,$http){
		this.getTop = function(country,skip,limit){
			var defferer = $q.defer();
			var data = {
				country_short_name : country,
				skip               : 0,
				limit              : 10
			};
			$http.post(STR_API_TOP_COMPANY,data).success(function(response){
				defferer.resolve(response);
			})
			return defferer.promise;
		}
	})