var JobPopup = angular.module('job-popup',['pitch.service']);
	JobPopup.directive('jobPopup',function(){
		return {
			restrict: 'E',
			templateUrl : '/directives/home/job-popup.html',
			link: function(scope, element, attrs){
				$(element).bind('mousewheel DOMMouseScroll', function(e) {
				    e.stopPropagation();
				})
			},
			controller: 'JobPopupCtrl',
		}
	})
	JobPopup.controller('JobPopupCtrl',function($rootScope,$scope,PITCH){
		$scope.showJobPopup = false;

		$scope.$on(LOAD_JOB_POPUP,function(){
			console.log($rootScope.JobPopup);
			$scope.showJobPopup = true;
		})
		$scope.hiddenJobPopup = function(){
			$scope.showJobPopup = false;
		}
		$scope.stopEvent = function(evt){
			evt.stopPropagation();
		}
		$scope.$watch(function(){
			return $scope.showJobPopup;
		},function(){
			if($scope.showJobPopup){
				$('body').css('overflow-y', 'hidden');
			}else{
				$('body').css('overflow-y', 'scroll');
			}
		})
		
	})	