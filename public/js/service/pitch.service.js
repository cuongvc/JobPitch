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
	this.getPitchHandler = function(jobs,job,user_id,pitchs){
		var index                       = jobs.indexOf(job);
		job.showApplyBox               = true;
		job.applications.loadFromServer = pitchs;
		job.applications.loadFromServer.forEach(function(v,k){
			job.applications.loadFromServer[k].number = v.comment.length;
			if(jobs[index].applications.loadFromServer[k].likes.list.indexOf(user_id) > -1){
				jobs[index].applications.loadFromServer[k].likes.liked = true;
			}else{
				jobs[index].applications.loadFromServer[k].likes.liked = false;
			}

			if(jobs[index].applications.loadFromServer[k].interests.list.indexOf(user_id) > -1){
				jobs[index].applications.loadFromServer[k].interests.interested = true;
			}else{
				jobs[index].applications.loadFromServer[k].interests.interested = false;
			}
		})
		jobs[index] = job;
		return jobs;
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
		jobs[index].applications.loadFromServer.push(application);
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
		var index_pitch = job.applications.loadFromServer.indexOf(pitch);
		jobs[index_job].applications.loadFromServer[index_pitch].showReplyForm = true;
		var PitchCommentService = this.getPitchComment(data);
		var defferer = $q.defer();
		PitchCommentService.then(function(response){
			console.log('pitch comment:',response);
			if(response.error_code == 0){
				jobs[index_job].applications.loadFromServer[index_pitch].comments = response.comment;
				jobs[index_job].applications.loadFromServer[index_pitch].loaded = true;
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
		if(data.content == '') return;
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
		var index_pitch = job.applications.loadFromServer.indexOf(pitch);
		jobs[index_job].applications.loadFromServer[index_pitch].comments.push(comment);
		jobs[index_job].applications.loadFromServer[index_pitch].number++;
		return jobs;
	}
	/*
	* get pitch sidebar
	*/
	this.getPitchSidebar = function(data){
		var defferer = $q.defer();
		$http.post(STR_API_GET_PITCH,data).success(function(response){
			defferer.resolve(response);
		})
		return defferer.promise;
	}
	this.getPitchSidebarHandler = function(pitchs,user_id){
		pitchs.forEach(function(v,k){
			pitchs[k].comments = {
				list: v.comment,
				number: v.comment.length,
			};
			if(v.likes.list.indexOf(user_id) > -1){
				pitchs[k].likes.liked = true;
			}else{
				pitchs[k].likes.liked = false;
			}
			if(v.interests.list.indexOf(user_id) > -1){
				pitchs[k].interests.interested = true;
			}else{
				pitchs[k].interests.interested = false;
			}
		})
		return pitchs;
	}
	
})