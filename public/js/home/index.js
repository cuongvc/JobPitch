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
				{name: 'likes', 			type: 'varchar'},
				{name: 'shares', 			type: 'varchar'},
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
	DB.getWhere('jobs','_id = "_id"');
	// DB.drop();

	console.log(user);

	var user = {
		_id: '54cab86f186e392a14386427',
		token: '$2a$08$aO2Ta1uxP30Xir7JluahQeeZAlR9TYJE4Vr55Umo1L6YCUPyBngOm',
	}
	// var user = {
	// 	_id: '54c9fb946dddb1361ef8d7fe',
	// 	token: '$2a$08$l8Lk13ePNGBazTBpuhcoF.SkcEl9wc6tZKBBvoWL6/lOSumwgjaC6',
	// }
	$scope.user = user;
})
