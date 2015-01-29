var TagList = angular.module('tag-list',[]);
TagList.directive('tagList',function(){
	return {
		restrict: 'E',
		templateUrl: '/directive/home/tag-list',
		link: function(scope,element,attrs){

		},
	}
})