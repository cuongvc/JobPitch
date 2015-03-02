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
		this.findTag = function(data){
			var defferer = $q.defer();
			$http.post(STR_API_SEARCH_HASHTAG,data).success(function(response){
				defferer.resolve(response);
			})
			return defferer.promise;
		}
		/*
		* suggest move down
		*/
		this.SuggestionMoveDown = function(suggest_hashtag,current_suggest){
			var suggest_hashtag_length = suggest_hashtag.length;
			if(current_suggest == null && suggest_hashtag_length > 0) {
				current_suggest = {
					type: 'hashtag',
					index: 0,
				};
			}else{
				if(current_suggest.index < suggest_hashtag_length - 1){
					current_suggest.index++;
				}
			}
			return current_suggest;
		}
		/*
		* suggest move up
		*/
		this.SuggestionMoveUp = function(suggest_hashtag,current_suggest){
			var suggest_hashtag_length = suggest_hashtag.length;
			if(current_suggest == null || suggest_hashtag_length == 0) return;
			
			if(current_suggest.index < suggest_hashtag_length && current_suggest.index > 0){
				current_suggest.index--;
			}
			return current_suggest;
		}
		/*
		* find similar between search value and hashtag
		*/
		this.findSimilarSearchHashtag = function(hashtags,value){
			var suggest_matches = new Array();
			
			if(value == undefined) return suggest_matches;
			
			value = value.toLowerCase();
			var strLength = value.length;
			hashtags.forEach(function(v,k){
				var tag = v.name.toLowerCase();
				var match = true;
				for(i=0;i<strLength;i++){
					var charAt = value.charAt(i);
					if(tag.indexOf(charAt) < 0) match = false;
				}
				if(match) suggest_matches.push(v);
			})
			return suggest_matches;
		}
	})