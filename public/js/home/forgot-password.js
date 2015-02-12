
ForgotPasswordApp = angular.module('ForgotPasswordApp',[]);
ForgotPasswordApp.controller('ForgotPasswordCtrl',function($scope,$http){
	$scope.forgotPassword = function(forgot){
		console.log(forgot);
		$http.post(STR_API_FORGOT_PASSWORD,forgot).success(function(response){
			console.log(response);
			if(response.error_code == 0){
				alert('An email was sent to your email');
			}else{
				alert('response.msg');
			}
		})
	}
})