var LeftSidebar = angular.module('left-sidebar',[]);
LeftSidebar.directive('leftSidebar',function(){
	return {
		restrict: 'E',
		templateUrl: '/directives/home/left-sidebar.html',
		link: function(scope,element,attrs){

		},
	}
})
LeftSidebar.controller('LeftSidebarCtrl',function($scope,$http){
	$http.get(STR_API_TOP_HASHTAG).success(function(response){
		console.log('tags: ',response);
		$scope.LeftSidebarTags = response.top_hashtag;
	})
	$scope.LeftSidebarCompanies = [
		{name: '@Google'},
		{name: '@Facebook'},
		{name: '@Innervision Group'},
		{name: '@Campcoders'},
		{name: '@FPT'},
		{name: '@Viettel'},
		{name: '@Smart OSC'},
	];
})