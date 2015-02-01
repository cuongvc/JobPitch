var DB = angular.module('database',[]);
DB.service('DB',function(){
	var DBConfig;
	var DB;
	var SCHEMA;
	/*
	* var config = {
		shortName : 'DBShortName',
		version: 'VERSION_STRING',
		displayName: 'DISPLAY_NAME',
		maxSize: SIZE,
	}
	*/
	/*
	* create database from Array
	EX:
		var SCHEMA = new Array();
		var UserModel = {
			name: 'users',
			data: [
				{name: 'username', type: 'varchar'},
				.....
			],
		};
		SCHEMA.push(UserModel);
	*/
	this.config = function(config,schema){
		this.DBConfig = config;
		this.SCHEMA = schema;
	}
	this.init = function(){
		try{
			if(!window.openDatabase){
				throw "DB not supported";
			}else{
				this.DB = window.openDatabase(this.DBConfig.shortName,this.DBConfig.version,this.DBConfig.displayName,this.DBConfig.maxSize);
			}
			return;
		}catch(e){
			console.log(e);
		}
	}
	/*
	* Create a Model from Array
		EX:
			[
				{name: 'username', 		type: 'varchar'},
				......
			],
	*/
	function CREATEQUERY(model,modelData){
		var query = 'CREATE TABLE IF NOT EXISTS ' + model + '(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ';
		modelData.forEach(function(v,k){
			if(k == (modelData.length - 1)){
				query += v.name + ' ' + v.type.toUpperCase() + ' NOT NULL';
			}else{
				query += v.name + ' ' + v.type.toUpperCase() + ' NOT NULL, ';
			}

		})
		query += ')';
		return query;
	}

	this.createModel = function(model,modelData){
		var query = CREATEQUERY(model,modelData);
		this.excuteQuery(query);
	}
	errorHandler = function(transaction, error){
		console.log(transaction, error);
	}

	nullDataHandler = function(transaction, results){
		console.log(transaction, results);
	}
	/*
	* Remove a Model
	*/
	this.rollback = function(table){
		var query = 'DROP TABLE ' + table;
		this.excuteQuery(query);
	}
	/*
	* excute a Query SQLite
	*/
	this.excuteQuery = function(query){
		try {
		    this.DB.transaction(function(transaction){
		        transaction.executeSql(query, [], nullDataHandler, errorHandler);
		    });
		} 
		catch (e) {
		    console.log(e);
		}
	}
	
	this.create = function(){
		var length = this.SCHEMA.length;
		for(i=0;i<length;i++){
			for(var key in this.SCHEMA[i]){
				var query = CREATEQUERY(key, this.SCHEMA[i][key]);
				this.excuteQuery(query);
			}
		}
	}
	this.insert = function(model,data){
		var query = 'INSERT INTO '+model+'(';
		for(var key in data){
			query += key + ',';
		}
		query += ') VALUES(';
		for(var key in data){
			query += '"' + data[key] + '",';
		}
		query += ')';
		query = query.replace(',)',')');
		query = query.replace(',)',')');
		this.excuteQuery(query);
	}
	this.getWhere = function(model,condition){
		query = 'SELECT * FROM '+model+ ' WHERE '+condition;
		console.log(query);
		this.excuteQuery();
	}
	this.drop = function(){
		var length = this.SCHEMA.length;
		for(i=0;i<length;i++){
			for(var key in this.SCHEMA[i]){
				this.rollback(key);
			}
		}
	}
})