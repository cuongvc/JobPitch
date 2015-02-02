var SignupApp = angular.module('SignupApp',[]);
SignupApp.controller('SignupCtrl',function($scope,$http){
	$scope.ShowHiddenForm = function(evt){
		var target = $(evt.target);
		if(target.next().hasClass('form-transition')){
			target.next().css({
				maxHeight: '1000px',
				overflow: 'auto',
			});
			target.next().removeClass('form-transition');
		}else{
			target.next().css({
				maxHeight: '0px',
				overflow: 'hidden',
			});
			target.next().addClass('form-transition');
		}
	}
	$scope.Signup = function(email,password){
		var user = $scope.user;
		user.isUser = 1;
		console.log(JSON.stringify(user));
		$http.post(STR_API_SIGN_UP,user).success(function(response){
			console.log(response);
			if(response.error_code == 0) document.location.href = BASE_URL;
		})
	}
})