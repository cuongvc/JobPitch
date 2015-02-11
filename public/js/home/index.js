TemplateApp.controller('IndexCtrl',function($scope,$http){
	$scope.user    = user;
	$scope.logedin = logedin;
	$scope.ViewUser = function(user_id){
		history.pushState({},'','user/'+user_id);
	}
	$scope.LoadMore = function(a){
		console.log(a);
	}
})