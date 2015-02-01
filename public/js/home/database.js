var DatabaseApp = angular.module('DatabaseApp',['database']);
DatabaseApp.controller('DatabaseCtrl',function($scope,$http,DB){
	var config = {
		shortName : 'testDB',
		version: '1.0',
		displayName: 'MyDB',
		maxSize: 65536,
	}
	var UserModel = [
		{
			name: 'username',
			type: 'varchar',
		},
		{
			name: 'email',
			type: 'varchar',
		}
	];
	
	DB.config(config);
	DB.init();
	// DB.createModel("users",UserModel);
	// DB.rollback("users");


	var DATABASE = new Array();
	var UserModel = {
		name: 'users',
		data: [
			{name: '_id', 			type: 'varchar'},
			{name: 'name', 			type: 'varchar'},
			{name: 'email', 		type: 'varchar'},
			{name: 'facebook_id', 	type: 'varchar'},
			{name: 'twitter_id',	type: 'varchar'},
			{name: 'google_id', 	type: 'varchar'},
			{name: 'microsoft_id', 	type: 'varchar'},
			{name: 'avatar', 		type: 'varchar'},
		],
	};
	DATABASE.push(UserModel);
	var CompanyModel = {
		name: 'company',
		data: [
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
		name: 'jobs',
		data: [
			{name: '_id', type: 'varchar'},
			{name: 'title', type: 'varchar'},
			{name: 'image', type: 'varchar'},
			{name: 'description', type: 'varchar'},
			{name: 'like', type: 'varchar'},
			{name: 'company_id', type: 'varchar'},
		],
	};
	DATABASE.push(JobModel);
	DB.excuteQuery("CREATE TABLE IF NOT EXISTS users(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, _id VARCHAR NOT NULL, name VARCHAR NOT NULL, email VARCHAR NOT NULL, facebook_id VARCHAR NOT NULL, twiiter_id VARCHAR NOT NULL, google_id VARCHAR NOT NULL, microsoft_id VARCHAR NOT NULL, avatar VARCHAR NOT NULL); CREATE TABLE IF NOT EXISTS company(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, _id VARCHAR NOT NULL, name VARCHAR NOT NULL, address VARCHAR NOT NULL, website VARCHAR NOT NULL, contact VARCHAR NOT NULL, cover VARCHAR NOT NULL, avatar VARCHAR NOT NULL)");
	DB.rollback('users');

})