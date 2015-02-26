var LeftSidebar = angular.module('left-sidebar',['search.service','route.service','company.service','route.service']);
LeftSidebar.directive('leftSidebar',function(){
	return {
		restrict: 'E',
		templateUrl: '/directives/home/left-sidebar.html',
		link: function(scope,element,attrs){

		},
	}
})
LeftSidebar.controller('LeftSidebarCtrl',function($scope,$http,SEARCH,ROUTE,COMPANY,ROUTE){
	$http.get(STR_API_TOP_HASHTAG).success(function(response){
		console.log('tags: ',response);
		$scope.LeftSidebarTags = response.top_hashtag;
	})
	$scope.SearchByTag = function(tag){
		tag = tag.substring(1);
		var SearchService = SEARCH.find(tag);
			SearchService.then(function(data){
				ROUTE.GoTo('tag/'+tag);
			})
	}

	var LeftSidebarCompanies = new Array();

	var CompanyService = COMPANY.getTop();
		CompanyService.then(function(response){
			if(response.error_code == 0){
				LeftSidebarCompanies = response.top_company;
				$scope.LeftSidebarCompanies = LeftSidebarCompanies;
			}else{
				alert(response.msg);
			}
		})
	$scope.ViewLeftSidebarCompany = function(user_id,evt){
		ROUTE.ViewUserProfile(user_id,evt);
	}
})