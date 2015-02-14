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
	this.LikePitchHandler = function(jobs,job,pitch){
		var index_job = jobs.indexOf(job);
		var index_pitch = jobs[index_job].applications.loadFromServer.indexOf(pitch);
		if(jobs[index_job].applications.loadFromServer[index_pitch].likes.liked == true){
			jobs[index_job].applications.loadFromServer[index_pitch].likes.number--;
			jobs[index_job].applications.loadFromServer[index_pitch].likes.liked = false;
		}else{
			jobs[index_job].applications.loadFromServer[index_pitch].likes.number++;
			jobs[index_job].applications.loadFromServer[index_pitch].likes.liked = true;
		}
		return jobs;
	}
	/*
	* like pitch
	*/
	this.addLikePitch = function(jobs,job_id,pitch_id,id_user_make_notify){
		jobs.forEach(function(v,k){
			if(v._id == job_id){
				if(v.applications.loadFromServer != undefined){
					v.applications.loadFromServer.forEach(function(v2,k2){
						if(v2._id == pitch_id){
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
			if(v._id == pitch_id){
				v.likes.list.push(id_user_make_notify);
				v.likes.number++;
				pitchs[k] = v;
			}
		})
		return pitchs;
	}
	/*
	* like job
	*/
	this.addLikeJob = function(jobs,job_id,id_user_make_notify){
		jobs.forEach(function(v,k){
			if(v._id == job_id){
				v.likes.list.push(id_user_make_notify);
				v.likes.number++;
				jobs[v] = v;
			}
		})
		return jobs;
	}
})