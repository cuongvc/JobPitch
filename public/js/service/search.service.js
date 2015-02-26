var SearchService = angular.module('search.service',[]);
	
	SearchService.service('SEARCH',function($q,$http){
		this.find = function(value){
			var defferer = $q.defer();
			var data = {
			    keyword				: value,
			    skip				: 0,
			    limit				: 10,
			    return_job			: 1,
			    return_app			: 1,
			    return_comment 		: 1
			};
			$http.post(STR_API_SEARCH_KEY_WORD,data).success(function(response){
				defferer.resolve(response);
			})
			return defferer.promise;
		}
		this.findTag = function(tag){
			value = tag;
			var defferer = $q.defer();
			var data = {
				tag : value,
				position : 3
			};
			$http.post(STR_API_SEARCH_HASHTAG,data).success(function(response){
				defferer.resolve(response);
			})
			return defferer.promise;
		}
	})