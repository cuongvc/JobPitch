TemplateApp.controller('IndexCtrl',function($scope,$http,JOB){
	$scope.user    = user;
	$scope.logedin = logedin;
	$scope.ViewUser = function(user_id){
		history.pushState({},'','user/'+user_id);
	}
	$scope.LoadMore = function(element){
		/*
		* LOAD MORE JOB
		*/
		JobScroll.start += JobScroll.limit;
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
		})
		/*
		* LOAD MORE PITCH
		*/
		PitchScroll.start += PitchScroll.limit;
		$http.post(STR_API_GET_PITCH,data).success(function(response){
			console.log('Load More Pitch',response);
			if(response.error_code == 0){
				more_pitchs = response.applications;
				more_pitchs.forEach(function(v,k){
					pitchs[k].comments = {
						list: v.comment,
						number: v.comment.length,
					};
					if(v.likes.list.indexOf($scope.user._id) > -1){
						pitchs[k].likes.liked = true;
					}else{
						pitchs[k].likes.liked = false;
					}
				})
				more_pitchs.forEach(function(v,k){
					pitchs.push(v);
				})
			}
		})
	}
})