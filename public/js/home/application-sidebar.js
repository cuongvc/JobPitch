var ApplicationSideBar = angular.module('application-sidebar',['pitch.service','job.service','hashtag.service','like.service','interest.service','user-service','route.service','socket.service','comment.service']);
ApplicationSideBar.directive('applicationSidebar',function(){
	return {
		restrict: 'E',
		templateUrl: '/directives/home/application-sidebar.html',
		link: function(scope,element,attrs){

		},
		controller: 'ApplicationSideBarCtrl',
	}
})
ApplicationSideBar.filter('reverse', function() {
	return function(items) {
		return items.slice().reverse();
	};
});
ApplicationSideBar.controller('ApplicationSideBarCtrl',function($rootScope,$scope,$http,JOB,PITCH,LIKE,HASHTAG,INTEREST,USER,ROUTE, SOCKET,COMMENT){
	var InterestList = new Array();
	$scope.InterestList = InterestList;

	$scope.LoadMoreInterestLogo = function(){
		pushLogo.forEach(function(v,k){
			InterestList.push(v);
		})
		$scope.InterestList = InterestList;
	}
	$scope.ViewCompany = function(user_id,evt){
		ROUTE.ViewUserProfile(user_id,evt);
	}
	$scope.ViewNormalUser = function(user_id,evt){
		var url = '/u/' + user_id;
		ROUTE.RedirectTo(url,evt);
	}
	$scope.ViewSidebarJob = function(job_id,evt){
		var url = '/job/' + job_id;
		ROUTE.RedirectTo(url,evt);
	}

	$scope.ViewMorePitchComment = function(numberCmt,pitch){
		var index = pitchs.indexOf(pitch);
		pitch.comments.limit += numberCmt;
		if(pitch.comments.limit > pitch.comments.all.length) pitch.comments.limit = pitch.comments.all.length;
		pitchs[index] = pitch;
	}
	$scope.ViewPitchcomment = function(pitch){
		var index = pitchs.indexOf(pitch);
		pitchs[index].showComment = true;
		if(pitch.comments.loaded == true) return;
		
		var data = {
			user_id: $rootScope.user._id,
			token: $rootScope.user.token,
			comments: pitch.comment,
		}
		var PitchService = PITCH.getPitchComment(data);
		PitchService.then(function(response){
			if(response.error_code == 0){
				if(response.comment.length > 0){
					pitchs = PITCH.getSidebarPitchCommentHandler(pitchs,pitch,response.comment);
				}
			}else{
				alert(response.msg);
			}
		})
	}

	
	/*************************************************************************************************************/
											/*PITCH COMMENT*/
	/*************************************************************************************************************/
	$scope.InterestPitch = function(pitch){
		var data = {
			user_id : $rootScope.user._id,
			token   : $rootScope.user.token,
			app_id  : pitch._id,
		};
		var InterestService = INTEREST.postInterest(data);
		InterestService.then(function(response){
			console.log(response);
			if(response.error_code == 0){
				var index_pitch = pitchs.indexOf(pitch);
				if(pitch.interests.interested){
					pitch.interests.interested = false;
					pitch.interests.number--;
				}else{
					pitch.interests.interested = true;
					pitch.interests.number++;
				}
				pitchs[index_pitch] = pitch;
			}else{
				alert(response.msg);
			}
		})
	}

	
})