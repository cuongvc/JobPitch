var ApplicationSideBar = angular.module('application-sidebar',['pitch.service','job.service','hashtag.service','like.service']);
ApplicationSideBar.directive('applicationSidebar',function(){
	return {
		restrict: 'E',
		templateUrl: '/directives/home/application-sidebar.html',
		link: function(scope,element,attrs){

		},
	}
})
ApplicationSideBar.controller('ApplicationSideBarCtrl',function($scope,$http,JOB,PITCH,LIKE,HASHTAG){
	var pitchs = new Array();
	var InterestList = [
				{
					logo: "https://pbs.twimg.com/profile_images/498927400378318848/3hkPsMFk_normal.jpeg",
				},
				{
					logo: "https://pbs.twimg.com/profile_images/188302352/nasalogo_twitter_bigger.jpg",
				},
				{
					logo: "https://pbs.twimg.com/profile_images/2675282220/2fddf0955beb9b9d8f2d57eb988f4b2e_normal.jpeg",
				}
			];
	var pushLogo = [
				{
					logo: "https://pbs.twimg.com/profile_images/3513354941/24aaffa670e634a7da9a087bfa83abe6_bigger.png",
				},
				{
					logo: "https://pbs.twimg.com/profile_images/529308402661339136/Yb0c2yz8_normal.png",
				},
				{
					logo: "https://pbs.twimg.com/profile_images/531806988846370816/GEPB7aLh_normal.png",
				},
				{
					logo: "https://pbs.twimg.com/profile_images/498927400378318848/3hkPsMFk_normal.jpeg",
				},
				{
					logo: "https://pbs.twimg.com/profile_images/188302352/nasalogo_twitter_bigger.jpg",
				},
				{
					logo: "https://pbs.twimg.com/profile_images/2675282220/2fddf0955beb9b9d8f2d57eb988f4b2e_normal.jpeg",
				},
				{
					logo: "https://pbs.twimg.com/profile_images/3513354941/24aaffa670e634a7da9a087bfa83abe6_bigger.png",
				},
				{
					logo: "https://pbs.twimg.com/profile_images/529308402661339136/Yb0c2yz8_normal.png",
				},
				{
					logo: "https://pbs.twimg.com/profile_images/531806988846370816/GEPB7aLh_normal.png",
				}
			];
	$scope.InterestList = InterestList;
	$scope.ApplicationSideBarComments = [
		{username: 'Facebook', comment: 'Bạn nghĩ thế nào khi làm ứng dung mượt mà như Facebook App',avatar: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xap1/v/t1.0-1/p160x160/10888891_792437770805243_2605756062524274878_n.jpg?oh=444e0545d1bbada68355d8e5c6ab8828&oe=5561A471&__gda__=1431450996_805f65e459f6cd3eb2d621d08d3d6151"},
		{username: 'Android', comment: 'FB là ứng dụng tốt, chúng tôi hoàn toàn có thể là ra những ứng dụng như thế',avatar: "https://pbs.twimg.com/profile_images/522909800191901697/FHCGSQg0_bigger.png"},
		{username: 'Đình Thuận', comment: '@Android hãy về đội của anh =))', avatar: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpf1/v/t1.0-1/c0.0.160.160/p160x160/1460236_622400927824334_887047684_n.jpg?oh=81f71efa7346e62a5944772a0a2b2d4c&oe=55522A78&__gda__=1431130368_eafae6507d275d5d53493f9b9e65397f"},
	];
	$scope.LoadMoreInterestLogo = function(){
		pushLogo.forEach(function(v,k){
			InterestList.push(v);
		})
		$scope.InterestList = InterestList;
	}

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
		skip: 0,
		limit: 5,
	};
	$http.post(STR_API_GET_PITCH,data).success(function(response){
		console.log('Pitch',response);
		if(response.error_code == 0){
			pitchs = response.applications;
			pitchs.forEach(function(v,k){
				pitchs[k].comments = {
					list: v.comment,
					number: v.comment.length,
				};
				if(v.likes.list.indexOf($scope.user._id) > -1){
					pitchs[k].likes.liked = true;
				}else{
					pitchs[k].likes.liked = false;
				}
			})
			$scope.pitchs = pitchs;
		}
	})
	$scope.ViewMorePitchComment = function(numberCmt,pitch){
		var i      = pitch.comments.show.length;
		var length = pitch.comments.all.length;
		var index  = pitchs.indexOf(pitch);
		if(i == length) return;
		if(length - i > numberCmt) length = numberCmt + i;
		var array_reverse = pitch.comments.all;
			array_reverse.reverse();
		for(i;i < length; i++){
			console.log(i,':',array_reverse[i]);
			pitch.comments.show.unshift(array_reverse[i]);
		}
		pitchs[index] = pitch;
		$scope.pitchs = pitchs;
	}
	$scope.ShowApplicationSidebarComment = function(pitch){
		var index = pitchs.indexOf(pitch);
		pitchs[index].showComment = true;
		if(pitch.loaded == true) return;
		
		var data = {
			user_id: $scope.user._id,
			token: $scope.user.token,
			comments: pitch.comment,
		}
		var PitchService = PITCH.getPitchComment(data);
		PitchService.then(function(response){
			pitch.comments = new Object();
			pitch.comments.all = response.comment;
			pitch.comments.number = response.comment.length;
			var length = response.comment.length;
			if(length > 3){
				pitch.comments.show = [response.comment[length - 3],response.comment[length - 2],response.comment[length - 1]];
			}else{
				pitch.comments.show = response.comment;
			}
			pitchs[index] = pitch;
			console.log(pitch);
			$scope.pitchs = pitchs;
		})
	}
	/*
	* like pitch
	*/
	$scope.LikePitch = function(pitch){
		var data = {
			user_id        : $scope.user._id,
			token          : $scope.user.token,
			type_like      : 2,
			job_id         : '',
			application_id :  pitch._id,
			comment_id     :  '',
		};
		var LikeService = LIKE.LikePitch(data);
			LikeService.then(function(response){
				if(response.error_code == 0){
					var index = pitchs.indexOf(pitch);
					if(pitch.likes.liked){
						pitch.likes.number--;
						pitch.likes.liked = false;
					}else{
						pitch.likes.number++;
						pitch.likes.liked = true;
					}
					pitchs[index] = pitch;
					$scope.pitchs = pitchs;
				}
			})
	}
	/*
	* post pitch reply
	*/
	$scope.PostReply = function(PitchReply,pitch,evt){
		if(evt.keyCode == 13){
			var data = {
				user_id : $scope.user._id,
				token : $scope.user.token,
				content : PitchReply,
				hash_tag : HASHTAG.findHashTag(PitchReply),
				application_parent : pitch._id,
				comment_parent : "",
			}
			console.log('Pitch Reply:',data);
			var PitchService = PITCH.postNewPitchComment(data);
			PitchService.then(function(response){
				if(response.error_code == 0){
					$('#PitchReply').val('');
					var index = pitchs.indexOf(pitch);
					var comment = response.comment;
					pitch.comments.all.push(comment);
					pitch.comments.show.push(comment);
					pitch.comments.number++;
				}
			})
		}
	}
	
})