var ApplicationSideBar = angular.module('application-sidebar',['pitch.service','job.service','hashtag.service','like.service','interest.service','user-service','route.service']);
ApplicationSideBar.directive('applicationSidebar',function(){
	return {
		restrict: 'E',
		templateUrl: '/directives/home/application-sidebar.html',
		link: function(scope,element,attrs){

		},
	}
})
ApplicationSideBar.filter('reverse', function() {
	return function(items) {
		return items.slice().reverse();
	};
});
ApplicationSideBar.controller('ApplicationSideBarCtrl',function($scope,$http,JOB,PITCH,LIKE,HASHTAG,INTEREST,USER,ROUTE){
	var InterestList = new Array();
	$scope.InterestList = InterestList;
	$scope.ApplicationSideBarComments = [
		{username: 'Facebook', comment: 'Bạn nghĩ thế nào khi làm ứng dung mượt mà như Facebook App',avatar: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xap1/v/t1.0-1/p160x160/10888891_792437770805243_2605756062524274878_n.jpg?oh=444e0545d1bbada68355d8e5c6ab8828&oe=5561A471&__gda__=1431450996_805f65e459f6cd3eb2d621d08d3d6151"},
		{username: 'Android', comment: 'FB là ứng dụng tốt, chúng tôi hoàn toàn có thể là ra những ứng dụng như thế',avatar: "https://pbs.twimg.com/profile_images/522909800191901697/FHCGSQg0_bigger.png"},
		{username: 'Đình Thuận', comment: '@Android hãy về đội của anh =))', avatar: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpf1/v/t1.0-1/c0.0.160.160/p160x160/1460236_622400927824334_887047684_n.jpg?oh=81f71efa7346e62a5944772a0a2b2d4c&oe=55522A78&__gda__=1431130368_eafae6507d275d5d53493f9b9e65397f"},
	];
	$scope.LoadMoreInterestLogo = function(){
		pushLogo.forEach(function(v,k){
			InterestList.push(v);
		})
		$scope.InterestList = InterestList;
	}
	$scope.ViewCompany = function(user_id,evt){
		ROUTE.ViewUserProfile(user_id,evt);
	}
	$scope.ViewNormalUser = function(user_id,evt){
		var url = '/u/' + user_id;
		ROUTE.RedirectTo(url,evt);
	}
	/******************************************************************************************/
									/*SOCKET*/
	/******************************************************************************************/
	IO.on(APPLY_JOB_SOCKET_EVENT,function(response){
		console.log(APPLY_JOB_SOCKET_EVENT,response);
		
		if(response.application.user_id == $scope.user._id) return;
		pitchs.unshift(response.application);
		$scope.pitchs = pitchs;
		$scope.$apply();
	})
	/******************************************************************************************/
									/*GET PITCH*/
	/******************************************************************************************/
	PitchScroll.start = 0;
	var data = {
		user_id : $scope.user._id,
		token   : $scope.user.token,
		skip: PitchScroll.start,
		limit: PitchScroll.limit,
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

	$scope.ViewMorePitchComment = function(numberCmt,pitch){
		var index = pitchs.indexOf(pitch);
		pitch.comments.limit += numberCmt;
		if(pitch.comments.limit > pitch.comments.all.length) pitch.comments.limit = pitch.comments.all.length;
		pitchs[index] = pitch;
	}
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
	/*
	* like pitch
	*/
	$scope.LikePitch = function(pitch){
		var data = {
			user_id        : $scope.user._id,
			token          : $scope.user.token,
			type_like      : 2,
			job_id         : '',
			application_id :  pitch._id,
			comment_id     :  '',
		};
		var LikeService = LIKE.LikePitch(data);
			LikeService.then(function(response){
				if(response.error_code == 0){
					var index = pitchs.indexOf(pitch);
					if(pitch.likes.liked){
						pitch.likes.number--;
						pitch.likes.liked = false;
					}else{
						pitch.likes.number++;
						pitch.likes.liked = true;
					}
					pitchs[index] = pitch;
				}
			})
	}
	/*
	* post pitch reply
	*/
	$scope.PostReply = function(PitchReply,pitch,evt){
		if(evt.keyCode == 13){
			var data = {
				user_id : $scope.user._id,
				token : $scope.user.token,
				content : PitchReply,
				hash_tag : HASHTAG.findHashTag(PitchReply),
				application_parent : pitch._id,
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
	/*************************************************************************************************************/
											/*PITCH COMMENT*/
	/*************************************************************************************************************/
	$scope.InterestPitch = function(pitch){
		var data = {
			user_id : $scope.user._id,
			token   : $scope.user.token,
			app_id  : pitch._id,
		};
		var InterestService = INTEREST.postInterest(data);
		InterestService.then(function(response){
			console.log(response);
			if(response.error_code == 0){
				var index_pitch = pitchs.indexOf(pitch);
				if(pitch.interests.interested){
					pitch.interests.interested = false;
					pitch.interests.number--;
				}else{
					pitch.interests.interested = true;
					pitch.interests.number++;
				}
				pitchs[index_pitch] = pitch;
			}else{
				alert(response.msg);
			}
		})
	}

	
})