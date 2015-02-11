TemplateApp.controller('ProfileCtrl',function($scope,$http,$routeParams,PITCH,JOB,HASHTAG){
	$scope.BASE_URL = BASE_URL;
	$scope.user     = user;
	$scope.logedin  = logedin;
	var profile;
	var jobs;
	var data = {
		user_id: $scope.user._id,
		token: $scope.user.token,
		users: [$routeParams.user_id],
	}

	$http.post(STR_API_GET_USER,data).success(function(response){
		console.log(response);
		if(response.error_code == 0){
			profile = response.users[0];
			if(profile.followMes.indexOf($scope.user._id) < 0){
				profile.followed = false;
			}else{
				profile.followed = true;
			}
			profile.follow_number = profile.followMes.length;
			profile.jobs_number = profile.myJobs.length;
			$scope.profile = profile;
		} 
	})
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
											/*GET LIST JOBS*/
	/****************************************************************************************************/
	var data = {
		user_id: $scope.user._id,
		token  : $scope.user.token,
	};
	$http.post(STR_API_MY_JOBS,data).success(function(response){
		console.log(response);
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
		var data = {
		    user_id: $scope.user._id,
		    token: $scope.user.token,
		    job_id: job._id,
		}
		JobService = PITCH.ViewPitch(jobs,job,data);
		JobService.then(function(data){
			jobs = data;
			$scope.jobs = jobs;
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
})