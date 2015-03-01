var Header = angular.module('header',['ngRoute','socket.service','notification.service','route.service','search.service','google-map-service','hashtag.service']);
Header.directive('header',function(){
	return {
		restrict: 'E',
		templateUrl: '/directives/home/header.html',
		link: function(scope,element,attrs){
			$('body').click(function(){
				$('.notification-box').addClass('hidden');
				
			})
			$('.notification-box').bind('mousewheel DOMMouseScroll', function(e) {
			    var scrollTo = null;

			    if (e.type == 'mousewheel') {
			        scrollTo = (e.originalEvent.wheelDelta * -1);
			    }
			    else if (e.type == 'DOMMouseScroll') {
			        scrollTo = 40 * e.originalEvent.detail;
			    }

			    if (scrollTo) {
			        e.preventDefault();
			        $(this).scrollTop(scrollTo + $(this).scrollTop());
			    }
			})
			var input = document.getElementById('searchTextField');
			var options = {
			  types: ['(cities)'],
			};

			autocomplete_search_box = new google.maps.places.Autocomplete(input, options);
		},
		controller: 'HeaderCtrl',
	}
})
Header.directive('searchResultJob',function(){
	return {
		restrict: 'E',
		templateUrl: 'directives/home/search/search-result-job.html',
		link: function(scope,element,attrs){

		},
	}
})
Header.directive('searchResultPitch',function(){
	return {
		restrict: 'E',
		templateUrl: 'directives/home/search/search-result-pitch.html',
		link: function(scope,element,attrs){

		},
	}
})
Header.controller('HeaderCtrl',function($scope,$http,$routeParams,SOCKET,NOTIFICATION,ROUTE,SEARCH,GOOGLEMAP,HASHTAG){

	var notifications = {
		list: [],
		unread: $scope.user.notifications.unread,
		loaded: false,
	};
	$scope.notifications = notifications;
	console.log(notifications);

	if($routeParams != undefined && $routeParams.query != undefined) $scope.HeaderSeachValue = $routeParams.query;
	if($routeParams != undefined && $routeParams.tag != undefined) $scope.HeaderSeachValue = '#' + $routeParams.tag;
	/*************************************************************************************************************/
											/*VIEW NOTIFICATION && USER*/
	/*************************************************************************************************************/
	$scope.ViewNotification = function(url,evt){
		ROUTE.RedirectTo(url,evt);
	}
	$scope.goHome = function(){
		history.pushState({},'','/');
	}
	$scope.SearchSuggestHashTag = function(tag,evt){
		var url = '/tag/'+tag;
		ROUTE.RedirectTo(url,evt);
	}
	/*************************************************************************************************************/
											/*SOCKET*/
	/*************************************************************************************************************/
	IO.on(CREATE_JOB_SOCKET_EVENT,function(data){
		console.log('create_job:',data);
		
		if(SOCKET.checkUserReciveNotification($scope.user._id, data.user_receive_notify) == false) return;

		var more_data = {
			    type: CREATE_JOB_SOCKET_EVENT,
			    value: {
			        job_id: data.job_id,
			    },
			    url: '/job/'+job_id,	
			};
		addNewNotification(SOCKET.makeNewNotification(data,SOCKET_ACTION[CREATE_JOB_SOCKET_EVENT],more_data));
	})
	IO.on(APPLY_JOB_SOCKET_EVENT,function(data){
		console.log(APPLY_JOB_SOCKET_EVENT,data);
		
		if(SOCKET.checkUserReciveNotification($scope.user._id, data.user_receive_notify) == false) return;
		
		var more_data = {
					type: APPLY_JOB_SOCKET_EVENT, 
					value: {
						job_id: data.job_id,
						pitch_id: data.app_id,
					}, 
					url: "",
				};
		addNewNotification(SOCKET.makeNewNotification(data,SOCKET_ACTION[APPLY_JOB_SOCKET_EVENT],more_data));
	});
	IO.on(INTEREST_SOCKET_EVENT,function(data){
		console.log(INTEREST_SOCKET_EVENT,data);
		
		if(SOCKET.checkUserReciveNotification($scope.user._id, data.user_receive_notify) == false) return;

		var more_data = {
				type: INTEREST_SOCKET_EVENT, 
				value: {
					job_id: data.job_id,
					pitch_id: data.app_id,
				}, 
				url: "",
			};
		addNewNotification(SOCKET.makeNewNotification(data,SOCKET_ACTION[INTEREST_SOCKET_EVENT],more_data));
	})
	IO.on(LIKE_PITCH_SOCKET_EVENT,function(data){
		console.log(LIKE_PITCH_SOCKET_EVENT,data);

		if(SOCKET.checkUserReciveNotification($scope.user._id, data.user_receive_notify) == false) return;
		
		var more_data = {
				type: LIKE_PITCH_SOCKET_EVENT, 
				value: {
					job_id: data.job_id,
					pitch_id: data.app_id,
				}, 
				url: "",
			};
		addNewNotification(SOCKET.makeNewNotification(data,SOCKET_ACTION[LIKE_PITCH_SOCKET_EVENT],more_data));
	})
	IO.on(LIKE_JOB_SOCKET_EVENT,function(data){
		console.log(LIKE_JOB_SOCKET_EVENT,data);

		if(SOCKET.checkUserReciveNotification($scope.user._id, data.user_receive_notify) == false) return;

		var more_data = {
				type: LIKE_JOB_SOCKET_EVENT, 
				value: {
					job_id: data.job_id,
				}, 
				url: "",
			};
		addNewNotification(SOCKET.makeNewNotification(data,SOCKET_ACTION[LIKE_JOB_SOCKET_EVENT],more_data));
	})
	IO.on(COMMENT_PITCH_SOCKET_EVENT,function(data){
		console.log(COMMENT_PITCH_SOCKET_EVENT,data);

		if(SOCKET.checkUserReciveNotification($scope.user._id, data.user_receive_notify) == false) return;

		var more_data = {
				type: COMMENT_PITCH_SOCKET_EVENT, 
				value: {
					job_id: data.job_id,
				}, 
				url: "",
			};
		addNewNotification(SOCKET.makeNewNotification(data,SOCKET_ACTION[COMMENT_PITCH_SOCKET_EVENT],more_data));
		console.log(more_data);
	})

	
	function addNewNotification(newNotifi){
		notifications.list.unshift(newNotifi);
		notifications.unread++;
		$scope.notifications = notifications;
		$scope.$apply();
	}
	/*************************************************************************************************************/
										/*GET NOTIFICATIONS*/
	/*************************************************************************************************************/
	$scope.LoadNotifications = function(evt){
		evt.stopPropagation();
		var target = $(evt.target);
		var parent = target.parent();
		while(!parent.is('li')){
			parent = parent.parent();
		}
		parent.find('.notification-box').toggleClass('hidden');
		notifications.unread = 0;
		$scope.notifications = notifications;
		var data = {
			user_id: $scope.user._id,
			token: $scope.user.token,
			start: 0, 
			limit: 10,
		};
		var NotificationService = NOTIFICATION.getNotification(data);
			NotificationService.then(function(response){
				if(response.error_code == 0){
					notifications = NOTIFICATION.getNotificationHandler(notifications,response.notifys);
					console.log(notifications);
					$scope.notifications = notifications;
				}
			})
	}
	

	$scope.showLocation = true;
	$scope.SwithToCurrent = function(){
		var data = {
			user_id: $scope.user._id,
			token: $scope.user.token,
		}
		$http.post(STR_API_SWITH_TO_CURRENT,data).success(function(response){
			console.log("Swith To Current",response);
			if(response.error_code == 0){

				user.position = response.new_current;
				$scope.user = user;
				$scope.$broadcast(SWITH_TO_CURRENT,response.new_current);
			}
		})
	}
	$scope.ChangeCurrentLocation = function(evt){
		var target = $(evt.target);
		var loaded = false;
		while(!target.is('a')){
			target = target.parent();
		}
		$scope.showLocation = false;
		var input = $('#searchTextField');
			input.val('');
			input.removeClass('hidden');
			input.focus();
		google.maps.event.addListener(autocomplete_search_box, 'place_changed', function(){
			if(loaded == true) return;
			loaded = true;
			var address = $('#searchTextField').val();
			var GoogleMapService = GOOGLEMAP.getLocation(address);
				GoogleMapService.then(function(response){
					if(response.status == google.maps.GeocoderStatus.OK){
						var position = GOOGLEMAP.parsePosition(response.results);
						var data = {
							position: position,
							user_id : $scope.user._id,
							token   : $scope.user.token,
						};
						console.log("Change location data",data);
						
						$http.post(STR_API_CHANGE_LOCATION,data).success(function(response){
							console.log("Change location response",response);
							if (response.error_code == 0) {
								$scope.$$broadcast(RELOAD_INDEX,data.position);
								$scope.user.position = data.position;
								$scope.showLocation = true;
								$('#searchTextField').addClass('hidden');
								}else{
								alert(response.msg)
							};
						})
					}
				})
		});
	}
	/*************************************************************************************************************/
											/*SUGGESTION*/
	/*************************************************************************************************************/
	var suggest_hashtag;
	function getSuggestHashTag(){
		var HashTagService = HASHTAG.getSuggestHashTag();
			HashTagService.then(function(response){
				if(response.error_code == 0){
					suggest_hashtag        = HASHTAG.getHashTagHandler(response.hashtag);
					$scope.suggest_hashtag = suggest_hashtag;
					console.log("Suggest Hashtag",suggest_hashtag);
				}
			})
	}
	if(suggest_hashtag == null) getSuggestHashTag();

	var current_suggest;
	var changeSuggestIndex = 0;
	
	$scope.SuggestHashTagHover = function(key){
		changeSuggestIndex++;
		current_suggest = {
			type: 'hashtag',
			index: key,
		};
	}
	$scope.$watch(function(){
		return changeSuggestIndex;
	},function(){
		if(changeSuggestIndex == 0) return;
		if(current_suggest == null){
			$('.suggest-data').removeClass('suggestion_active');
			return;
		}
		$('.suggest-data').removeClass('suggestion_active');
		var activeElement = '.'+current_suggest.type+'_'+current_suggest.index;
		$(activeElement).addClass('suggestion_active');
	})

	/*************************************************************************************************************/
											/*SEARCH*/
	/*************************************************************************************************************/
	var suggest_hashtag;
	
	var showSuggestHashtag = false;
	$scope.showSuggestHashtag = showSuggestHashtag

	var suggest_matches_hashtag = new Array();
	$scope.$watch('showSuggestHashtag',function(){
		console.log(showSuggestHashtag);
		if(showSuggestHashtag){
			$('#suggest-hashtag').removeClass('hidden');
		}else{
			$('#suggest-hashtag').addClass('hidden');
		}
	})
	$scope.ChangeHeaderSearchValue = function(value,evt){
		if(value == undefined || value == '') {
			showSuggestHashtag = false;
		}

		changeSuggestIndex++;


		suggest_matches_hashtag = SEARCH.findSimilarSearchHashtag(suggest_hashtag,value);
		if(suggest_matches_hashtag.length > 0){
			showSuggestHashtag             = true;
			$scope.showSuggestHashtag      = showSuggestHashtag;
			$scope.suggest_matches_hashtag = suggest_matches_hashtag;
		}else{
			showSuggestHashtag        = false;
			$scope.showSuggestHashtag = showSuggestHashtag;
		}
		switch(evt.keyCode){
			case 13: 
				Search(value,evt);
				break;
			case 40:
				changeSuggestIndex++;
				current_suggest = SEARCH.SuggestionMoveDown(suggest_matches_hashtag,current_suggest);
				break;
			case 38:
				changeSuggestIndex++;
				current_suggest = SEARCH.SuggestionMoveUp(suggest_matches_hashtag,current_suggest);
				break;
			default: 
				current_suggest = null;
				console.log(evt.keyCode);
				break;
		}
	}
	function Search(value,evt){
		console.log(current_suggest);
		if(current_suggest == null){
			if(value.charAt(0) == '#'){
				var tag = value.substring(1);
				var url = '/tag/'+tag;
			}else{
				var url = '/search/' + value;
			}
			ROUTE.GoTo(url);
		}else{
			var tag = suggest_matches_hashtag[current_suggest.index].name;
			var url = '/tag/'+tag;
			ROUTE.GoTo(url);
		}
	}
	$scope.StopMoveCursor = function(evt){
		if(evt.keyCode == 40 || evt.keyCode == 38) evt.preventDefault();
	}	
	$scope.btnSearch_click  = function(value){
		HeaderSearch(value);
	}
})
