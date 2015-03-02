var UserService = angular.module('user-service',[]);
UserService.service('USER',function($rootScope,$http,$q){
	this.get = function(users,user_id,token){
		var data = {
			user_id: user_id,
			token: token,
			users: users
		}
		var defferer = $q.defer();
		$http.post(STR_API_GET_USER,data).success(function(response){
			defferer.resolve(response)
		})
		return defferer.promise;
	}
	this.getProfile = function(get_user_id){
		var defferer = $q.defer();
		var url = STR_API_USER_PROFILE + '/' + get_user_id;
		$http.get(url).success(function(response){
			defferer.resolve(response);
		})
		return defferer.promise;
	}
	this.getProfileHandler = function(profile,user_id){
		if(profile.followMes.indexOf(user_id) < 0){
			profile.followed = false;
		}else{
			profile.followed = true;
		}
		profile.follow_number = profile.followMes.length;
		profile.jobs_number = profile.myJobs.length;
		console.log(profile);
		return profile;
	}
})