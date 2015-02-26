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
				SearchResultJobs = JOB.JobHandler(response.results.jobs.results,$scope.user._id);
				$scope.SearchResultJobs = SearchResultJobs;

				SearchResultPitch = PITCH.getPitchSidebarHandler(response.results.applications.results,$scope.user._id);
				$scope.SearchResultPitch = SearchResultPitch;
			}catch(e){
				console.log("Search tag error: ",e);
				alert('No result found');
			}
		}else{
			alert(response.msg);
		}
	})
})