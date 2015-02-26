var CommentService = angular.module('comment.service',[]);
CommentService.service('COMMENT',function(){
	this.addCommentSidebar = function(pitchs,data){
		pitchs.forEach(function(v,k){
			if(v._id == data.app_id){
				console.log('a');
				v.comments.numberOfComment++;
				if(v.comments.loaded != undefined && v.comments.loaded == true){
					var newCmt = {
						_id : data.comment_id,
						user_avatar : data.avatar_user_make_notify,
						userName: data.userName_user_make_notify,
						content: data.content,
					};
					v.comments.list.push(newCmt);
				}else{
					if(v.comments.list.indexOf(data.comment_id) < 0){
						v.comments.list.push(data.comment_id);
					}
				}
				pitchs.splice(k,1);
				pitchs.unshift(v);
			}
		})
		return pitchs;
	}
})