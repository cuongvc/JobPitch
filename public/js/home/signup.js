var SignupApp = angular.module('SignupApp',[]);
SignupApp.controller('SignupCtrl',function($scope,$http){
	/*
	* Random background
	*/
	var randomBG = Math.floor(Math.random()*14) + 1;
	LoginStyle = {background: 'url(\'../images/'+randomBG+'.jpg\')'};
	$scope.LoginStyle = LoginStyle;
	
	$scope.Signup = function(email,password){
		var user = $scope.user;
		user.isUser = 2;
		console.log(JSON.stringify(user));
		$http.post(STR_API_SIGN_UP,user).success(function(response){
			console.log(response);
			if(response.error_code == 0){
				document.location.href = BASE_URL
			}else{
				alert(response.msg);
			}
		})
	}
})