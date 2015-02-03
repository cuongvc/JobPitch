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
	$scope.LeftSidebarTags = [
		{id:'_id',name:'#Coder'},
		{id:'_id',name:'#Designer'},
		{id:'_id',name:'#PHP'},
		{id:'_id',name:'#MINE'},
		{id:'_id',name:'#Google'},
		{id:'_id',name:'#Facebook'},
	];
	$scope.LeftSidebarCompanies = [
		{name: '@Google'},
		{name: '@Facebook'},
		{name: '@Innervision Group'},
		{name: '@Campcoders'},
		{name: '@FPT'},
		{name: '@Viettel'},
		{name: '@Smart OSC'},
	];
	$scope.LeftSidebarTrends = [
		{name: 'Việc nhẹ lương cao'},
		{name: 'Leader PHP'},
		{name: 'Senior iOS & Andoid'},
		{name: 'MINE'},
		{name: 'AI'},
		{name: 'Streaming'},
	];
})