var Notification = angular.module('notification.service',[]);
	Notification.service('NOTIFICATION',function($q,$http){
		this.getNotification = function(data){
			var defferer = $q.defer();
			$http.post(STR_API_GET_NOTIFICATION,data).success(function(response){
				defferer.resolve(response);				
			})
			return defferer.promise;
		}
		this.getNotificationHandler = function(notifications,data){
			notifications.loaded = true;
			if(notifications.list == undefined) notifications.list = new Object();
			data.forEach(function(v,k){
				var newNotifi = {
					user: v.content.userName_make_notify,
					image: v.content.userAvatar_make_notify,
					action: v.content.content,
					content: v.content.short_content,
					data: {
						url: '/job/' + v.content.job_id,
						job_id: v.content.job_id,
					},
				}
				notifications.list.push(newNotifi);
			})
			return notifications;
		}	
	})