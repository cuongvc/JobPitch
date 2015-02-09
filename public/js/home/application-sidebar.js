var ApplicationSideBar = angular.module('application-sidebar',[]);
ApplicationSideBar.directive('applicationSidebar',function(){
	return {
		restrict: 'E',
		templateUrl: '/directives/home/application-sidebar.html',
		link: function(scope,element,attrs){

		},
	}
})
ApplicationSideBar.controller('ApplicationSideBarCtrl',function($scope,$http){
	var pitchs = new Array();
	$scope.ApplicationSideBarComments = [
		{username: 'Facebook', comment: 'Bạn nghĩ thế nào khi làm ứng dung mượt mà như Facebook App',avatar: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xap1/v/t1.0-1/p160x160/10888891_792437770805243_2605756062524274878_n.jpg?oh=444e0545d1bbada68355d8e5c6ab8828&oe=5561A471&__gda__=1431450996_805f65e459f6cd3eb2d621d08d3d6151"},
		{username: 'Android', comment: 'FB là ứng dụng tốt, chúng tôi hoàn toàn có thể là ra những ứng dụng như thế',avatar: "https://pbs.twimg.com/profile_images/522909800191901697/FHCGSQg0_bigger.png"},
		{username: 'Đình Thuận', comment: '@Android hãy về đội của anh =))', avatar: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpf1/v/t1.0-1/c0.0.160.160/p160x160/1460236_622400927824334_887047684_n.jpg?oh=81f71efa7346e62a5944772a0a2b2d4c&oe=55522A78&__gda__=1431130368_eafae6507d275d5d53493f9b9e65397f"},
	];
	/******************************************************************************************/
									/*SOCKET*/
	/******************************************************************************************/
	IO.on(APPLY_JOB_SOCKET_EVENT,function(response){
		console.log(APPLY_JOB_SOCKET_EVENT,response);
		
		if(response.application.user_id == $scope.user._id) return;
		pitchs.unshift(response.application);
		$scope.pitchs = pitchs;
		$scope.$apply();
	})
	/******************************************************************************************/
									/*GET PITCH*/
	/******************************************************************************************/
	var data = {
		user_id : $scope.user._id,
		token   : $scope.user.token,
		start: 0,
		limmit: 5,
	};
	$http.post(STR_API_GET_PITCH,data).success(function(response){
		console.log('Pitch',response);
		if(response.error_code == 0){
			pitchs = response.applications;
			pitchs.forEach(function(v,k){
				pitchs[k].comments = {
					list: v.comment,
					number: v.comment.length,
				}
			})
			$scope.pitchs = pitchs;
			console.log(pitchs);
		}
	})
	$scope.ApplicationSidebarViewMoreComment = function(numberCmt){
		for(i=0;i<numberCmt;i++){
			var newCmt = {username: 'Another User',comment: 'another comment'};
			$scope.ApplicationSideBarComments.push(newCmt);
		}
	}
	var ApplicationsSidebar = [];
	for(i = 0; i < 5; i++){
		ApplicationsSidebar.push({user: "Thanchet",showSideBarComment : false});
	}
	$scope.ApplicationsSidebar = ApplicationsSidebar;
	$scope.ShowApplicationSidebarComment = function(pitch){
		var index = pitchs.indexOf(pitch);
		pitchs[index].showComment = true;
		$scope.pitchs = pitchs;
	}
	
})