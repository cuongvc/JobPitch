TemplateApp.controller('IndexCtrl',function($rootScope,$scope,$http,JOB,PITCH,USER,SOCKET,LIKE,HASHTAG,COMMENT,INTEREST){
	
	function LoadJob(){
		var data = {
				user_id: $rootScope.user._id,
				token: $rootScope.user.token,
				skip: 0,
				limit: 100,
			}
		var JobService = JOB.getJob(data);
			JobService.then(function(response){
			console.log("JOB",response);
			jobs = JOB.JobHandler(response.jobs,$rootScope.user._id);
			$scope.jobs = jobs;
		})
	}
	function LoadPitch(){
		var data = {
			user_id : $rootScope.user._id,
			token   : $rootScope.user.token,
			skip: 0,
			limit: 100,
		};
		var PitchService = PITCH.getPitchSidebar(data);
			PitchService.then(function(response){
				console.log("Pitch",response);
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
					$scope.pitchs = pitchs;
				}else{
					alert(response.msg);
				}
			})
	}
	
	/******************************************************************************************/
											/*LOAD JOB & PITCH*/
	/******************************************************************************************/
	if(document.location.pathname == '/'){
		LoadJob();
		LoadPitch();
		$scope.$on(RELOAD_INDEX,function(){
			LoadJob();
			LoadPitch();
		});
		$scope.$on(SWITH_TO_CURRENT,function(event,position){
			LoadJob();
			LoadPitch();
			user.position = position;
			$rootScope.user = user;
		});
	
	} //endif INDEX

	/******************************************************************************************/
											/*LOAD JOB POPUP*/
	/******************************************************************************************/
	$scope.$on(LOAD_JOB_POPUP,function(event,job_id){
		jobs.forEach(function(v,k){
			if(v._id == job_id){
				$rootScope.JobPopup = v;
				$rootScope.shoJobPopup = true;
			}
		})
	})
	/******************************************************************************************/
											/*LIKE PITCH BROADCAST*/
	/******************************************************************************************/
	$scope.$on(LIKE_PITCH_BROADCAST,function(event,data){
		LIKE.LikePitchBroadcastHandle(pitchs, data.pitch, data.user);
	})
	/******************************************************************************************/
											/*LIKE PITCH BROADCAST*/
	/******************************************************************************************/
	$scope.$on(INTEREST_PITCH_BROADCAST,function(event,pitch){
		INTEREST.InterestPitchBroadcastHandle(pitchs,pitch);
	})
	
	/******************************************************************************************/
											/*SOCKET*/
	/******************************************************************************************/
	IO.on(CREATE_JOB_SOCKET_EVENT,function(data){
		console.log('Create New Job Socket',data);
		jobs.unshift(data.job);
		$scope.jobs = jobs;
		$scope.$apply();
	})
	IO.on(APPLY_JOB_SOCKET_EVENT,function(data){

		if(data.id_user_make_notify == user._id) return;

		if(data.id_user_make_notify == $rootScope.user._id) return;
		var pitch = data.app;
			pitch = PITCH.pitchHandler(pitch,$rootScope.user._id);

		jobs = SOCKET.pushPitchToRecentJob(jobs,pitch);

		var pitch = data.app;
			pitch = PITCH.pitchHandler(pitch);

		var UserService = USER.get(pitch.interests.list,$rootScope.user._id,$rootScope.user.token);
			UserService.then(function(response){
				if(response.error_code == 0){
					pitch.interests.loadFromServer = response.users;
				}else{
					alert(response.msg);
				}
			})
			console.log(pitch);
		pitchs.unshift(pitch);
		
		$scope.pitchs = pitchs;
		$scope.jobs = jobs;
	});
	IO.on(LIKE_PITCH_SOCKET_EVENT,function(data){
		console.log('Like Pitch Socket',data);
		
		if(data.id_user_make_notify == user._id) return;
		
		jobs = LIKE.addLikePitch(jobs,data.job_id,data.app_id,data.id_user_make_notify);
		$scope.jobs = jobs;
		
		pitchs = LIKE.addLikePitchSidebar(pitchs,data.app_id,data.id_user_make_notify);
		$scope.pitchs = pitchs;

		$scope.$apply();

	})
	IO.on(LIKE_JOB_SOCKET_EVENT,function(data){

		if(data.id_user_make_notify == user._id) return;

		jobs = LIKE.addLikeJob(jobs,data.job_id,data.id_user_make_notify);
		
		$scope.jobs = jobs;
		
		$scope.$apply();
	})

	IO.on(COMMENT_PITCH_SOCKET_EVENT,function(data){

		if(data.id_user_make_notify == user._id) return;

		console.log("Pitch Sidebar Comment Socket",data);

		jobs   = COMMENT.addRecentComment(jobs,data); 

		pitchs = COMMENT.addCommentSidebar(pitchs,data);
		
		$scope.jobs = jobs;
		$scope.pitchs = pitchs;
		$scope.$apply();
	})
	/*************************************************************************************************************/
											/*POST REPLY PITCH*/
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
					
					pitchs = COMMENT.postNewSidebarPitchCommentHandler(pitchs,pitch,response.comment);
					
					$scope.jobs = jobs;
					$scope.pitchs = pitchs;
				}
			})
		}
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
			}
			var PitchService = COMMENT.postNewPitchComment(data);
			PitchService.then(function(response){
				if(response.error_code == 0){
					$('.sidebar-comment-body textarea').val('');
					pitchs = COMMENT.postNewSidebarPitchCommentHandler(pitchs,pitch,response.comment);

					jobs = COMMENT.postNewSidebarPitchCommentHandlerAddRecentComment(jobs,pitch,response.comment);

					$scope.jobs = jobs;
					$scope.pitchs = pitchs;
				}else{
					alert(response.msg);
				}
			})
		}
	}
	/*
	* new View Pitch
	*/
	$scope.ViewPitch_NEW = function(job){
		var data = PITCH.createGetPitchData($rootScope.user,job);
		var PitchService = PITCH.getPitch(data);
		PitchService.then(function(response){
			if(response.error_code == 0){
				PITCH.getPitchHandle(job,$rootScope.user._id,response.app);
			}else{
				alert(response.msg);
			}
		})
	}
	/*
	* new Like Pitch 
	*/
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
	/*
	* new like job
	*/
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
	/*
	* new get pitch comment
	*/
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
	/*
	* new apply job
	*/
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

	/*
	* Interest Pitch
	*/
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
})