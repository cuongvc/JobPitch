var HashTagService = angular.module('hashtag.service',[]);
HashTagService.service('HASHTAG',function($http,$q){
	this.findHashTag = function(str){
		var HashTags = str.match(/#\S+/g);
		if(HashTags == null) HashTags = [];
		return HashTags;
	}
})