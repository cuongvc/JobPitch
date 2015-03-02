var PitchService = angular.module('pitch.service',[]);
PitchService.service('PITCH',function($http,$q){
	/*
	* create get pich dataa
	*/
	this.createGetPitchData = function(user,job){
		return {
		    user_id: user._id,
		    token: user.token,
		    job_id: job._id,
		}
	}
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
	// this.getPitchHandler = function(jobs,job,user_id,pitchs){
	// 	var index                       = jobs.indexOf(job);
	// 	console.log(index);
	// 	job.showApplyBox                = true;
	// 	job.applications.loadFromServer = pitchs;
	// 	job.applications.loadFromServer.forEach(function(v,k){
	// 		job.applications.loadFromServer[k] = pitchHandlerFuction(v,user_id);
	// 	})
	// 	jobs[index] = job;
	// 	return jobs;
	// }
	this.getPitchHandle = function(job,user_id,pitchs){
		job.showApplyBox                = true;
		job.applications.loadFromServer = pitchs;
		job.applications.loadFromServer.forEach(function(v,k){
			job.applications.loadFromServer[k] = pitchHandlerFuction(v,user_id);
		})
		return job;
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
	// this.postNewPitchHandler = function(jobs,job,application){
	// 	var index = jobs.indexOf(job);
	// 	application.number = 0;
	// 	application.comments = {
	// 		numberOfComment: 0,
	// 		list: [],
	// 	};
	// 	jobs[index].applications.loadFromServer.push(application);
	// 	jobs[index].applications.list.push(application._id);
	// 	jobs[index].applications.number++;
	// 	return jobs;
	// }
	this.postNewPitchHandle = function(job,application){
		application.number = 0;
		application.comments = {
			numberOfComment: 0,
			list: [],
		};
		job.applications.loadFromServer.push(application);
		job.applications.list.push(application._id);
		job.applications.number++;
		return job;
	}
	
	
	this.getSidebarPitchCommentHandler = function(pitchs,pitch,comments){
		var index_pitch = pitchs.indexOf(pitch);
		pitch.comments.list   = comments;
		pitch.comments.loaded = true;
		pitch.showReplyForm   = true;
		pitchs[index_pitch] = pitch;
		return pitchs;
	}

	
	this.postNewSidebarPitchCommentHandler = function(pitchs,pitch,comment){
		var index = pitchs.indexOf(pitch);
		if(pitch.comments.list == undefined) pitch.comments.list = new Array();
		pitch.comment.push(comment._id);
		pitch.comments.list.push(comment);
		pitch.comments.numberOfComment++;
		pitchs[index] = pitch;
		return pitchs;
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
			v.short_job_title = v.job_title.substring(0,18) + '...';
			v.comments = {
				list: v.comment,
				numberOfComment: v.comment.length,
			};
			if(v.likes.list.indexOf(user_id) > -1){
				v.likes.liked = true;
			}else{
				v.likes.liked = false;
			}
			if(v.interests.list.indexOf(user_id) > -1){
				v.interests.interested = true;
			}else{
				v.interests.interested = false;
			}
			pitchs[k] = v;
		})
		return pitchs;
	}
	
})