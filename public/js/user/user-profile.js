TemplateApp.controller('UserProfileCtrl',function($scope,$http,$routeParams,PITCH,USER,ROUTE){
	$scope.user = user;
	$scope.logedin = logedin;
	var profile;
	var UserService = USER.getProfile($routeParams.user_id);
		UserService.then(function(response){
			if(response.error_code == 0){
				profile = USER.getProfileHandler(response.user,$scope.user._id);
				$scope.profile = profile;
			}else{
				alert(response.msg);
			}
		})
	$scope.iconCommentsHover = '-o';
	$scope.iconEnvelopeHover = '-o';
	var showUserFunction = false;
	$scope.showUserFunction = showUserFunction;
	$scope.UserFunction = function(){
		if(showUserFunction){
			showUserFunction = false;
		}else{
			showUserFunction = true;
		}
		$scope.showUserFunction = showUserFunction;
	}
	/*
	* get pitch
	*/
	var pitchs = new Array();
	var data = {
		user_id : $scope.user._id,
		token   : $scope.user.token,
		own_of_app_id: $routeParams.user_id,
		skip: 0,
		limit: 100,
	};
	var PitchService = PITCH.getPitchSidebar(data);
		PitchService.then(function(response){
			if(response.error_code == 0){
				pitchs = PITCH.getPitchSidebarHandler(response.applications,$scope.user._id);
				pitchs.forEach(function(v,k){
					var UserService = USER.get(v.interests.list,$scope.user._id,$scope.user.token);
						UserService.then(function(response){
							if(response.error_code == 0){
								pitchs[k].interests.loadFromServer = response.users;
							}else{
								alert(response.msg);
							}
						})
				})
				console.log('Pitchs Sidebar:',pitchs);
				$scope.pitchs = pitchs;
			}else{
				alert(response.msg);
			}
		})
	/*
	* view company profile
	*/
	$scope.ViewUser = function(user_id,evt){
		ROUTE.ViewUserProfile(user_id,evt);
	}
	/*
	* view pitch comment
	*/
	$scope.ViewPitchcomment = function(pitch){
		var index = pitchs.indexOf(pitch);
		pitchs[index].showComment = true;
		if(pitch.loaded == true) return;
		
		var data = {
			user_id: $scope.user._id,
			token: $scope.user.token,
			comments: pitch.comment,
		}
		var PitchService = PITCH.getPitchComment(data);
		PitchService.then(function(response){
			if(response.error_code == 0){
				if(response.comment.length > 0){
					pitchs = PITCH.getPitchCommentHandler(pitchs,pitch,response.comment);
				}
			}else{
				alert(response.msg);
			}
		})
	}
})