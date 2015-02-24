var Jobs = angular.module('jobs',['nightfury-upload','application-sidebar','left-sidebar','user-service','ui.bootstrap.popover','pitch.service','job.service','hashtag.service','like.service','interest.service','route.service','socket.service']);
Jobs.directive('jobs',function(){
	return {
		restrict: 'E',
		templateUrl: '/directives/home/jobs.html',
		link: function(scope,element,attrs){
			// $('#ApplyDesc').elastic();
		},
	}
})
Jobs.controller('JobCtrl',function($scope,$http,USER,PITCH,JOB,HASHTAG,LIKE,INTEREST,ROUTE,SOCKET){
	/*
	* View user
	*/
	$scope.ViewUser = function(user_id,evt){
		ROUTE.ViewUserProfile(user_id,evt);
	}
	/*
	* load jobs
	*/
	JobScroll.start = 0;
	var data = {
			user_id: $scope.user._id,
			token: $scope.user.token,
			skip: JobScroll.start,
			limit: JobScroll.limit,
			lat: 21.018549,
			lng: 105.812198,
			address: "9 Nguyên Hong, Thành Công, Ba Đình, Hà Nội, Việt Nam",
		}
	var JobService = JOB.getJob(data);
	JobService.then(function(response){
		console.log(response);
		jobs = JOB.JobHandler(response.jobs,$scope.user._id);
		$scope.jobs = jobs;
	})
	/*************************************************************************************************************/
											/*SOCKET*/
	/*************************************************************************************************************/
	IO.on(CREATE_JOB_SOCKET_EVENT,function(data){
		jobs.unshift(data.job);
		$scope.jobs = jobs;
		console.log(jobs);
		$scope.$apply();
	})
	IO.on(APPLY_JOB_SOCKET_EVENT,function(data){
		if(SOCKET.checkUserReciveNotification($scope.user._id, data.user_receive_notify) == false) return;

		var pitch = data.app;
			pitch = PITCH.pitchHandler(pitch,$scope.user._id);

		SOCKET.pushPitchToRecentJob(jobs,pitch);
	});
	IO.on(LIKE_PITCH_SOCKET_EVENT,function(data){

		if(SOCKET.checkUserReciveNotification($scope.user._id, data.user_receive_notify) == false) return;
		
		jobs = LIKE.addLikePitch(jobs,data.job_id,data.app_id,data.id_user_make_notify);
		$scope.jobs = jobs;
		$scope.$apply();
	})
	IO.on(LIKE_JOB_SOCKET_EVENT,function(data){

		if(SOCKET.checkUserReciveNotification($scope.user._id, data.user_receive_notify) == false) return;

		jobs = LIKE.addLikeJob(jobs,data.job_id,data.id_user_make_notify);
		
		$scope.jobs = jobs;
		
		$scope.$apply();
	})
	/*************************************************************************************************************/
											/*View Pitch*/
	/*************************************************************************************************************/
	$scope.ViewPitch = function(job){
		var data = {
		    user_id: $scope.user._id,
		    token: $scope.user.token,
		    job_id: job._id,
		}
		var PitchService = PITCH.getPitch(data);
		PitchService.then(function(response){
			if(response.error_code == 0){
				jobs = PITCH.getPitchHandler(jobs,job,$scope.user._id,response.app);
				console.log(jobs);
				$scope.jobs = jobs;
			}else{
				alert(response.msg);
			}
		})
	}

	$scope.ViewCompanyProfile = function(evt,id){
		evt.stopPropagation();
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
		var JobService = PITCH.getPitchComment(data);
			JobService.then(function(response){
				if(response.error_code == 0){
					jobs = PITCH.getPitchCommentHandler(jobs,job,pitch,response.comment);
					$scope.jobs = jobs;
				}else{
					alert(response.msg);
				}
			})
	}
	/*************************************************************************************************************/
											/*PITCH*/
	/*************************************************************************************************************/
	$scope.ApplyDescWordCount = 0;
	$scope.ApplyTextAreaChange = function(content){
		$scope.ApplyDescWordCount = content.length;
		changeHeight();
	}
	$scope.ChangeApplyTextAreaHeight = function(evt){
		if(evt.keyCode == 13){
			changeHeight();
		}
	}
	function changeHeight(){
		var t = $("#ApplyDesc")[0];
	    var lineNumber = t.value.substr(0, t.selectionStart).split("\n").length;
	    var height = lineNumber*20 + 10;
	    if(height < 60) height = 60;
	    $("#ApplyDesc").css({height: height});
	}
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
	
	/*************************************************************************************************************/
											/*SHARE*/
	/*************************************************************************************************************/
	$scope.ShareJobOnFacebook = function(job){
		FB.ui({
			method: 'share',
			href: BASE_URL + '/view/'+job._id,
		},function(response) {
			if (response && !response.error_code) {
			   alert('Posting completed.');
			} else {
			   alert('Error while posting.');
			}
		}
		);
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
				job_parent: job._id,
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
											/*EDIT JOB*/
	/*************************************************************************************************************/
	$scope.EditJob = function(job){
		console.log(job);
		$scope.EditJob = job;
		$('#EditModal').modal('show');
	}
	var showEditCrop = false;
	$scope.showEditCrop  = showEditCrop;
	$scope.JobEditImage = {
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
	}
	$scope.EditJobCropCoverOpts = {
		aspectRatio: 2.7,
	};
	$scope.$watch(function(){return $scope.JobEditImage.preview;},function(){
		if($scope.JobEditImage.preview != undefined && $scope.JobEditImage.preview != ''){
			showEditCrop = true;
			$scope.showEditCrop = showEditCrop;
		}
	})
	
	$scope.EditJobCropChange = function(c){
		console.log(c);
		$scope.JobEditImage.coords = {
			x: c.x,
			y: c.y,
			width: c.w,
			height: c.y2 - c.y,
		};
	}
	$scope.EditCrop = function(){
		showEditCrop = false;
		$scope.showEditCrop = showEditCrop;
		$scope.JobEditImage.startUpload = true;
	}
	/*
	* save edit info
	*/
	$scope.SaveEdit = function(job,title,address,desc){
		if($scope.JobEditImage.path == undefined || $scope.JobEditImage.path == ''){
			alert('Please wait unti image upload complete');
			return;
		}
		var HashTags = HASHTAG.findHashTag(title).concat(HASHTAG.findHashTag(desc));
		var data = {
			user_id: $scope.user._id,
			token: $scope.user.token,
			job_id: job._id,
			title: title,
			desc: desc,
			hash_tag: HashTags,
			link_direct: '',
			lat: '17',
			lng: '104',
			address: address,
			temp_path: $scope.JobEditImage.path,
			extension: $scope.JobEditImage.extension,
		};
		console.log(data);
		var JobService = JOB.edit(data);
			JobService.then(function(response){
				if(response.error_code == 0){
					jobs = JOB.editHandler(jobs,job,response.job);
					$scope.jobs = jobs;
					$('#EditModal').modal('hide');
				}else{
					alert(response.msg);
				}
			})
	}
})	