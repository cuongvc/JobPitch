var CreateJob = angular.module('create-job',['angular-crop']);
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
	/**********************************************************************************/
									/*CROP*/
	/**********************************************************************************/
	var showCrop = false;
	$scope.showCrop = showCrop;
	$scope.CreateJobCropChange = function(c){
		console.log(c);
		$scope.CreateJobImage.coords = {
			x: c.x,
			y: c.y,
			width: c.w,
			height: c.y2 - c.y,
		};
	}
	$scope.Crop = function(){
		showCrop = false;
		$scope.showCrop = showCrop;
		$scope.CreateJobImage.startUpload = true;
	}
	$scope.ReSelectFile = function(){
		$scope.hiddenCrop();
		var imgInput = $('#job-form input[type="file"]');
		angular.forEach(
		    angular.element("input[type='file']"),
		    function(inputElem) {
		      angular.element(inputElem).val(null);
		    });
		imgInput.click();
	}
	/**********************************************************************************/
									/*CREATE JOB*/
	/**********************************************************************************/
	$scope.CreateJobImage = {
		upload: {
			url: STR_UPLOAD_IMAGE,
			postData: 'image',
			dir: {
				name: 'dir',
				dir: 'upload/thumb',
			},
		},
		progress : {
			show: false,
		},
		clearOnclick: true,
		crop: true,
	}
	$scope.CreateJobCropCoverOpts = {
		aspectRatio: 2.7,
	};
	$scope.$watch(function(){return $scope.CreateJobImage.preview;},function(){
		if($scope.CreateJobImage.preview != undefined && $scope.CreateJobImage.preview != ''){
			showCrop = true;
			$scope.showCrop = showCrop;
		}
	})
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
		if(HashTags == null) HashTags = [];
		var newJob = new Object();
			newJob.user_id = $scope.user._id;
			newJob.token = $scope.user.token;
			newJob.title = JobTitle;
			newJob.desc = JobDesc;
			newJob.hash_tag = HashTags;
			newJob.temp_path = $scope.CreateJobImage.path;
			newJob.link_direct = ImageLink;
			newJob.extension = $scope.CreateJobImage.extension
			newJob.lat = 21.016481;
			newJob.lng = 105.810339;
			newJob.address = Address;
		$http.post(STR_API_CREATE_JOB,newJob).success(function(response){
			console.log(response);
			if(response.error_code == 0){
				document.location.href = BASE_URL;
			}
		})
		console.log(JSON.stringify(newJob)); 
	}
})
