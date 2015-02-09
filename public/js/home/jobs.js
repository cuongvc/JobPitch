var Jobs = angular.module('jobs',['nightfury-upload','application-sidebar','left-sidebar','user-service','ui.bootstrap.popover']);
Jobs.directive('jobs',function(){
	return {
		restrict: 'E',
		templateUrl: '/directives/home/jobs.html',
		link: function(scope,element,attrs){
			// $('#ApplyDesc').elastic();
		},
	}
})
Jobs.controller('JobCtrl',function($scope,$http,USER){
	var jobs;
	var data = {
			user_id: $scope.user._id,
			token: $scope.user.token,
			lat: 21.018549,
			lng: 105.812198,
			address: "9 Nguyên Hong, Thành Công, Ba Đình, Hà Nội, Việt Nam"
		}
	$http.post(STR_API_RECENT,data).success(function(response){
		console.log(response);
		if(response.error_code == 0){
			jobs = response.jobs;
			jobs.forEach(function(v,k){
				if(v.likes.list.indexOf($scope.user._id) > -1){
					jobs[k].likes.liked = true;
				}else{
					jobs[k].likes.liked = false;
				}
			})
		}
		$scope.jobs = jobs;
	})
	IO.on(CREATE_JOB_SOCKET_EVENT,function(data){
		jobs.unshift(data.jobs);
		$scope.jobs = jobs;
		$scope.$apply();
	})
	$scope.ViewApplicant = function(job){
		var index = jobs.indexOf(job);
		jobs[index].showApplyBox = true;
		$scope.jobs = jobs;
		var data = {
		    user_id: $scope.user._id,
		    token: $scope.user.token,
		    job_id: job._id,
		}
		$http.post(STR_API_JOB_DETAIL,data).success(function(response){
			console.log(response);
			if(response.error_code == 0){
				jobs[index].applications.loadFromSever = response.app;
				$scope.jobs = jobs;
			}
			
		})
	}

	$scope.ViewCompanyProfile = function(evt,id){
		evt.stopPropagation();
		console.log('a');
	}
	/*
	* apply 
	*/
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
	$scope.Apply = function(job, ApplyTitle, ApplyDesc){
		var DescHashTags  = ApplyDesc.match(/#\S+/g);
		var HashTags = new Array();
		if(DescHashTags == null){
			HashTags = [];
		}else{
			HashTags = DescHashTags;
		}
		var index = jobs.indexOf(job);
		var data = {
			user_id: $scope.user._id,
			token: $scope.user.token,
			job_id: job._id,
			title: "ApplyTitle",
			description: ApplyDesc,
			hash_tag: HashTags,
			file: '',
		};
		console.log(data);
		$http.post(STR_API_APPLY,data).success(function(response){
			console.log(response);
			if(response.error_code == 0){
				jobs[index].applications.loadFromSever.push(response.application);
				$('#ApplyDesc').val('');
				$scope.jobs = jobs;
			}
		}).error(function(e){
			console.log(e);
		})
	}
	/*
	* share
	*/
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
	/*
	* post pitch reply
	*/
	$scope.PostPitchReply = function(PitchReply,Application,evt){
		if(evt.keyCode == 13){
			var HashTags = PitchReply.match(/#\S+/g);
			if(HashTags == null) HashTags = [];
			var data = {
				user_id : $scope.user._id,
				token : $scope.user.token,
				content : PitchReply,
				hash_tag : HashTags,
				application_parent : Application._id,
				comment_parent : "",
			}
			console.log(data);
			$http.post(STR_API_COMMENT,data).success(function(response){
				console.log(response);
			})
		}
	}
	/*
	* like
	*/
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
		$http.post(STR_API_LIKE,data).success(function(response){
			console.log(response);
			if(response.error_code == 0){
				var index_job = jobs.indexOf(job);
				var index_pitch = jobs[index_job].applications.loadFromSever.indexOf(pitch);
				jobs[index_job].applications.loadFromSever[index_pitch].likes.number += 1;
				$scope.jobs = jobs;
			}
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