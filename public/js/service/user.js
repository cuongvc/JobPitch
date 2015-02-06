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
})