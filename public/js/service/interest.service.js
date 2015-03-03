var InterestService = angular.module('interest.service',[]);
InterestService.service('INTEREST',function($http,$q){
	/*
	* create interest pitch data
	*/
	this.createInterestPitchData = function(user,pitch){
		return {
			user_id : user._id,
			token   : user.token,
			app_id  : pitch._id,
		};
	}
	this.postInterest = function(data){
		var defferer = $q.defer();
		$http.post(STR_API_INTEREST,data).success(function(response){
			defferer.resolve(response);			
		})
		return defferer.promise;
	}
	this.InterestPitchHandle = function(pitch,user){
		var index_of_user_interest = pitch.interests.list.indexOf(user._id);
		if(pitch.interests.loadFromServer == undefined) pitch.interests.loadFromServer = new Array();
		if(pitch.interests.interested == true && index_of_user_interest > -1){
			pitch.interests.number--;
			pitch.interests.list.splice(user._id,1);
			pitch.interests.interested = false;
			pitch.interests.loadFromServer.forEach(function(v,k){
				if(v._id == user._id){
					pitch.interests.loadFromServer.splice(k,1);
				}
			})
		}else{
			pitch.interests.number++;
			pitch.interests.list.push(user._id);
			pitch.interests.loadFromServer.push(user);
			pitch.interests.interested = true;
		}
		return pitch;
	}
	/*
	* interest pitch broadcast handle
	*/
	this.InterestPitchBroadcastHandle = function(pitchs,pitch){
		pitchs.forEach(function(v,k){
			if(v._id == pitch._id){
				pitchs.splice(k,1);
				pitchs.unshift(pitch);
			}
		})
		return pitchs;
	}
})