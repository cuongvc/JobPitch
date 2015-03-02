var CommentService = angular.module('comment.service',[]);
CommentService.service('COMMENT',function($q,$http){
	/*
	* create get Pitch comment data
	*/
	this.createGetPitchCommentData = function(user, pitch){
		return {
			user_id: user._id,
			token: user.token,
			comments: pitch.comment,
		}
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
	* get pitch comment handle
	*/
	this.getPitchCommentHandle = function(pitch,comments){
		
		pitch.comments.list   = comments;
		pitch.comments.loaded = true;
		pitch.showReplyForm   = true;

		return pitch;
	}
	this.addCommentSidebar = function(pitchs,data){
		pitchs.forEach(function(v,k){
			if(v._id == data.app_id){
				v.comments.numberOfComment++;
				v.comment.push(data.comment._id);
				if(v.comments.loaded != undefined && v.comments.loaded){
					var newCmt = data.comment;
					v.comments.list.push(newCmt);
				}
				pitchs.splice(k,1);
				pitchs.unshift(v);
			}
		})
		return pitchs;
	}
	this.addRecentComment = function(jobs,data){
		jobs.forEach(function(v,k){
			if(v._id == data.job_id){
				if(v.applications.loadFromServer != undefined){
					v.applications.loadFromServer.forEach(function(v2,k2){
						if(v2.comments.loaded != undefined && v2.comments.loaded){
							v2.comment.push(data.comment._id);
							v2.comments.numberOfComment++;
							v2.comments.list.push(data.comment);
						}else{
							v2.comment.push(data.comment._id);
							v2.comments.numberOfComment++;
						}
						v.applications.loadFromServer[k2] = v2;
					})
				}
				jobs[k] = v;
			}
		})
		return jobs;
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
	this.postNewSidebarPitchCommentHandler = function(pitchs,pitch,comment){
		pitchs.forEach(function(v,k){
			if(v._id == pitch._id){
				v.comments.numberOfComment++;
				v.comment.push(comment._id);
				if(v.comments.loaded != undefined && v.comments.loaded){
					v.comments.list.push(comment);
				}
				pitchs.splice(k,1);
				pitchs.unshift(v);
			}
		})
		return pitchs;
	}
	this.postNewSidebarPitchCommentHandlerAddRecentComment = function(jobs,pitch,comment){
		jobs.forEach(function(v,k){
			if(v._id == comment.job_parent){
				if(v.applications.loadFromServer != undefined){
					v.applications.loadFromServer.forEach(function(v2,k2){
						v2.comment.push(comment._id);
						v2.comments.numberOfComment++;
						if(v2._id == comment.application_parent){
							if(v2.comments.loaded != undefined && v2.comments.loaded){
								v2.comments.list.push(comment);
							}
							v.applications.loadFromServer[k2] = v2;
						}
					})
					jobs[k] = v;
				}
			}
		})
		return jobs;
	}
})