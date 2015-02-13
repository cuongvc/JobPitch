var InterestService = angular.module('interest.service',[]);
InterestService.service('INTEREST',function($http,$q){
	this.postInterest = function(data){
		var defferer = $q.defer();
		$http.post(STR_API_INTEREST,data).success(function(response){
			defferer.resolve(response);			
		})
		return defferer.promise;
	}
	this.postInterestHandler = function(jobs,job,pitch){
		var index_job   = jobs.indexOf(job);
		var index_pitch = job.applications.loadFromServer.indexOf(pitch);
		if(pitch.interests.interested == true){
			pitch.interests.number--;
			pitch.interests.interested = false;
		}else{
			pitch.interests.number++;
			pitch.interests.interested = true;
		}
		jobs[index_job].applications.loadFromServer[index_pitch] = pitch;
		return jobs;
	}
	this.getInterestedCompanyLogo = function(data){
		
	}
})