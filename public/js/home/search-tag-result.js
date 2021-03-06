TemplateApp.controller('SearchTagResultCtrl',function($rootScope,$scope,$http,$routeParams,SEARCH,JOB,PITCH){

	var SearchResultJobs = new Array();
		$scope.SearchResultJobs = SearchResultJobs;

	var SearchResultPitch = new Array();
		$scope.SearchResultPitch = SearchResultPitch;

	var SearchQuery  = $routeParams.tag;

	var data = {
		tag : SearchQuery,
		position : 3,
		country_short_name: 'VN',
	};
	var SearchService = SEARCH.findTag(data);

	SearchService.then(function(response){
		console.log("Search tag response", response);
		if(response.error_code == 0){
			try{
				SearchResultJobs = JOB.JobHandler(response.jobs,$rootScope.user._id);
				$scope.SearchResultJobs = SearchResultJobs;
			}catch(e){
				console.log("Search tag error: ",e);
			}
			try{
				SearchResultPitch = PITCH.getPitchSidebarHandler(response.applications,$rootScope.user._id);
				$scope.SearchResultPitch = SearchResultPitch;
			}catch(e){
				console.log("Search tag error: ",e);
			}
		}else{
			alert(response.msg);
		}
	})
})