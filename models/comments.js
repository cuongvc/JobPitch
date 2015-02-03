// load the things we need
var mongoose            = require('mongoose');
var ObjectId            = mongoose.Schema.Types.ObjectId;
var bcrypt              = require('bcrypt-nodejs');
var domain              = require('./../config/default').domain_default;
var add_hashTag_comment = require('./../my_module/add_hashTag').comment;


// define the schema for our comment model
var commentSchema = mongoose.Schema({

    user_id          : {
        type         : ObjectId,
        ref          : 'users' 
    },

    user_name        : {
        type         : String
    },

    user_avatar      : {
        type         : String
    },

    hash_tag         : [{
        type         : String
    }],

    content          : {
        type         : String,
        default      : ''
    },

    time             : {
        type         : String
    },

    likes            : {
        number       : {
            type        : Number,
            default     : 0
        },        list         : [{
            type        : ObjectId,
            ref         : 'users'
        }]
    },

    shares           : {
        number       : {
            type        : Number,
            default     : 0
        },
        list         : [{
            type        : ObjectId,
            ref         : 'users'
        }]
    },

    comments           : [{
    	type           : ObjectId,
    	ref            : 'comments'
    }],

    comment_parent     : {
        type           : ObjectId,
        ref            : 'comments'
    },

    application_parent : {
        type           : ObjectId,
        ref            : 'applications'
    }

});

// check comment is Own of account
commentSchema.methods.isOwn         = function(companyId){
    return (companyId == this.companyId);
}

commentSchema.methods.newInfor    = function(user_id, user_name, user_avatar, 
                                        application_parent, comment_parent, content, hash_tag, callback){
    var comment = this;
    comment.user_id            = user_id;
    comment.user_name          = user_name;
    comment.user_avatar        = user_avatar;
    
    comment.application_parent = application_parent;
    comment.comment_parent     = comment_parent;
    comment.content            = content;
    comment.hash_tag           = hash_tag;
    comment.time               = new Date();
    add_hashTag_comment(hash_tag, comment._id, function(){
        comment.save(function(err){
            if (err){
                console.log('ERR : ', err);
            }
            callback(comment);           
        })
    });

    
    
}   

commentSchema.methods.add_comment = function(comment_id, callback){
    this.comments.push(comment_id);
    this.save(function(err){
        callback();
    })
}

commentSchema.methods.editInfor     = function(comment){
       return this;
}

// create the model for comments and expose it to our app
module.exports = mongoose.model('comments', commentSchema);
