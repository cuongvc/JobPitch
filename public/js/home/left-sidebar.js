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
		response.top_hashtag.forEach(function(v,k){
			v.name = v.name.substring(1);
			response.top_hashtag[k] = v;
		})
		$scope.LeftSidebarTags = response.top_hashtag;
	})
	$scope.SearchByTag = function(tag,evt){
		var url = 'tag/'+tag;
		ROUTE.RedirectTo(url,evt);

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