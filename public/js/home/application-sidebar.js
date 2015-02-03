var ApplicationSideBar = angular.module('application-sidebar',[]);
ApplicationSideBar.directive('applicationSidebar',function(){
	return {
		restrict: 'E',
		templateUrl: '/directive/home/application-sidebar',
		link: function(scope,element,attrs){

		},
	}
})
ApplicationSideBar.controller('ApplicationSideBarCtrl',function($scope){
	$scope.ApplicationSideBarComments = [
		{username: 'Facebook', comment: 'Bạn nghĩ thế nào khi làm ứng dung mượt mà như Facebook App'},
		{username: 'Android', comment: 'FB là ứng dụng tốt, chúng tôi hoàn toàn có thể là ra những ứng dụng như thế'},
		{username: 'Đình Thuận', comment: '@Android hãy về đội của anh =))'},
	];
	$scope.ApplicationSidebarViewMoreComment = function(numberCmt){
		for(i=0;i<numberCmt;i++){
			var newCmt = {username: 'Another User',comment: 'another comment'};
			$scope.ApplicationSideBarComments.push(newCmt);
		}
	}
	var ApplicationsSidebar = [];
	for(i = 0; i < 5; i++){
		ApplicationsSidebar.push({user: "Thanchet"});
	}
	$scope.ApplicationsSidebar = ApplicationsSidebar;
})