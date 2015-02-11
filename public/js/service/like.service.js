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
		var index_pitch = jobs[index_job].applications.loadFromSever.indexOf(pitch);
		if(jobs[index_job].applications.loadFromSever[index_pitch].likes.liked == true){
			jobs[index_job].applications.loadFromSever[index_pitch].likes.number--;
			jobs[index_job].applications.loadFromSever[index_pitch].likes.liked = false;
		}else{
			jobs[index_job].applications.loadFromSever[index_pitch].likes.number++;
			jobs[index_job].applications.loadFromSever[index_pitch].likes.liked = true;
		}
		return jobs;
	}
})