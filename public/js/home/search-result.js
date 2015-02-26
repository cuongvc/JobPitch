TemplateApp.controller('SearchResultCtrl',function($scope,$http,$routeParams,SEARCH,JOB,PITCH){
	$scope.user = user;
	$scope.logedin = logedin;

	var SearchResultJobs = new Array();
		$scope.SearchResultJobs = SearchResultJobs;

	var SearchResultPitch = new Array();
		$scope.SearchResultPitch = SearchResultPitch;

	var SearchQuery  = $routeParams.query;

	var SearchService = SEARCH.find(SearchQuery);

	SearchService.then(function(response){
		console.log(response);
		if(response.error_code == 0){
			SearchResultJobs = JOB.JobHandler(response.results.jobs.results,$scope.user._id);
			$scope.SearchResultJobs = SearchResultJobs;

			SearchResultPitch = PITCH.getPitchSidebarHandler(response.results.applications.results,$scope.user._id);
			$scope.SearchResultPitch = SearchResultPitch;
		}else{
			alert(response.msg);
		}
	})
})