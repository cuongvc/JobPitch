var GoogleMap = angular.module('google-map-service',[]);

	GoogleMap.service('GOOGLEMAP',function($q){
		this.getLocation = function(address){
			var geocoder = new google.maps.Geocoder();
			var defferer = $q.defer();
		    geocoder.geocode( { 'address': address}, function(results, status) {
		        var data = {results: results, status: status};
		        defferer.resolve(data);
		    });
		    return defferer.promise;
		}
		this.parsePosition = function(results){
			console.log(results);
			var data = {
				lat: results[0].geometry.location.k,
				lng: results[0].geometry.location.D,
				formatted_address: results[0].formatted_address,
			};
			if(results[0] != undefined && results[1] != undefined && results[0].address_components.length < results[1].address_components.length){
				var location = results[1].address_components;
			}else{
				var location = results[0].address_components;
			}
			location.forEach(function(v,k){
				if(v.types[0] == "country"){
					data.country = v;
				}
				if(v.types[0] == "administrative_area_level_1"){
					data.state = v;
				}
				if(v.types[0] == "locality"){
					data.city = v;
				}
			});
			if(data.city == undefined){
				data.city = "";
			}
			if(data.country == undefined){
				data.country = "";
			}
			if(data.state == undefined){
				data.state = "";
			}
			return data;
		}
	})