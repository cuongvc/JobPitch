var SocketService = angular.module('socket.service',[]);
SocketService.service('SOCKET',function(){
	this.checkUserReciveNotification = function(user_id,user_recive_array)
	{
		if(user_recive_array.indexOf(user_id) < 0)
		{
			return false;
		}else{
			return true;
		}
	}
	/*
	* make short title
	*/
	this.makeShortTitle = function(title){
		var shortTitle = title;
		if(shortTitle.length > 40) shortTitle = shortTitle.substring(shortTitle,40) + '...';
		return shortTitle;
	}
	/*
	* make new notification
	*/
	this.makeNewNotification = function(data,action,more_data){
		var shortTitle = this.makeShortTitle(data.content);
		return {
			data: more_data,
			user: data.userName_user_make_notify,
			image: data.avatar_user_make_notify,
			action: action,
			content: shortTitle
		}
	}
	/*
	* push pitch to recent jobs
	*/
	this.pushPitchToRecentJob = function(jobs,pitch)
	{
		var job_id = pitch.job_id;
		jobs.forEach(function(v,k){
			if(v._id == job_id){
				jobs[k].applications.number++;
				if(v.showApplyBox){
					jobs[k].applications.loadFromServer.push(pitch);
					jobs[k].applications.list.push(pitch._id);
				}else{
					jobs[k].applications.list.push(pitch._id);
				}
			}
		})
		return jobs;
	}

})