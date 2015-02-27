var CommentService = angular.module('comment.service',[]);
CommentService.service('COMMENT',function(){
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
})