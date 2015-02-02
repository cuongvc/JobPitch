/*
 * @fileOverview
 * @description
 * Angular JCrop wrapper for easy usage of jCrop plugin
 */

(function(angular) {

    var module = angular.module('angular-crop', []);

    module.controller('angularCropCtrl', ['$scope', '$element',
        function($scope, $element) {

            var _instance;

            // initialises jCrop instance
            function init() {
                $element.Jcrop({
                    onSelect: $scope.onSelect(),
                    onChange: $scope.onChange(),
                    onRelease: $scope.onRelease(),
                    bgColor: $scope.bgColor,
                    bgOpacity: $scope.bgOpacity,
                    setSelect: $scope.setSelect,
                    aspectRatio: $scope.aspectRatio,
                    boxWidth: $scope.boxWidth,
                    boxHeight: $scope.boxHeight,
                    trueSize: [$element[0].naturalWidth, $element[0].naturalHeight],
                    trackDocument: true
                }, function() {
                    _instance = this;
                });
            }

            // call init when image has loaded
            $element.on('load', function() {
                init();
            });

        }
    ]);

    module.directive('angularCrop', function() {
        return {
            restrict: 'AE',
            require: 'ngSrc',
            scope: {
                angularCrop: '=',
                bgColor: '=',
                bgOpacity: '=',
                setSelect: '=',
                aspectRatio: '=',
                boxWidth: '=',
                boxHeight: '=',
                onChange: '&',
                onSelect: '&',
                onRelease: '&'
            },
            controller: 'angularCropCtrl'
        };
    });

})(angular);
