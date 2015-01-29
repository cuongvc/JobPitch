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
	$scope.SignIn = function(email,password){
		var data = {
			email: email,
			password: password,
		}
		console.log(JSON.stringify(data));
		$http.post(STR_API_SIGN_UP,data).success(function(response){
			console.log(response);
			
		})
	}
})
