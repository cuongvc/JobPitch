var HashTagService = angular.module('hashtag.service',[]);
HashTagService.service('HASHTAG',function($http,$q){
	this.findHashTag = function(str){
		var HashTags = str.match(/#\S+/g);
		if(HashTags == null) HashTags = [];
		return HashTags;
	}
	/*
	* get suggest hashtag
	*/
	this.getSuggestHashTag = function(){
		var defferer = $q.defer();
		$http.get(STR_API_SUGGEST_HASHTAG).success(function(data){
			defferer.resolve(data);
		})
		return defferer.promise;
	}
	/*
	* get top hashtag
	*/
	this.getTopHashTag = function(country,skip,limit){
		var defferer = $q.defer();
		var data = {
			country_short_name: country,
			skip: skip,
			limit: limit,
		};
		console.log("get top hashtag data",data);
		$http.post(STR_API_TOP_HASHTAG,data).success(function(response){
			defferer.resolve(response);
		})
		return defferer.promise;
	}
	this.getHashTagHandler = function(hashtags){
		hashtags.forEach(function(v,k){
			v.name = v.name.substring(1);
			hashtags[k] = v;
		})
		return hashtags;
	}
})