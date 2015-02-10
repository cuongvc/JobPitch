var JobService = angular.module('job.service',[]);

JobService.service('JOB',function($http,$q){
	/*
	* get jobs from server
	*/
	this.getJob = function(data){
		var defferer = $q.defer();
		$http.post(STR_API_RECENT,data).success(function(response){
			defferer.resolve(response);
		})
		return defferer.promise;
	}
	/*
	* job handler
	*/
	this.JobHandler = function(jobs,user_id){
		jobs.forEach(function(v,k){
			if(v.likes.list.indexOf(user_id) > -1){
				jobs[k].likes.liked = true;
			}else{
				jobs[k].likes.liked = false;
			}
		})
		return jobs;
	}

})