var PitchService = angular.module('pitch.service',[]);
PitchService.service('PITCH',function($http,$q){
	/*
	* get Pitchs from server
	*/
	this.getPitch = function(data){
		var defferer = $q.defer();
		$http.post(STR_API_JOB_DETAIL,data).success(function(response){
			defferer.resolve(response);			
		})
		return defferer.promise;
	}
	/*
	* complete function ViewPitch
	*/
	this.ViewPitch = function(jobs,job,data){
		var index = jobs.indexOf(job);
		jobs[index].showApplyBox = true;
		var pitchs = this.getPitch(data);
		var defferer = $q.defer();
		pitchs.then(function(response){
			console.log('View Pitch:',response);
			if(response.error_code == 0){
				jobs[index].applications.loadFromSever = response.app;
				jobs[index].applications.loadFromSever.forEach(function(v,k){
					jobs[index].applications.loadFromSever[k].number = v.comment.length;
				})
				defferer.resolve(jobs);
			}else{
				defferer.resolve(jobs);
			}
		})
		return defferer.promise;
	}
	/*
	* post new Pitch
	*/
	this.postNewPitch = function(data){
		var defferer = $q.defer();
		$http.post(STR_API_APPLY,data).success(function(response){
			defferer.resolve(response);
		}).error(function(e){
			console.log(e);
		})
		return defferer.promise;
	}
	/*
	* post new pitch handler
	*/
	this.postNewPitchHandler = function(jobs,job,application){
		var index = jobs.indexOf(job);
		application.number = 0;
		jobs[index].applications.loadFromSever.push(application);
		jobs[index].applications.number++;
		return jobs;
	}
	/*
	* get Pitch Comment
	*/
	this.getPitchComment = function(data){
		var defferer = $q.defer();
		$http.post(STR_API_GET_COMMENTS,data).success(function(response){
			defferer.resolve(response);
		})
		return defferer.promise;
	}
	/*
	* view pitch comment
	*/
	this.ViewPitchComment = function(jobs,job,pitch,data){
		var index_job = jobs.indexOf(job);
		var index_pitch = job.applications.loadFromSever.indexOf(pitch);
		jobs[index_job].applications.loadFromSever[index_pitch].showReplyForm = true;
		var PitchCommentService = this.getPitchComment(data);
		var defferer = $q.defer();
		PitchCommentService.then(function(response){
			console.log('pitch comment:',response);
			if(response.error_code == 0){
				jobs[index_job].applications.loadFromSever[index_pitch].comments = response.comment;
				jobs[index_job].applications.loadFromSever[index_pitch].loaded = true;
				defferer.resolve(jobs);
			}else{
				alert(response.msg)
				defferer.resolve(jobs);
			}
		})
		return defferer.promise;
	}
	/*
	* post new pitch comment
	*/
	this.postNewPitchComment = function(data){
		var defferer = $q.defer();
		$http.post(STR_API_COMMENT,data).success(function(response){
			defferer.resolve(response);
		})
		return defferer.promise;
	}
	/*
	* post new pitch comment handler
	*/
	this.postNewPitchCommentHandler = function(jobs,job,pitch,comment){
		var index_job = jobs.indexOf(job);
		var index_pitch = job.applications.loadFromSever.indexOf(pitch);
		jobs[index_job].applications.loadFromSever[index_pitch].comments.push(comment);
		jobs[index_job].applications.loadFromSever[index_pitch].number++;
		return jobs;
	}
})