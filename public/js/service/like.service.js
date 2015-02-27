var LikeService = angular.module('like.service',[]);
LikeService.service('LIKE',function($http,$q){
	/*
	* like a pitch
	*/
	this.LikePitch = function(data){
		var defferer = $q.defer();
		$http.post(STR_API_LIKE,data).success(function(response){
			defferer.resolve(response);
		});
		return defferer.promise;
	}
	/*
	* LikePitchHandler
	*/
	this.LikePitchHandler = function(jobs,job,pitch,user_id){
		var index_job = jobs.indexOf(job);
		var index_pitch = job.applications.loadFromServer.indexOf(pitch);
		var index_like_user = pitch.likes.list.indexOf(user_id);
		if(pitch.likes.liked && index_like_user > -1){
			pitch.likes.liked = false;
			pitch.likes.list.splice(index_like_user,1);
			pitch.likes.number--;
		}else{
			pitch.likes.liked = true;
			pitch.likes.list.push(user_id);
			pitch.likes.number++;
		}
		job.applications.loadFromServer[index_pitch] = pitch;
		jobs[index_job] = job;
		return jobs;
	}
	this.changeLikeSidebar = function(pitchs,pitch,user_id){
		pitchs.forEach(function(v,k){
			if(v._id == pitch._id){
				var index_like_user = v.likes.list.indexOf(user_id);
				if(v.likes.liked && index_like_user > -1){
					v.likes.liked = false;
					v.likes.list.splice(index_like_user,1);
					v.likes.number--;
				}else{
					v.likes.liked = true;
					v.likes.list.push(user_id);
					v.likes.number++;
				}
				pitchs[k] = v;
			}
		})
		return pitchs;
	}
	/*
	* like pitch
	*/
	this.addLikePitch = function(jobs,job_id,pitch_id,id_user_make_notify){
		jobs.forEach(function(v,k){
			if(v._id == job_id){
				if(v.applications.loadFromServer != undefined){
					v.applications.loadFromServer.forEach(function(v2,k2){
						if(v2._id == pitch_id && v2.likes.list.indexOf(id_user_make_notify) < 0){
							v.applications.loadFromServer[k2].likes.list.push(id_user_make_notify);
							v.applications.loadFromServer[k2].likes.number++;
						}
					})
				}
				jobs[v] = v;
			}
		})
		return jobs;
	}
	this.addLikePitchSidebar = function(pitchs,pitch_id,id_user_make_notify){
		pitchs.forEach(function(v,k){
			if(v._id == pitch_id && v.likes.list.indexOf(id_user_make_notify) < 0){
				v.likes.list.push(id_user_make_notify);
				v.likes.number++;
				pitchs.splice(k,1);
				pitchs.unshift(v);
			}
		})
		return pitchs;
	}
	/*
	* like job
	*/
	this.LikeJob = function(data){
		var defferer = $q.defer();
		$http.post(STR_API_LIKE,data).success(function(response){
			defferer.resolve(response);
		})
		return defferer.promise;
	}
	this.LikeJobHandler = function(jobs,job,user){
		var index           = jobs.indexOf(job);
		var index_like_user = job.likes.list.indexOf(user._id);
		if(job.likes.liked && index_like_user > -1){
			job.likes.liked = false;
			job.likes.number--;
			job.likes.list.splice(index_like_user,1);
			job.likes.users.forEach(function(v,k){
				if(v._id == user._id){
					job.likes.users.splice(k,1);
				}
			})
		}else{
			job.likes.liked = true;
			job.likes.list.push(user._id);
			job.likes.number++;
			var me = {
					_id: user._id,
					avatar: user.avatar.origin,
					avatar_small: user.avatar.small,
					avatar_normal: user.avatar.normal,
					userName: user.username,
				};
			job.likes.users.push(me);
		}
		job.likes.loaded = false;
		jobs[index] = job;
		return jobs;
	}
	this.addLikeJob = function(jobs,job_id,id_user_make_notify){
		jobs.forEach(function(v,k){
			if(v._id == job_id){
				var index_like_user = v.likes.list.indexOf(id_user_make_notify);
				if(v.likes.liked && index_like_user > -1){
					v.likes.liked = false;
					v.likes.list.splice(index_like_user,1);
					v.likes.number--;
				}else{
					v.likes.liked = true;
					v.likes.list.push(id_user_make_notify);
					v.likes.number++;
				}
				jobs[v] = v;
			}
		})
		return jobs;
	}
})