TemplateApp.controller('ProfileCtrl',function($rootScope,$scope,$http,$routeParams,PITCH,JOB,HASHTAG,INTEREST,LIKE,USER,COMMENT){
	$scope.CompanyProfilePage = 1;
	
	var profile;
		$scope.profile = profile;

	var showEditProfileButton = false;
		if($routeParams.user_id == $rootScope.user._id) showEditProfileButton = true;
		$scope.showEditProfileButton = showEditProfileButton;

	var jobs;
	var data = {
			user_id: $rootScope.user._id,
			token: $rootScope.user.token,
			users: [$routeParams.user_id],
		}
		var UserService = USER.getProfile($routeParams.user_id);
			UserService.then(function(response){
				if(response.error_code == 0){
					profile = USER.getProfileHandler(response.user,$rootScope.user._id);
					console.log("Profile",profile);
					$scope.profile = profile;
				}else{
					alert(response.msg);
				}
			})
	$scope.ToggleImage = function(job,evt){
		var target = $(evt.target).parent().parent().parent().find('.company-job-image');
		target.toggleClass('show-image');
		var img_H = target.find('img').height();
		if(target.hasClass('show-image')){
			target.css('max-height','500px');
			$scope.ViewPitch_NEW(job);
			var scrollTop = $(window).scrollTop() + img_H;
			$('body').animate({ scrollTop: scrollTop },img_H);
		}else{
			target.css('max-height', '0px');
		}
	}
	$scope.follow = function(){
		var data = {
			user_id: $rootScope.user._id,
			token: $rootScope.user.token,
			user_follow_id: $routeParams.user_id,
		}
		console.log(data);
		$http.post(STR_API_FOLLOW,data).success(function(response){
			console.log(response);
			if(response.error_code == 0){
				if(profile.followed == true){
					profile.followed = false;
					var index = profile.followMes.indexOf($rootScope.user._id);
					profile.followMes.splice(index,1);
					profile.follow_number--;
				}else{
					profile.followed = true;
					profile.followMes.push($rootScope.user._id);
					profile.follow_number++;
				}
				$scope.profile = profile;
			}
		})
	}
	/****************************************************************************************************/
											/*CHANGE AVATAR*/
	/****************************************************************************************************/
	$scope.changeAvatar = function(){
		if($routeParams.user_id == $rootScope.user._id){
			$('#change-avatar-input').click();
			return;
		}
	}
	$scope.changeAvatarImage = {
		upload: {
			url: STR_UPLOAD_IMAGE,
			postData: 'image',
			dir: {
				name: 'dir',
				dir: 'upload/thumb',
			},
		},
		progress : {
			show: false,
		},
		clearOnclick: true,
		crop: true,
	};
	$scope.ChangeAvatarOpts = {
		aspectRatio: 1,
	};
	$scope.$watch(function(){return $scope.changeAvatarImage.preview;},function(){
		if($scope.changeAvatarImage.preview != undefined && $scope.changeAvatarImage.preview != ''){
			showCrop = true;
			$scope.changeAvatarImage.showCrop = showCrop;
		}
	})
	$scope.changeAvatarCropChange = function(c){
		$scope.changeAvatarImage.coords = {
			x: c.x,
			y: c.y,
			width: c.w,
			height: c.y2 - c.y,
		};
	}
	$scope.CropAvatar = function(){
		showCrop = false;
		$scope.changeAvatarImage.showCrop = showCrop;
		$scope.changeAvatarImage.startUpload = true;
	}
	$scope.$watch(function(){
		return $scope.changeAvatarImage.path;
	},function(){
		var path = $scope.changeAvatarImage.path;
		if(path != undefined && path != ''){
			var data = {
				    user_id       : $rootScope.user._id,
				    token         : $rootScope.user.token,
				    type_image    : 1,
				    temp_path     : path,
				    extension     : $scope.changeAvatarImage.extension,
				};
			$http.post(STR_API_EDIT_AVATAR,data).success(function(response){
				console.log(response);
				document.location.reload();
			})
		}
	})
	/****************************************************************************************************/
											/*CHANGE COVER*/
	/****************************************************************************************************/
	$scope.changeCover = function(){
		if($routeParams.user_id == $rootScope.user._id){
			$('#change-cover-input').click();
			return;
		}
	}
	$scope.changeCoverImage = {
		upload: {
			url: STR_UPLOAD_IMAGE,
			postData: 'image',
			dir: {
				name: 'dir',
				dir: 'upload/thumb',
			},
		},
		progress : {
			show: false,
		},
		clearOnclick: true,
		crop: true,
	};
	$scope.ChangeCoverOpts = {
		aspectRatio: 2.75,
	};
	$scope.$watch(function(){return $scope.changeCoverImage.preview;},function(){
		if($scope.changeCoverImage.preview != undefined && $scope.changeCoverImage.preview != ''){
			showCrop = true;
			$scope.changeCoverImage.showCrop = showCrop;
		}
	})
	$scope.changeCoverCropChange = function(c){
		$scope.changeCoverImage.coords = {
			x: c.x,
			y: c.y,
			width: c.w,
			height: c.y2 - c.y,
		};
	}
	$scope.Crop = function(){
		showCrop = false;
		$scope.showCrop = showCrop;
		$scope.changeCoverImage.startUpload = true;
	}
	$scope.$watch(function(){
		return $scope.changeCoverImage.path;
	},function(){
		var path = $scope.changeCoverImage.path;
		if(path != undefined && path != ''){
			var data = {
				    user_id       : $rootScope.user._id,
				    token         : $rootScope.user.token,
				    type_image    : 2,
				    temp_path     : path,
				    extension     : $scope.changeCoverImage.extension,
				};
			$http.post(STR_API_EDIT_AVATAR,data).success(function(response){
				console.log(response);
				document.location.reload();
			})
		}
	})
	/****************************************************************************************************/
											/*APPLY*/
	/****************************************************************************************************/
	$scope.Apply = function(job, ApplyDesc){
		var data = {
			user_id: $rootScope.user._id,
			token: $rootScope.user.token,
			job_id: job._id,
			title: "",
			description: ApplyDesc,
			hash_tag: HASHTAG.findHashTag(ApplyDesc),
			file: '',
		};
		console.log('post New Pitch:',data);
		$('#ApplyDesc').val('');
		PitchService = PITCH.postNewPitch(data);
		PitchService.then(function(response){
			if(response.error_code == 0){
				jobs = PITCH.postNewPitchHandler(jobs,job,response.application);
				$scope.jobs = jobs;
			}
		})
	}
	/****************************************************************************************************/
											/*GET LIST JOBS*/
	/****************************************************************************************************/
	var data = {
		user_id: $rootScope.user._id,
		token  : $rootScope.user.token,
		skip: 0,
		limit: 50,
		own_of_job_id: $routeParams.user_id,
	};
	var JobService = JOB.getCompanyJob(data);
	JobService.then(function(response){
		if(response.error_code == 0){
			jobs = JOB.JobHandler(response.jobs,$rootScope.user._id);
			$scope.jobs = jobs;
		}else{
			alert(response.msg);
		}
	})
	/****************************************************************************************************/
											/*ViewPitch*/
	/****************************************************************************************************/
	$scope.ViewPitch_NEW = function(job){
		var data = PITCH.createGetPitchData($rootScope.user,job);
		var PitchService = PITCH.getPitch(data);
		PitchService.then(function(response){
			console.log("Load Pitchs", response);
			if(response.error_code == 0){
				PITCH.getPitchHandle(job,$rootScope.user._id,response.app);
			}else{
				alert(response.msg);
			}
		})
	}
	/*************************************************************************************************************/
											/*PITCH COMMENT*/
	/*************************************************************************************************************/
	$scope.getPitchComment_NEW = function(pitch){
		if(pitch.loaded == true) return;
		
		var data = COMMENT.createGetPitchCommentData($rootScope.user,pitch);
		var JobService = COMMENT.getPitchComment(data);
			JobService.then(function(response){
				if(response.error_code == 0){
					COMMENT.getPitchCommentHandle(pitch,response.comment);
				}else{
					alert(response.msg);
				}
			})
	}
	/*************************************************************************************************************/
											/*REPLY PITCH*/
	/*************************************************************************************************************/
	$scope.PostPitchReply = function(PitchReply,job,pitch,evt){
		if(evt.keyCode == 13){
			var data = {
				user_id : $rootScope.user._id,
				token : $rootScope.user.token,
				content : PitchReply,
				hash_tag : HASHTAG.findHashTag(PitchReply),
				application_parent : pitch._id,
				job_parent: job._id,
				comment_parent : "",
			}
			console.log(data);
			var PitchService = COMMENT.postNewPitchComment(data);
			PitchService.then(function(response){
				if(response.error_code == 0){
					$(evt.target).val('');
					
					jobs   = COMMENT.postNewPitchCommentHandler(jobs,job,pitch,response.comment);
					
					$scope.jobs = jobs;
				}
			})
		}
	}
	/*************************************************************************************************************/
											/*PITCH COMMENT*/
	/*************************************************************************************************************/
	$scope.InterestPitch = function(pitch){
		var data = INTEREST.createInterestPitchData($rootScope.user,pitch);
		var InterestService = INTEREST.postInterest(data);
		InterestService.then(function(response){
			console.log(response);
			if(response.error_code == 0){
				INTEREST.InterestPitchHandle(pitch,$rootScope.user);
				$scope.$broadcast(INTEREST_PITCH_BROADCAST,pitch);
			}else{
				alert(response.msg);
			}
		})
	}
	/*************************************************************************************************************/
											/*LIKE*/
	/*************************************************************************************************************/
	$scope.LikeJob_NEW = function(job){
		var data = LIKE.createLikeJobData($rootScope.user,job);
		var LikeService = LIKE.LikeJob(data);
			LikeService.then(function(response){
				if(response.error_code == 0){
					LIKE.LikeJobHandle(job,$rootScope.user._id);
				}else{
					alert(response.msg);
				}
			})
		$scope.HiddenListLike(job);
	}
	$scope.LikePitch_NEW = function(pitch){
		var data = LIKE.createLikePitchData($rootScope.user,pitch);
		var LikeService = LIKE.LikePitch(data);
			LikeService.then(function(response){
				console.log(response);
				if(response.error_code == 0){
					LIKE.LikePitchHandle(pitch,$rootScope.user._id);
					var broadcast_data = {
						pitch: pitch,
						user: $rootScope.user,
					};
					$scope.$broadcast(LIKE_PITCH_BROADCAST,broadcast_data);
				}else{
					alert(response.msg);
				}
			})
	}
	$scope.ViewListLikeJob = function(job){
		var users = job.likes.list;
		var height;
		var popover = $('#'+ job._id +' .list-like-job');
		var index = jobs.indexOf(job);
		if(job.likes.loaded != true){
			var users = USER.get(users,$rootScope.user._id,$rootScope.user.token);
			users.then(function(response){
				console.log(response);
				if(response.error_code == 0){
					jobs[index].likes.users = response.users;
					jobs[index].likes.loaded = true;
					height = -(jobs[index].likes.users.length * 17 + 28);
					popover.css({marginTop: height,marginLeft:-10});
					popover.removeClass('hidden');
				}
				$scope.jobs = jobs;
				console.log($scope.jobs);
			})
		}else{
			height = -(jobs[index].likes.users.length * 17 + 28);
			popover.css({marginTop: height,marginLeft:-10});
			popover.removeClass('hidden');
		}
		
	}
	$scope.HiddenListLike = function(job){
		$('.list-like-job').addClass('hidden');
	}

})