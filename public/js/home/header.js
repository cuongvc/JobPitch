var Header = angular.module('header',[]);
Header.directive('header',function(){
	return {
		restrict: 'E',
		templateUrl: '/directives/home/header.html',
		link: function(scope,element,attrs){
			$('#navbar-left .fa').click(function(e){
				e.stopPropagation();
				$('.notification-box').addClass('hidden');
				$(this).parent().parent().find('.notification-box').toggleClass('hidden');
				$('body').click(function(){
					$('.notification-box').addClass('hidden');
				})
				$('.notification-box').click(function(e){
					e.stopPropagation();
				})
			})
		},
	}
})
Header.controller('HeaderCtrl',function($scope,$http){
	var notifications = {
		list: [],
		raw: [],
		unread: 0,
	};
	$scope.notifications = notifications;
	IO.on(CREATE_JOB_SOCKET_EVENT,function(data){
		console.log('create_job:',data);
		notifications.unread++;
		var newRawNoti = {
			type: CREATE_JOB_SOCKET_EVENT,
			data: data,
		};
		var shortDesc = data.job.description;
		if(shortDesc.length > 40) shortDesc = shortDesc.substring(shortDesc,40) + '...';

		var newNotifi = {
			user: data.job.userName,
			image: data.job.image_small,
			action: 'create a job',
			content: shortDesc,
		}
		notifications.list.push(newNotifi);
		notifications.raw.push(newRawNoti);
		$scope.notifications = notifications;
		$scope.$apply();
	})
	$scope.ClearUnread = function(){
		notifications.unread = 0;
		$scope.notifications = notifications;
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
