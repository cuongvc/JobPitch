TemplateApp.controller('IndexCtrl',function($scope,$http,JOB){
	$scope.user    = user;
	$scope.logedin = logedin;
	
	$scope.LoadMore = function(element){
		if(JobScroll.loading == true || PitchScroll.loading == true) return;
		JobScroll.loading = true;
		PitchScroll.loading = true;
		/*
		* LOAD MORE JOB
		*/
		if(JobScroll.stop == false) JobScroll.start += JobScroll.limit;
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
			console.log('Load More Job',response);
			more_jobs = JOB.JobHandler(response.jobs,$scope.user._id);
			more_jobs.forEach(function(v,k){
				jobs.push(v);
			})
			$scope.jobs = jobs;
			JobScroll.loading = false;
			if(more_jobs.length == 0) JobScroll.stop = true;
		})
		/*
		* LOAD MORE PITCH
		*/
		if(PitchScroll.stop == false) PitchScroll.start += PitchScroll.limit;
		var data = {
			user_id : $scope.user._id,
			token   : $scope.user.token,
			skip: PitchScroll.start,
			limit: PitchScroll.limit,
		};
		$http.post(STR_API_GET_PITCH,data).success(function(response){
			console.log('Load More Pitch',response);
			if(response.error_code == 0){
				more_pitchs = response.applications;
				more_pitchs.forEach(function(v,k){
					more_pitchs[k].comments = {
						list: v.comment,
						numberOfComment: v.comment.length,
					};
					if(v.likes.list.indexOf($scope.user._id) > -1){
						more_pitchs[k].likes.liked = true;
					}else{
						more_pitchs[k].likes.liked = false;
					}
				})
				more_pitchs.forEach(function(v,k){
					pitchs.push(v);
				})
				if(more_pitchs.length == 0) PitchScroll.stop = true;
			}
			PitchScroll.loading = false;
		})
	}
})