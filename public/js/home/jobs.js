var Jobs = angular.module('jobs',['nightfury-upload','application-sidebar','left-sidebar','user-service','ui.bootstrap.popover','pitch.service','job.service','hashtag.service','like.service','interest.service','route.service','socket.service','comment.service']);
Jobs.directive('jobs',function(){
	return {
		restrict: 'E',
		templateUrl: '/directives/home/jobs.html',
		link: function(scope,element,attrs){

		},
		controller: 'JobCtrl',
	}
})
Jobs.controller('JobCtrl',function($rootScope,$scope,$http,USER,PITCH,JOB,HASHTAG,LIKE,INTEREST,ROUTE,SOCKET,COMMENT){
	/*
	* View user
	*/
	$scope.ViewUser = function(user_id,evt){
		ROUTE.ViewUserProfile(user_id,evt);
	}
	
	

	$scope.ViewCompanyProfile = function(evt,id){
		evt.stopPropagation();
	}
	/*************************************************************************************************************/
											/*PITCH COMMENT*/
	/*************************************************************************************************************/
	// $scope.getPitchComment = function(job,pitch){
	// 	if(pitch.loaded == true) return;
		
	// 	var data = {
	// 		user_id: $rootScope.user._id,
	// 		token: $rootScope.user.token,
	// 		comments: pitch.comment,
	// 	}
	// 	var JobService = COMMENT.getPitchComment(data);
	// 		JobService.then(function(response){
	// 			if(response.error_code == 0){
	// 				jobs = PITCH.getPitchCommentHandler(jobs,job,pitch,response.comment);
	// 				$scope.jobs = jobs;
	// 			}else{
	// 				alert(response.msg);
	// 			}
	// 		})
	// }
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
	// $scope.Apply = function(job, ApplyDesc){
	// 	var data = {
	// 		user_id: $rootScope.user._id,
	// 		token: $rootScope.user.token,
	// 		job_id: job._id,
	// 		title: "",
	// 		description: ApplyDesc,
	// 		hash_tag: HASHTAG.findHashTag(ApplyDesc),
	// 		file: '',
	// 	};
	// 	console.log('post New Pitch:',data);
	// 	$('#ApplyDesc').val('');
	// 	PitchService = PITCH.postNewPitch(data);
	// 	PitchService.then(function(response){
	// 		if(response.error_code == 0){
	// 			jobs = PITCH.postNewPitchHandler(jobs,job,response.application);
	// 			$scope.jobs = jobs;
	// 		}else{
	// 			alert(response.msg);
	// 		}
	// 	})
	// }
	
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
											/*LIKE*/
	/*************************************************************************************************************/


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
	// $scope.InterestPitch = function(pitch,job){
	// 	var data = {
	// 		user_id : $rootScope.user._id,
	// 		token   : $rootScope.user.token,
	// 		app_id  : pitch._id,
	// 	};
	// 	var InterestService = INTEREST.postInterest(data);
	// 	InterestService.then(function(response){
	// 		console.log(response);
	// 		if(response.error_code == 0){
	// 			jobs = INTEREST.postInterestHandler(jobs,job,pitch);
	// 			$scope.jobs = jobs;
	// 		}else{
	// 			alert(response.msg);
	// 		}
	// 	})
	// }
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
			user_id: $rootScope.user._id,
			token: $rootScope.user.token,
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