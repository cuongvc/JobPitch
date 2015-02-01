var TagList = angular.module('tag-list',[]);
TagList.directive('tagList',function(){
	return {
		restrict: 'E',
		templateUrl: '/directive/home/tag-list',
		link: function(scope,element,attrs){

		},
	}
})
TagList.controller('TagListCtrl',function($scope,$http){
	var tags = [
		{
			name: '#PHP',
		},
		{
			name: '#Nodejs',
		},
		{
			name: '#CEO',
		},
		{
			name: '#CFO',
		},
		{
			name: '#UFO',
		},
		{
			name: '#Coder',
		},

	];
	$scope.tags = tags;
	$scope.ShowTagModal = function(tag){
		$scope.TagResult = {
			show: false,
			length: 0,
			data: [],
		};
		getTagsData(tag.name);
		$scope.CurrentTag = tag;
		$('#TagModal').modal('show');
	}
	function getTagsData(TagName){
		var data = {
				user_id: $scope.user._id,
				token: $scope.user.token,
				lat: 21.018549,
				lng: 105.812198,
				address: "9 Nguyên Hong, Thành Công, Ba Đình, Hà Nội, Việt Nam",
				tag: TagName,
			}
			console.log(data);
		$http.post(STR_API_RECENT,data).success(function(response){
			console.log(response);
			var length = response.jobs.length;
			if(length > 0){
				$scope.TagResult = {
					show: true,
					length: length,
					data: response.jobs,
				}
			}
		})
	}
})