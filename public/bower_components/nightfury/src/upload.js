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
                    scope.nightfuryOnchangeUpload.preview = e.target.result;
                    scope.$apply();
                  };
              if(opts.crop == false){
                UploadFile(file,null);
              }
            });
            scope.startNightFuryUpload = function(Coords){
              console.log(Coords);
            }
            function UploadFile(file,Coords){
              var fd = new FormData();
              fd.append(opts.upload.postData,file);
              fd.append(opts.upload.dir.name,opts.upload.dir.dir);
              if(Coords != null) fd.append('coords',Coords);
              console.log(fd);
              var xhr = new XMLHttpRequest();
              xhr.upload.addEventListener('progress',NightfuryOnchangeUploadProgress,false);
              xhr.open('POST',opts.upload.url);
              xhr.send(fd);
              xhr.onreadystatechange = function(){
                if(xhr.readyState==4 && xhr.status==200 && xhr.responseText != ''){
                  var response = JSON.parse(xhr.responseText);
                  console.log(response);
                  scope.nightfuryOnchangeUpload.path = response.path;
                  scope.nightfuryOnchangeUpload.extension = response.extension;
                  scope.nightfuryOnchangeUpload.progress.show = false;
                  scope.$apply();       
                }
              };
            }
            function NightfuryOnchangeUploadProgress(evt){
              if(evt.lengthComputable){
                scope.nightfuryOnchangeUpload.progress.show = true;
                scope.nightfuryOnchangeUpload.progress.percent = Math.round(evt.loaded * 100 / evt.total);
                scope.$apply();      
              }
            }
        },
    };
});
