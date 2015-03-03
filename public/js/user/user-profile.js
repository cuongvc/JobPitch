TemplateApp.controller('UserProfileCtrl',function($rootScope,$scope,$http,$routeParams,PITCH,USER,ROUTE,HASHTAG){
	var profile;
	var UserService = USER.getProfile($routeParams.user_id);
		UserService.then(function(response){
			if(response.error_code == 0){
				profile = USER.getProfileHandler(response.user,$rootScope.user._id);
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
		user_id : $rootScope.user._id,
		token   : $rootScope.user.token,
		own_of_app_id: $routeParams.user_id,
		skip: 0,
		limit: 100,
	};
	var PitchService = PITCH.getPitchSidebar(data);
		PitchService.then(function(response){
			if(response.error_code == 0){
				pitchs = PITCH.getPitchSidebarHandler(response.applications,$rootScope.user._id);
				pitchs.forEach(function(v,k){
					var UserService = USER.get(v.interests.list,$rootScope.user._id,$rootScope.user.token);
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
			user_id: $rootScope.user._id,
			token: $rootScope.user.token,
			comments: pitch.comment,
		}
		var PitchService = COMMENT.getPitchComment(data);
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
	/*
	* post pitch reply
	*/
	$scope.PostReply = function(PitchReply,pitch,evt){
		if(evt.keyCode == 13){
			var data = {
				user_id : $rootScope.user._id,
				token : $rootScope.user.token,
				content : PitchReply,
				hash_tag : HASHTAG.findHashTag(PitchReply),
				application_parent : pitch._id,
				job_parent: pitch.job_id,
				comment_parent : "",
			}
			console.log('Pitch Reply:',data);
			var PitchService = PITCH.postNewPitchComment(data);
			PitchService.then(function(response){
				if(response.error_code == 0){
					$('.sidebar-comment-body textarea').val('');
					var index = pitchs.indexOf(pitch);
					var comment = response.comment;
					if(pitch.comments.all == undefined) pitch.comments.all = new Array();
					pitch.comments.all.push(comment);
					pitch.comments.numberOfComment++;
					pitchs[index] = pitch;
				}
			})
		}
	}
})