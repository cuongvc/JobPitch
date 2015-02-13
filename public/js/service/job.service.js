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
	/*
	* get jobs in company profile page
	*/
	this.getCompanyJob = function(data){
		var defferer = $q.defer();
		$http.post(STR_API_GET_JOB,data).success(function(response){
			defferer.resolve(response);			
		})
		return defferer.promise;
	}
	/*
	* edit job
	*/
	this.edit = function(data){
		var defferer = $q.defer();
		$http.post(STR_API_EDIT_JOB,data).success(function(response){
			defferer.resolve(response);
		})
		return defferer.promise;
	}
	this.editHandler = function(jobs,job,newJob){
		var index = jobs.indexOf(job);
		jobs[index] = newJob;
		return jobs;
	}

})