TemplateApp.controller('IndexCtrl',function($scope,$http,JOB,PITCH,USER,SOCKET,LIKE,HASHTAG,COMMENT){
	$scope.user    = user;
	$scope.logedin = logedin;
	$scope.BASE_URL = BASE_URL;
	
	if(document.location.pathname == '/'){
	/******************************************************************************************/
											/*LOAD JOB*/
	/******************************************************************************************/
		var data = {
				user_id: $scope.user._id,
				token: $scope.user.token,
				skip: 0,
				limit: 100,
			}
		var JobService = JOB.getJob(data);
			JobService.then(function(response){
			console.log("JOB",response);
			jobs = JOB.JobHandler(response.jobs,$scope.user._id);
			$scope.jobs = jobs;
		})
	/******************************************************************************************/
									/*GET PITCH*/
	/******************************************************************************************/
	var data = {
		user_id : $scope.user._id,
		token   : $scope.user.token,
		skip: 0,
		limit: 100,
	};
	var PitchService = PITCH.getPitchSidebar(data);
		PitchService.then(function(response){
			console.log("Pitch",response);
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
				$scope.pitchs = pitchs;
			}else{
				alert(response.msg);
			}
		})
	} //endif INDEX
	/*************************************************************************************************************/
											/*SOCKET*/
	/*************************************************************************************************************/
	IO.on(CREATE_JOB_SOCKET_EVENT,function(data){
		console.log('Create New Job Socket',data);
		jobs.unshift(data.job);
		$scope.jobs = jobs;
		$scope.$apply();
	})
	IO.on(APPLY_JOB_SOCKET_EVENT,function(data){

		if(data.id_user_make_notify == user._id) return;

		if(data.id_user_make_notify == $scope.user._id) return;
		var pitch = data.app;
			pitch = PITCH.pitchHandler(pitch,$scope.user._id);

		jobs = SOCKET.pushPitchToRecentJob(jobs,pitch);

		var pitch = data.app;
			pitch = PITCH.pitchHandler(pitch);

		var UserService = USER.get(pitch.interests.list,$scope.user._id,$scope.user.token);
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
	/******************************************************************************************/
									/*LIKE PITCH*/
	/******************************************************************************************/
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
				if(job != undefined){
					jobs   = LIKE.LikePitchHandler(jobs,job,pitch,data.user_id);
					pitchs = LIKE.changeLikeSidebar(pitchs,pitch,data.user_id);
				}else{
					console.log(pitch);
					pitchs = LIKE.changeLikeSidebar(pitchs,pitch,data.user_id);
				}
				$scope.jobs   = jobs;
				$scope.pitchs = pitchs;
			})
	}
	/*************************************************************************************************************/
											/*POST REPLY PITCH*/
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
					
					jobs   = PITCH.postNewPitchCommentHandler(jobs,job,pitch,response.comment);
					
					pitchs = PITCH.postNewPitchSidebarCommentHandler(pitchs,pitch,response.comment);
					
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
				user_id : $scope.user._id,
				token : $scope.user.token,
				content : PitchReply,
				hash_tag : HASHTAG.findHashTag(PitchReply),
				application_parent : pitch._id,
				job_parent: pitch.job_id,
				comment_parent : "",
			}
			var PitchService = PITCH.postNewPitchComment(data);
			PitchService.then(function(response){
				if(response.error_code == 0){
					$('.sidebar-comment-body textarea').val('');
					pitchs = PITCH.postNewSidebarPitchCommentHandler(pitchs,pitch,response.comment);

					jobs = PITCH.postNewSidebarPitchCommentHandlerAddRecentComment(jobs,pitch,response.comment);

					$scope.jobs = jobs;
					$scope.pitchs = pitchs;
				}else{
					alert(response.msg);
				}
			})
		}
	}
})