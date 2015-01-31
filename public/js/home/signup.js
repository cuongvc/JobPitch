var SignupApp = angular.module('SignupApp',[]);
SignupApp.controller('SignupCtrl',function($scope,$http){
	$scope.Signup = function(email,password){
		$('#signupForm').submit();
	}
})