var CreateJob = angular.module('create-job',[]);
CreateJob.directive('createJob',function(){
	return {
		restrict: 'E',
		templateUrl: '/directive/home/create-job',
		link: function(scope,element,attrs){
			var btnPlus = $('#create-job-plus');
			var btnEdit = $('#create-job-edit');
			var e       = $(element);

			e.hover(function(){
				btnPlus.addClass('create-job-button-transition create-job-transition');
				btnEdit.removeClass('hidden');
				btnEdit.addClass('create-job-transition');
			},function(){
				btnPlus.removeClass('create-job-button-transition');
				btnEdit.addClass('hidden');
			});
		},
	}
})
CreateJob.controller('CreateJobCtrl',function($scope,$http){
	var ShowCreateJobForm = false;
	$scope.ShowCreateJobForm = ShowCreateJobForm;
	$scope.ShowForm = function(stt){
		ShowCreateJobForm = stt;
		$scope.ShowCreateJobForm = ShowCreateJobForm;
	}
	$scope.CreateJob = function(JobTitle,JobDesc,ImageLink,Address){
		console.log(JobTitle,JobDesc,ImageLink,Address);
		var TitleHashTags = JobTitle.match(/#\S+/g);
		var DescHashTags  = JobDesc.match(/#\S+/g);
		var HashTags = new Array();
		if(TitleHashTags != null && DescHashTags != null){
			HashTags = TitleHashTags.concat(DescHashTags);
		}else{
			if(TitleHashTags == null){
				HashTags = DescHashTags;
			}
			if(DescHashTags == null){
				HashTags = TitleHashTags;
			}
		}
		var newJob = new Object();
			newJob.title = JobTitle;
			newJob.description = JobDesc;
			newJob.tags = HashTags;
			newJob.imagelink = ImageLink;
			newJob.address = Address;
		console.log(newJob); 
	}
})
