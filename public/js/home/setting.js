var Setting = angular.module('setting',[]);
Setting.directive('profile',function(){
	return {
		restrict: 'E',
		templateUrl: '/directive/home/profile',
		link: function(scope,element,attrs){

		},
	}
})
Setting.controller('SettingCtrl',function($scope,$http){
	$scope.EditProfile = function(){
		$('.editable p').css('border','1px dotted #eee');
		$('.editable p').attr('contenteditable','true');
	}	
})