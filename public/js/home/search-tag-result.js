TemplateApp.controller('SearchTagResultCtrl',function($scope,$http,$routeParams,SEARCH,JOB,PITCH){
	$scope.user = user;
	$scope.logedin = logedin;

	var SearchResultJobs = new Array();
		$scope.SearchResultJobs = SearchResultJobs;

	var SearchResultPitch = new Array();
		$scope.SearchResultPitch = SearchResultPitch;

	var SearchQuery  = $routeParams.tag;

	var SearchService = SEARCH.findTag(SearchQuery);

	SearchService.then(function(response){
		console.log(response);
		if(response.error_code == 0){
			try{
				SearchResultJobs = JOB.JobHandler(response.jobs,$scope.user._id);
				$scope.SearchResultJobs = SearchResultJobs;
			}catch(e){
				console.log("Search tag error: ",e);
			}
			try{
				SearchResultPitch = PITCH.getPitchSidebarHandler(response.applications,$scope.user._id);
				$scope.SearchResultPitch = SearchResultPitch;
			}catch(e){
				console.log("Search tag error: ",e);
			}
		}else{
			alert(response.msg);
		}
	})
})