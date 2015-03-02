var LeftSidebar = angular.module('left-sidebar',['search.service','route.service','company.service','route.service','hashtag.service']);
LeftSidebar.directive('leftSidebar',function(){
	return {
		restrict: 'E',
		templateUrl: '/directives/home/left-sidebar.html',
		link: function(scope,element,attrs){

		},
	}
})
LeftSidebar.controller('LeftSidebarCtrl',function($rootScope,$scope,$http,SEARCH,ROUTE,COMPANY,ROUTE,HASHTAG){
	var LeftSidebarTags;
	function getTopHashTag() {
		var HashTagService = HASHTAG.getTopHashTag('VN',0,10);
			HashTagService.then(function(response){
				if(response.error_code == 0){
					LeftSidebarTags = HASHTAG.getHashTagHandler(response.top_hashtag);
					$scope.LeftSidebarTags = LeftSidebarTags;
					console.log(response);
				}
			})
	}
	getTopHashTag();
	
	var LeftSidebarCompanies = new Array();

	function getTopCompany(){
		var CompanyService = COMPANY.getTop('VN',0,10);
			CompanyService.then(function(response){
				console.log("Top Company",response);
				if(response.error_code == 0){
					LeftSidebarCompanies = response.top_company;
					$scope.LeftSidebarCompanies = LeftSidebarCompanies;
				}else{
					alert(response.msg);
				}
			})
	}
	getTopCompany();
	
	$scope.ViewLeftSidebarCompany = function(user_id,evt){
		ROUTE.ViewUserProfile(user_id,evt);
	}
	$scope.SearchByTag = function(tag,evt){
		var url = 'tag/'+tag;
		ROUTE.RedirectTo(url,evt);
	}

})