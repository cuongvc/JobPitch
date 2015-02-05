var Header = angular.module('header',[]);
Header.directive('header',function(){
	return {
		restrict: 'E',
		templateUrl: '/directive/home/header',
		link: function(scope,element,attrs){
			$('#navbar-left .fa').click(function(){
				$('.notification-box').addClass('hidden');
				$(this).parent().parent().find('.notification-box').toggleClass('hidden');
			})
		},
	}
})
Header.controller('HeaderCtrl',function($scope,$http){
	$scope.Notifications = [
		{
			image: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xfp1/v/t1.0-1/c0.0.160.160/p160x160/1394789_576403985759899_2014020168_n.jpg?oh=e009eea131bd6cd4929f118f78efe467&oe=556D0D5B&__gda__=1432873081_fe5509aa71fdd77113731b3b8b9972d9",
			user: "Pale Color",
			action: 'likes a job',
			content: "Giao Hàng Nhanh: Trưởng Bộ phận..."
		},
		{
			image: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpa1/v/t1.0-1/c120.0.160.160/p160x160/10455046_606609982789433_860901210522561437_n.jpg?oh=d515b14ed07c4e82a6fee1fe33f754a7&oe=554DCC21&__gda__=1432170086_6b96cf3aa005ce6354cf7e9da064a688",
			user: "Cuong Vu",
			action: 'likes a comment',
			content: "I'm Cuong, 42years old, was HOD in FPT..."
		},
		{
			image: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xfp1/v/t1.0-1/c0.0.160.160/p160x160/1394789_576403985759899_2014020168_n.jpg?oh=e009eea131bd6cd4929f118f78efe467&oe=556D0D5B&__gda__=1432873081_fe5509aa71fdd77113731b3b8b9972d9",
			user: "Pale Color",
			action: 'likes a job',
			content: "Giao Hàng Nhanh: Trưởng Bộ phận..."
		},
		{
			image: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpa1/v/t1.0-1/c120.0.160.160/p160x160/10455046_606609982789433_860901210522561437_n.jpg?oh=d515b14ed07c4e82a6fee1fe33f754a7&oe=554DCC21&__gda__=1432170086_6b96cf3aa005ce6354cf7e9da064a688",
			user: "Cuong Vu",
			action: 'likes a comment',
			content: "I'm Cuong, 42years old, was HOD in FPT..."
		},
		{
			image: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xfp1/v/t1.0-1/c0.0.160.160/p160x160/1394789_576403985759899_2014020168_n.jpg?oh=e009eea131bd6cd4929f118f78efe467&oe=556D0D5B&__gda__=1432873081_fe5509aa71fdd77113731b3b8b9972d9",
			user: "Pale Color",
			action: 'likes a job',
			content: "Giao Hàng Nhanh: Trưởng Bộ phận..."
		},
		{
			image: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpa1/v/t1.0-1/c120.0.160.160/p160x160/10455046_606609982789433_860901210522561437_n.jpg?oh=d515b14ed07c4e82a6fee1fe33f754a7&oe=554DCC21&__gda__=1432170086_6b96cf3aa005ce6354cf7e9da064a688",
			user: "Cuong Vu",
			action: 'likes a comment',
			content: "I'm Cuong, 42years old, was HOD in FPT..."
		},
	];	
})
