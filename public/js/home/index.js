var IndexApp = angular.module('IndexApp',['header','footer','tag-list','jobs','create-job','setting','database']);
IndexApp.controller('IndexCtrl',function($scope,$http,$timeout,DB){
	var page = new Object();
		page.index = 'index';
		page.setting = 'setting';

		$scope.page = page;

	var PAGE = page.index;
	$scope.PAGE = PAGE;
	$scope.ShowPage = function(p){
		$('body > *[page]:not(body > *[page="'+p+'"]) *').addClass('animated fadeOut');
		$timeout(function(){
			PAGE = p;
			$scope.PAGE = PAGE;
			$scope.$apply();
		},300,false);
	}
	/*
	* DATABASE
	*/
	var config = {
		shortName : 'JobPitchDB',
		version: '1.0',
		displayName: 'JOB',
		maxSize: 20*1024*1024,
	}
	var DATABASE = new Array();
	var UserModel = {
			users: [
				{name: '_id', 			type: 'varchar'},
				{name: 'name', 			type: 'varchar'},
				{name: 'email', 		type: 'varchar'},
				{name: 'facebook_id', 	type: 'varchar'},
				{name: 'twiiter_id',	type: 'varchar'},
				{name: 'google_id', 	type: 'varchar'},
				{name: 'microsoft_id', 	type: 'varchar'},
				{name: 'avatar', 		type: 'varchar'},
			],
	};
	DATABASE.push(UserModel);
	var CompanyModel = {
		company: [
				{name: '_id', 		type: 'varchar'},
				{name: 'name', 		type: 'varchar'},
				{name: 'address', 	type: 'varchar'},
				{name: 'website', 	type: 'varchar'},
				{name: 'contact', 	type: 'varchar'},
				{name: 'cover', 	type: 'varchar'},
				{name: 'avatar', 	type: 'varchar'},
			],
	};
	DATABASE.push(CompanyModel);
	var JobModel = {
		jobs: [
				{name: '_id', 			type: 'varchar'},
				{name: 'title', 		type: 'varchar'},
				{name: 'image',	 		type: 'varchar'},
				{name: 'description', 	type: 'varchar'},
				{name: 'likes', 		type: 'varchar'},
				{name: 'shares', 		type: 'varchar'},
				{name: 'company_id', 	type: 'varchar'},
			],
	};
	DATABASE.push(JobModel);

	DB.config(config,DATABASE);
	DB.init();
	DB.create();
	var newJob = {
		_id: '_id',
		title: 'title',
		image: 'image',
		description: 'description',
		likes: 100,
		shares: 99,
		company_id: 1,
	};
	// DB.insert('jobs',newJob);
	// DB.getWhere('jobs','_id = "_id"');
	// DB.drop();
	$scope.user = user;
	$scope.logedin = logedin;
	$scope.ViewJob = function(job){
		$scope.CurrentJob = job;
		var data = {
		    user_id: $scope.user._id,
		    token: $scope.user.token,
		    job_id: job._id,
		}
		$http.post(STR_API_JOB_DETAIL,data).success(function(response){
			console.log(response);
			if(response.error_code == 0){
				$scope.CurrentJob.Applications = response.app;
			}
			
		})
		$('#JobModal').modal('show');
	}
	/*
	* apply 
	*/
	$scope.ApplyDescWordCount = 0;
	$scope.ApplyTextAreaChange = function(content){
		console.log(content);
		$scope.ApplyDescWordCount = content.length;
		var t = $("#ApplyDesc")[0];
	    var lineNumber = t.value.substr(0, t.selectionStart).split("\n").length;
	    var height = lineNumber*20;
	    if(height < 40) height = 40;
	    $("#ApplyDesc").css({height: height})
	}
	$scope.Apply = function(Job, ApplyTitle, ApplyDesc){
		var DescHashTags  = ApplyDesc.match(/#\S+/g);
		var HashTags = new Array();
		if(DescHashTags == null){
			HashTags = [];
		}else{
			HashTags = DescHashTags;
		}
		var data = {
			user_id: $scope.user._id,
			token: $scope.user.token,
			job_id: Job._id,
			title: "ApplyTitle",
			description: ApplyDesc,
			hash_tag: HashTags,
		};
		$http.post(STR_API_APPLY,data).success(function(response){
			console.log(response);
			if(response.error_code == 0){
				$scope.CurrentJob.Applications.push(response.application);
				$('#ApplyTitle').val('');
				$('#ApplyDesc').val('');
			}
		})
	}
})
