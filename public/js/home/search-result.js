TemplateApp.controller('SearchResultCtrl',function($rootScope,$scope,$http,$routeParams,SEARCH,JOB,PITCH){

	var SearchResultJobs = new Array();
		$scope.SearchResultJobs = SearchResultJobs;

	var SearchResultPitch = new Array();
		$scope.SearchResultPitch = SearchResultPitch;

	var SearchQuery  = $routeParams.query;

	var SearchService = SEARCH.find(SearchQuery);

	SearchService.then(function(response){
		console.log(response);
		if(response.error_code == 0){
			SearchResultJobs = JOB.JobHandler(response.jobs,$rootScope.user._id);
			$scope.SearchResultJobs = SearchResultJobs;

			SearchResultPitch = PITCH.getPitchSidebarHandler(response.applications,$rootScope.user._id);
			$scope.SearchResultPitch = SearchResultPitch;
			if(SearchResultJobs.length == 0 && SearchResultPitch.length == 0){
				alert('No result found');
			}
		}else{
			alert(response.msg);
		}
	})
})