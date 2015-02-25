var Header = angular.module('header',['socket.service','notification.service','route.service']);
Header.directive('header',function(){
	return {
		restrict: 'E',
		templateUrl: '/directives/home/header.html',
		link: function(scope,element,attrs){
			$('body').click(function(){
				$('.notification-box').addClass('hidden');
				
			})
			$('.notification-box').bind('mousewheel DOMMouseScroll', function(e) {
			    var scrollTo = null;

			    if (e.type == 'mousewheel') {
			        scrollTo = (e.originalEvent.wheelDelta * -1);
			    }
			    else if (e.type == 'DOMMouseScroll') {
			        scrollTo = 40 * e.originalEvent.detail;
			    }

			    if (scrollTo) {
			        e.preventDefault();
			        $(this).scrollTop(scrollTo + $(this).scrollTop());
			    }
			})
		},
	}
})
Header.controller('HeaderCtrl',function($scope,$http,SOCKET,NOTIFICATION,ROUTE){
	function findBootstrapEnvironment() {
	    var envs = ['xs', 'sm', 'md', 'lg'];

	    $el = $('<div>');
	    $el.appendTo($('body'));

	    for (var i = envs.length - 1; i >= 0; i--) {
	        var env = envs[i];

	        $el.addClass('hidden-'+env);
	        if ($el.is(':hidden')) {
	            $el.remove();
	            return env
	        }
	    };
	}
	if(findBootstrapEnvironment() == 'xs') document.location.href = 'mobile';

	var notifications = {
		list: [],
		unread: 0,
		loaded: false,
	};
	$scope.notifications = notifications;
	console.log(notifications);
	/*************************************************************************************************************/
											/*VIEW NOTIFICATION && USER*/
	/*************************************************************************************************************/
	$scope.ViewNotification = function(url,evt){
		ROUTE.RedirectTo(url,evt);
	}
	/*************************************************************************************************************/
											/*SOCKET*/
	/*************************************************************************************************************/
	IO.on(CREATE_JOB_SOCKET_EVENT,function(data){
		console.log('create_job:',data);
		
		if(SOCKET.checkUserReciveNotification($scope.user._id, data.user_receive_notify) == false) return;

		var more_data = {
			    type: CREATE_JOB_SOCKET_EVENT,
			    value: {
			        job_id: data.job_id,
			    },
			    url: '/job/'+job_id,	
			};
		addNewNotification(SOCKET.makeNewNotification(data,SOCKET_ACTION[CREATE_JOB_SOCKET_EVENT],more_data));
	})
	IO.on(APPLY_JOB_SOCKET_EVENT,function(data){
		console.log(APPLY_JOB_SOCKET_EVENT,data);
		
		if(SOCKET.checkUserReciveNotification($scope.user._id, data.user_receive_notify) == false) return;
		
		var more_data = {
					type: APPLY_JOB_SOCKET_EVENT, 
					value: {
						job_id: data.job_id,
						pitch_id: data.app_id,
					}, 
					url: "",
				};
		addNewNotification(SOCKET.makeNewNotification(data,SOCKET_ACTION[APPLY_JOB_SOCKET_EVENT],more_data));
	});
	IO.on(INTEREST_SOCKET_EVENT,function(data){
		console.log(INTEREST_SOCKET_EVENT,data);
		
		if(SOCKET.checkUserReciveNotification($scope.user._id, data.user_receive_notify) == false) return;

		var more_data = {
				type: APPLY_JOB_SOCKET_EVENT, 
				value: {
					job_id: data.job_id,
					pitch_id: data.app_id,
				}, 
				url: "",
			};
		addNewNotification(SOCKET.makeNewNotification(data,SOCKET_ACTION[APPLY_JOB_SOCKET_EVENT],more_data));
	})
	IO.on(LIKE_PITCH_SOCKET_EVENT,function(data){
		console.log(LIKE_PITCH_SOCKET_EVENT,data);

		if(SOCKET.checkUserReciveNotification($scope.user._id, data.user_receive_notify) == false) return;
		
		var more_data = {
				type: LIKE_PITCH_SOCKET_EVENT, 
				value: {
					job_id: data.job_id,
					pitch_id: data.app_id,
				}, 
				url: "",
			};
		addNewNotification(SOCKET.makeNewNotification(data,SOCKET_ACTION[LIKE_PITCH_SOCKET_EVENT],more_data));
	})
	IO.on(LIKE_JOB_SOCKET_EVENT,function(data){
		console.log(LIKE_JOB_SOCKET_EVENT,data);

		if(SOCKET.checkUserReciveNotification($scope.user._id, data.user_receive_notify) == false) return;

		var more_data = {
				type: LIKE_JOB_SOCKET_EVENT, 
				value: {
					job_id: data.job_id,
				}, 
				url: "",
			};
		addNewNotification(SOCKET.makeNewNotification(data,SOCKET_ACTION[LIKE_JOB_SOCKET_EVENT],more_data));
	})



	
	function addNewNotification(newNotifi){
		notifications.list.unshift(newNotifi);
		notifications.unread++;
		$scope.notifications = notifications;
		$scope.$apply();
	}
	/*************************************************************************************************************/
										/*GET NOTIFICATIONS*/
	/*************************************************************************************************************/
	$scope.LoadNotifications = function(evt){
		evt.stopPropagation();
		var target = $(evt.target);
		var parent = target.parent();
		while(!parent.is('li')){
			parent = parent.parent();
		}
		parent.find('.notification-box').toggleClass('hidden');
		notifications.unread = 0;
		$scope.notifications = notifications;
		if(notifications.loaded == false){
			var data = {
				user_id: $scope.user._id,
				token: $scope.user.token,
				start: 0, 
				limit: 10,
			};
			var NotificationService = NOTIFICATION.getNotification(data);
				NotificationService.then(function(response){
					if(response.error_code == 0){
						notifications = NOTIFICATION.getNotificationHandler(notifications,response.notifys);
						console.log(notifications);
						$scope.notifications = notifications;
					}
				})
		}
	}
	
	$scope.goHome = function(){
		history.pushState({},'','/');
	}


	$scope.ChangeHeaderSearchValue = function(value,evt){
		console.log(evt);
	}
	$scope.btnSearch_click  = function(value){
		HeaderSearch(value);
	}
	function HeaderSearch(value){
		console.log(value);
	}
	
})
