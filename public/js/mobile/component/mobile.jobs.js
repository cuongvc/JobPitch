var MobileJob = angular.module('mobile-job',[]);
MobileJob.directive('mobileJob',function(){
	return {
		restrict: 'E',
		templateUrl: 'directives/mobile/jobs.html',
		link: function(scope,element,attrs){
			$('.materialboxed').materialbox();
		},
		controller: 'MobileJobCtrl',
	}
})
MobileJob.controller('MobileJobCtrl',function($rootScope,$scope,$http,USER,PITCH,JOB,HASHTAG,LIKE,INTEREST,ROUTE,SOCKET){
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
			user_id: $rootScope.user._id,
			token: $rootScope.user.token,
			skip: JobScroll.start,
			limit: JobScroll.limit,
			lat: 21.018549,
			lng: 105.812198,
			address: "9 Nguyên Hong, Thành Công, Ba Đình, Hà Nội, Việt Nam",
		}
	var JobService = JOB.getJob(data);
	JobService.then(function(response){
		console.log(response);
		jobs = JOB.JobHandler(response.jobs,$rootScope.user._id);
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
		if(SOCKET.checkUserReciveNotification($rootScope.user._id, data.user_receive_notify) == false) return;

		var pitch = data.app;
			pitch = PITCH.pitchHandler(pitch,$rootScope.user._id);

		SOCKET.pushPitchToRecentJob(jobs,pitch);
	});
	IO.on(LIKE_PITCH_SOCKET_EVENT,function(data){

		if(SOCKET.checkUserReciveNotification($rootScope.user._id, data.user_receive_notify) == false) return;
		
		jobs = LIKE.addLikePitch(jobs,data.job_id,data.app_id,data.id_user_make_notify);
		$scope.jobs = jobs;
		$scope.$apply();
	})
	IO.on(LIKE_JOB_SOCKET_EVENT,function(data){

		if(SOCKET.checkUserReciveNotification($rootScope.user._id, data.user_receive_notify) == false) return;

		jobs = LIKE.addLikeJob(jobs,data.job_id,data.id_user_make_notify);
		
		$scope.jobs = jobs;
		
		$scope.$apply();
	})
	/*************************************************************************************************************/
											/*View Pitch*/
	/*************************************************************************************************************/
	$scope.ViewPitch = function(job){
		var data = {
		    user_id: $rootScope.user._id,
		    token: $rootScope.user.token,
		    job_id: job._id,
		}
		var PitchService = PITCH.getPitch(data);
		PitchService.then(function(response){
			if(response.error_code == 0){
				jobs = PITCH.getPitchHandler(jobs,job,$rootScope.user._id,response.app);
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
			user_id: $rootScope.user._id,
			token: $rootScope.user.token,
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
				user_id : $rootScope.user._id,
				token : $rootScope.user.token,
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
			user_id        : $rootScope.user._id,
			token          : $rootScope.user.token,
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
						if(v._id == $rootScope.user._id){
							jobs[index].likes.users.splice(k,1);
						}
					})
				}else{
					jobs[index].likes.liked = true;
					jobs[index].likes.number++;
					var me = {
								_id: $rootScope.user._id,
								avatar: $rootScope.user.avatar.origin,
								avatar_small: $rootScope.user.avatar.small,
								avatar_normal: $rootScope.user.avatar.normal,
								userName: $rootScope.user.username,
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
			user_id        : $rootScope.user._id,
			token          : $rootScope.user.token,
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
	/*************************************************************************************************************/
											/*PITCH COMMENT*/
	/*************************************************************************************************************/
	$scope.InterestPitch = function(pitch,job){
		var data = {
			user_id : $rootScope.user._id,
			token   : $rootScope.user.token,
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
})