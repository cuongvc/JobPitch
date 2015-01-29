var NightFuryUpload = angular.module('nightfury-upload',[]);
NightFuryUpload.directive('nightfuryOnchangeUpload',function(){
	 return {
        scope: {
            nightfuryOnchangeUpload: '='
        },
        restrict: 'A',
        link: function(scope, element, attrs) {
        	var opts = scope.nightfuryOnchangeUpload;
            $(element).change(function(){
           		var file = element[0].files[0];

              var reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = function(e){
                    console.log(e);
                  }



           		var fd = new FormData();
           		fd.append(opts.upload.postData,file);
           		var xhr = new XMLHttpRequest();
           		xhr.upload.addEventListener('progress',NightfuryOnchangeUploadProgress,false);
           		xhr.open('POST',opts.upload.url);
           		xhr.send(fd);
           		xhr.onreadystatechange = function(){
           			if(xhr.readyState==4 && xhr.status==200){
           				var response = JSON.parse(xhr.responseText);
           				console.log(response);
           				scope.nightfuryOnchangeUpload.src = response.url;
           				scope.nightfuryOnchangeUpload.progress.show = false;
		           		scope.$apply();       
           			}
           		}
            })
            function NightfuryOnchangeUploadProgress(evt){
	           	if(evt.lengthComputable){
	           		scope.nightfuryOnchangeUpload.progress.show = true;
	           		scope.nightfuryOnchangeUpload.progress.percent = Math.round(evt.loaded * 100 / evt.total);
	           		scope.$apply();      
	           	}
            }
        },
    }
})
