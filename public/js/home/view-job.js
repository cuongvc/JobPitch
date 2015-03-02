TemplateApp.controller('ViewJobCtrl',function($rootScope,$scope,$http,$routeParams,USER,PITCH,JOB,HASHTAG,LIKE,INTEREST,ROUTE,SOCKET,COMMENT){

	var job = new Object();
	$scope.job = job;
	/*
	* get Job & Pitch
	*/
	var data = {
	    user_id: $rootScope.user._id,
	    token: $rootScope.user.token,
	    job_id: $routeParams.job_id,
	};
	var PitchService = PITCH.getPitch(data);
	PitchService.then(function(response){
		console.log("data from server",response);
		if(response.error_code == 0){
			job = response.job;
			PITCH.getPitchHandle(job,$rootScope.user._id,response.app);
			$scope.job = job;
		}else{
			alert(response.msg);
		}
	})

	$scope.ViewCompanyProfile = function(evt,id){
		evt.stopPropagation();
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
	$scope.Apply_NEW = function(job,ApplyDesc){
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
		$('.apply-box').val('');
		PitchService = PITCH.postNewPitch(data);
		PitchService.then(function(response){
			if(response.error_code == 0){
				PITCH.postNewPitchHandle(job,response.application);
			}else{
				alert(response.msg);
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