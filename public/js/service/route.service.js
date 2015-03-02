var RouteService = angular.module('route.service',[]);
RouteService.service('ROUTE',function(){
	this.RedirectTo = function(url,evt){
		if(evt.which === 1){
			history.pushState({},'',url);
			evt.preventDefault();
			return;
		}
	}
	this.ViewUserProfile = function(user_id,evt){
		var url = '/user/' + user_id;
		this.RedirectTo(url,evt);
	}
	this.GoTo = function(url){
		history.pushState({},'',url);
	}
})