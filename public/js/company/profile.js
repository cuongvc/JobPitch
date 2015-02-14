TemplateApp.controller('ProfileCtrl',function($scope,$http,$routeParams,PITCH,JOB,HASHTAG,INTEREST,LIKE,USER){
	$scope.BASE_URL           = BASE_URL;
	$scope.user               = user;
	$scope.logedin            = logedin;
	$scope.CompanyProfilePage = 1;
	var profile;
	var jobs;
	var data = {
		user_id: $scope.user._id,
		token: $scope.user.token,
		users: [$routeParams.user_id],
	}
	var UserService = USER.getProfile($routeParams.user_id);
		UserService.then(function(response){
			if(response.error_code == 0){
				profile = USER.getProfileHandler(response.user,$scope.user._id);
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
			$scope.ViewPitch(job);
			var scrollTop = $(window).scrollTop() + img_H;
			$('body').animate({ scrollTop: scrollTop },img_H);
		}else{
			target.css('max-height', '0px');
		}
	}
	$scope.follow = function(){
		var data = {
			user_id: $scope.user._id,
			token: $scope.user.token,
			user_follow_id: $routeParams.user_id,
		}
		console.log(data);
		$http.post(STR_API_FOLLOW,data).success(function(response){
			console.log(response);
			if(response.error_code == 0){
				if(profile.followed == true){
					profile.followed = false;
					var index = profile.followMes.indexOf($scope.user._id);
					profile.followMes.splice(index,1);
					profile.follow_number--;
				}else{
					profile.followed = true;
					profile.followMes.push($scope.user._id);
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
		if($routeParams.user_id == $scope.user._id){
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
				    user_id       : $scope.user._id,
				    token         : $scope.user.token,
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
		if($routeParams.user_id == $scope.user._id){
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
		console.log($scope.changeCoverImage.preview);
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
				    user_id       : $scope.user._id,
				    token         : $scope.user.token,
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
			user_id: $scope.user._id,
			token: $scope.user.token,
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
		user_id: $scope.user._id,
		token  : $scope.user.token,
		skip: 0,
		limit: 50,
		own_of_job_id: $routeParams.user_id,
	};
	var JobService = JOB.getCompanyJob(data);
	JobService.then(function(response){
		if(response.error_code == 0){
			jobs = response.jobs;
			$scope.jobs = jobs;
		}else{
			alert(response.msg);
		}
	})
	/****************************************************************************************************/
											/*ViewPitch*/
	/****************************************************************************************************/
	$scope.ViewPitch = function(job){
		if(job.showApplyBox) return;
		var data = {
		    user_id: $scope.user._id,
		    token: $scope.user.token,
		    job_id: job._id,
		}
		var PitchService = PITCH.getPitch(data);
		PitchService.then(function(response){
			if(response.error_code == 0){
				jobs = PITCH.getPitchHandler(jobs,job,$scope.user._id,response.app);
				$scope.jobs = jobs;
			}else{
				alert(response.msg);
			}
		})
	}
	/*************************************************************************************************************/
											/*PITCH COMMENT*/
	/*************************************************************************************************************/
	$scope.getPitchComment = function(job,pitch){
		if(pitch.loaded == true) return;
		
		var data = {
			user_id: $scope.user._id,
			token: $scope.user.token,
			comments: pitch.comment,
		}
		var JobService = PITCH.ViewPitchComment(jobs,job,pitch,data);
		JobService.then(function(data){
			jobs = data;
			$scope.jobs = jobs;
		})
	}
	/*************************************************************************************************************/
											/*REPLY PITCH*/
	/*************************************************************************************************************/
	$scope.PostPitchReply = function(PitchReply,job,pitch,evt){
		if(evt.keyCode == 13){
			var data = {
				user_id : $scope.user._id,
				token : $scope.user.token,
				content : PitchReply,
				hash_tag : HASHTAG.findHashTag(PitchReply),
				application_parent : pitch._id,
				comment_parent : "",
			}
			console.log(data);
			var PitchService = PITCH.postNewPitchComment(data);
			PitchService.then(function(response){
				if(response.error_code == 0){
					$(evt.target).val('');
					jobs = PITCH.postNewPitchCommentHandler(jobs,job,pitch,response.comment);
					$scope.jobs = jobs;
				}
			})
		}
	}
	/*************************************************************************************************************/
											/*PITCH COMMENT*/
	/*************************************************************************************************************/
	$scope.InterestPitch = function(pitch,job){
		var data = {
			user_id : $scope.user._id,
			token   : $scope.user.token,
			app_id  : pitch._id,
		};
		var InterestService = INTEREST.postInterest(data);
		InterestService.then(function(response){
			console.log(response);
			if(response.error_code == 0){
				jobs = INTEREST.postInterestHandler(jobs,job,pitch);
				$scope.jobs = jobs;
			}else{
				alert(response.msg);
			}
		})
	}
	/*************************************************************************************************************/
											/*LIKE*/
	/*************************************************************************************************************/
	$scope.LikeJob = function(job){
		var data = {
			user_id        : $scope.user._id,
			token          : $scope.user.token,
			type_like      : 1,
			job_id         : job._id,
			application_id :  '',
			comment_id     :  '',
		};
		console.log(data);
		$http.post(STR_API_LIKE,data).success(function(response){
			if(response.error_code == 0){
				var index = jobs.indexOf(job);
				if(job.likes.liked){
					jobs[index].likes.liked = false;
					jobs[index].likes.number--;
					jobs[index].likes.users.forEach(function(v,k){
						if(v._id == $scope.user._id){
							console.log('a');
							jobs[index].likes.users.splice(k);
						}
					})
				}else{
					jobs[index].likes.liked = true;
					jobs[index].likes.number++;
					var me = {
								_id: $scope.user._id,
								avatar: $scope.user.avatar.origin,
								avatar_small: $scope.user.avatar.small,
								avatar_normal: $scope.user.avatar.normal,
								userName: $scope.user.username,
							};
					jobs[index].likes.users.push(me);
				}
				$scope.jobs = jobs;
			}else{
				alert(response.msg);
			}
		})
	}
	$scope.LikePitch = function(pitch,job){
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
				jobs = LIKE.LikePitchHandler(jobs,job,pitch);
				$scope.jobs = jobs;
			})
	}
	$scope.ViewListLikeJob = function(job){
		var users = job.likes.list;
		var height;
		var popover = $('#'+ job._id +' .list-like-job');
		var index = jobs.indexOf(job);
		if(job.likes.loaded != true){
			var users = USER.get(users,$scope.user._id,$scope.user.token);
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