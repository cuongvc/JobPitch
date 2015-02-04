var LeftSidebar = angular.module('left-sidebar',[]);
LeftSidebar.directive('leftSidebar',function(){
	return {
		restrict: 'E',
		templateUrl: '/directive/home/left-sidebar',
		link: function(scope,element,attrs){

		},
	}
})
LeftSidebar.controller('LeftSidebarCtrl',function($scope,$http){
	$http.get(STR_API_TAGS).success(function(response){
		console.log('tags: ',response);
		$scope.LeftSidebarTags = response.tags;
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