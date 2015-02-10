var Login = angular.module('LoginApp',[]);
Login.controller('LoginCtrl',function($scope,$http){
	/*
	* Random background
	*/
	var randomBG = Math.floor(Math.random()*14) + 1;
	LoginStyle = {background: 'url(\'../images/'+randomBG+'.jpg\')'};
	$scope.LoginStyle = LoginStyle;
	/*
	* sign in
	*/
	$scope.SignIn = function(user){
		console.log(user);
		$http.post(STR_API_LOGIN,user).success(function(response){
			console.log(response);
			if(response.error_code == 0){
				document.location.href = BASE_URL;
			}else{
				alert(response.msg);
			}
		})
	}
})
