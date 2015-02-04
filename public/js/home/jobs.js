var Jobs = angular.module('jobs',['nightfury-upload','application-sidebar','left-sidebar']);
Jobs.directive('jobs',function(){
	return {
		restrict: 'E',
		templateUrl: '/directive/home/jobs',
		link: function(scope,element,attrs){
			// $('#ApplyDesc').elastic();
		},
	}
})
Jobs.controller('JobCtrl',function($scope,$http){
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
		}
		if(jobs != undefined){
			jobs.forEach(function(v,k){
				if(!(v.link_direct.match(/^http/))) jobs[k].link_direct = 'http://' + v.link_direct;
				if(v.description.length > 144){
					jobs[k].shortDesc = v.description.substring(0,144) + '...';
				}else{
					jobs[k].shortDesc = v.description;
				}
			})
		}
		$scope.jobs = jobs;
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

})