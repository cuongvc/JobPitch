var Header = angular.module('header',[]);
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
Header.controller('HeaderCtrl',function($scope,$http){
	var notifications = {
		list: [],
		raw: [],
		unread: 0,
		loaded: false,
	};
	$scope.notifications = notifications;
	console.log(notifications);
	/*************************************************************************************************************/
											/*SOCKET*/
	/*************************************************************************************************************/
	IO.on(CREATE_JOB_SOCKET_EVENT,function(data){
		console.log('create_job:',data);
		notifications.unread++;
		var newRawNoti = {
			type: CREATE_JOB_SOCKET_EVENT,
			data: data,
		};
		var shortTitle = makeShortNotificationTitle(data.job.title);
		var newNoti = {
				user: data.job.userName,
				image: data.job.image_small,
				action: 'create new job',
				content: shortTitle
			}
		addNewNotification(newNoti, newRawNoti);
		
	})
	IO.on(APPLY_JOB_SOCKET_EVENT,function(response){
		console.log(APPLY_JOB_SOCKET_EVENT,response);
		
		if(response.application.user_id == $scope.user._id) return;
		var shortTitle = makeShortNotificationTitle(response.application.description);
		var newNoti = {
				user: response.application.user_name,
				image: response.application.user_avatar,
				action: 'pitch on a job',
				content: shortTitle
			};
		addNewNotification(newNoti,response);
	});
	function makeShortNotificationTitle(title){
		var shortTitle = title;
		if(shortTitle.length > 40) shortTitle = shortTitle.substring(shortTitle,40) + '...';
		return shortTitle;
	}
	function addNewNotification(newNotifi, newRawNoti){
		notifications.list.unshift(newNotifi);
		notifications.raw.unshift(newRawNoti);
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
			$http.post(STR_API_GET_NOTIFICATION,data).success(function(response){
				console.log(response);
				if(response.error_code == 0){
					notifications.loaded = true;
					response.notifys.forEach(function(v,k){
						var newNotifi = {
							user: v.content.userName_make_notify,
							image: v.content.userAvatar_make_notify,
							action: v.content.content,
							content: v.content.short_content,
						}
						notifications.list.push(newNotifi);
						notifications.raw.push(v);
					})
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
