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
	* pitch handler
	*/
	function pitchHandlerFuction(pitch,user_id){
		pitch.short_job_title = pitch.job_title.substring(0,18) + '...';
		pitch.comments = {
			numberOfComment: pitch.comment.length,
		};
		pitch.showReplyForm = false;
		if(pitch.likes.list.indexOf(user_id) < 0){
			pitch.likes.liked = false;
		}else{
			pitch.likes.liked = true;
		}
		if(pitch.interests.list.indexOf(user_id) < 0){
			pitch.interests.interested = false;
		}else{
			pitch.interests.interested = true;
		}
		return pitch;
	}
	this.pitchHandler = function(pitch,user_id){
		return pitchHandlerFuction(pitch,user_id);
	}
	/*
	* complete function ViewPitch
	*/
	this.getPitchHandler = function(jobs,job,user_id,pitchs){
		var index                       = jobs.indexOf(job);
		job.showApplyBox                = true;
		job.applications.loadFromServer = pitchs;
		job.applications.loadFromServer.forEach(function(v,k){
			job.applications.loadFromServer[k] = pitchHandlerFuction(v,user_id);
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
		application.comments = {
			numberOfComment: 0,
			list: [],
		};
		jobs[index].applications.loadFromServer.push(application);
		jobs[index].applications.list.push(application._id);
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
	* get pitch comment handler
	*/
	this.getPitchCommentHandler = function(jobs,job,pitch,comments){
		var index_job         = jobs.indexOf(job);
		var index_pitch       = job.applications.loadFromServer.indexOf(pitch);
		
		pitch.comments.list   = comments;
		pitch.comments.loaded = true;
		pitch.showReplyForm   = true;

		jobs[index_job].applications.loadFromServer[index_pitch] = pitch;

		return jobs;
	}
	this.getSidebarPitchCommentHandler = function(pitchs,pitch,comments){
		var index_pitch = pitchs.indexOf(pitch);
		pitch.comments.list   = comments;
		pitch.comments.loaded = true;
		pitch.showReplyForm   = true;
		pitchs[index_pitch] = pitch;
		return pitchs;
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
		jobs[index_job].applications.loadFromServer[index_pitch].comments.list.push(comment);
		jobs[index_job].applications.loadFromServer[index_pitch].comments.numberOfComment++;
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
			pitchs[k].short_job_title = pitchs[k].job_title.substring(0,18) + '...';
			pitchs[k].comments = {
				list: v.comment,
				numberOfComment: v.comment.length,
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