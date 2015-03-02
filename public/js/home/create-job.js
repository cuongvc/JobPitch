var CreateJob = angular.module('create-job',['angular-crop','google-map-service','hashtag.service','ui.bootstrap']);
CreateJob.directive('createJob',function(){
	return {
		restrict: 'E',
		templateUrl: '/directives/home/create-job.html',
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
			var input = document.getElementById('create-job-location');
			var options = {
			  types: ['(cities)'],
			};

			autocomplete = new google.maps.places.Autocomplete(input, options);
		},
		controller: 'CreateJobCtrl',
	}
})
CreateJob.controller('CreateJobCtrl',function($rootScope,$scope,$http,GOOGLEMAP,HASHTAG){
	var ShowCreateJobForm = false;
	$scope.ShowCreateJobForm = ShowCreateJobForm;
	
	if($rootScope.user.type_account != 1){
		$('#create-job-btn').addClass('hidden');
	}

	$scope.ShowForm = function(stt){
		ShowCreateJobForm = stt;
		$scope.ShowCreateJobForm = ShowCreateJobForm;
	}
	$scope.$watch('ShowCreateJobForm',function(){
		if(ShowCreateJobForm){
			$('#create-job-form').removeClass('hidden');
		}else{
			$('#create-job-form').addClass('hidden');
		}
	})
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

		var previewElement = $('#create-job-image-preview');
		var previewSrc = $scope.CreateJobImage.preview;
		var PreviewImageStyle = {
			background: 'url("' + previewSrc + '")',
			backgroundSize: 'cover',
		}
		$scope.PreviewImageStyle = PreviewImageStyle;
		console.log(PreviewImageStyle);
	}
	$scope.SelectFile = function(){
		var input = document.getElementById('create-job-file-input');
		input.type = 'text';
		input.value = '';
		input.type = 'file';
		input.click();
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
									/*Location suggestions*/
	/**********************************************************************************/
	var locations = new Array();
	$scope.locations = locations;
	$scope.LocationSuggestion = function(add){
		var GoogleMapService = GOOGLEMAP.getLocation(add);
		GoogleMapService.then(function(response){
			if(response.status == google.maps.GeocoderStatus.OK){
				console.log(response.results);
				locations = response.results;
				$scope.locations = locations;
			}
		})
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
		// aspectRatio: 2.7,
	};
	$scope.$watch(function(){return $scope.CreateJobImage.preview;},function(){
		if($scope.CreateJobImage.preview != undefined && $scope.CreateJobImage.preview != ''){
			showCrop = true;
			$scope.showCrop = showCrop;
		}
	})

	$scope.CreateJob = function(JobTitle,JobDesc){
		var Address = $('#create-job-location').val();
		if($scope.CreateJobImage.path == undefined || $scope.CreateJobImage.path == '') {
			alert('Please wait until upload complete');
			return;
		}
		/*
		* get Location
		*/
		var GoogleMapService = GOOGLEMAP.getLocation(Address);
			GoogleMapService.then(function(response){
				if (response.status == google.maps.GeocoderStatus.OK) {
					var position = GOOGLEMAP.parsePosition(response.results);
					var HashTags = HASHTAG.findHashTag(JobTitle).concat(HASHTAG.findHashTag(JobDesc));
					var newJob = new Object();

						newJob.user_id   = $rootScope.user._id;
						newJob.token     = $rootScope.user.token;
						newJob.title     = JobTitle;
						newJob.desc      = JobDesc;
						newJob.hash_tag  = HashTags;
						newJob.temp_path = $scope.CreateJobImage.path;
						newJob.extension = $scope.CreateJobImage.extension
						newJob.address   = Address;
						newJob.position  = position;

						console.log("Create New Job Data",newJob);
					$http.post(STR_API_CREATE_JOB,newJob).success(function(response){
						console.log(response);
						if(response.error_code == 0){
							ShowCreateJobForm = false;
							$scope.ShowCreateJobForm = ShowCreateJobForm;
						}
					})
				};
			})
	}
})
