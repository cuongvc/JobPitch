// load the things we need
var mongoose            = require('mongoose');
var searchPlugin        = require('mongoose-search-plugin');


var ObjectId            = mongoose.Schema.Types.ObjectId;
var bcrypt              = require('bcrypt-nodejs');
var domain              = require('./../config/default').domain_default;
var add_hashTag_comment = require('./../my_module/add_hashTag').comment;


// define the schema for our comment model
var commentSchema = mongoose.Schema({

    user_id: {
        type: ObjectId,
        ref: 'users'
    },

    userName: {
        type: String
    },

    user_avatar: {
        type: String
    },

    hash_tag: [{
        type: String
    }],

    content: {
        type: String,
        default: ''
    },

    time: {
        type: String
    },

    likes: {
        number: {
            type: Number,
            default: 0
        },
        list: [{
            type: ObjectId,
            ref: 'users'
        }]
    },

    shares: {
        number: {
            type: Number,
            default: 0
        },
        list: [{
            type: ObjectId,
            ref: 'users'
        }]
    },

    comments: [{
        type: ObjectId,
        ref: 'comments'
    }],

    comment_parent: {
        type: ObjectId,
        ref: 'comments'
    },

    application_parent: {
        type: ObjectId,
        ref: 'applications'
    },

    job_parent: {
        type: ObjectId,
        ref : 'jobs'
    }


});

var options = {
    keywordsPath: '_keywords', // path for keywords, `_keywords` as default 
    relevancePath: '_relevance', // path for relevance number, '_relevance' as default 
    fields: ['content', 'hash_tag'], // array of fields to use as keywords (can be String or [String] types), 
    stemmer: 'PorterStemmer', // natural stemmer, PorterStemmer as default 
    // distance: 'JaroWinklerDistance' // distance algorythm, JaroWinklerDistance as default 
    distance: 'LevenshteinDistance' // distance algorythm, JaroWinklerDistance as default 
};

commentSchema.plugin(searchPlugin, options);

// check comment is Own of account
commentSchema.methods.isOwn         = function(companyId){
    return (companyId == this.companyId);
}

commentSchema.methods.newInfor    = function(user_id, userName, user_avatar, 
                                        application_parent, comment_parent, job_parent, content, 
                                        hash_tag, callback){
    var comment = this;
    comment.user_id            = user_id;
    comment.userName          = userName;
    comment.user_avatar        = user_avatar;
    
    if (application_parent != ''){
        comment.application_parent = application_parent;

    }
    if (comment_parent != '')
        comment.comment_parent     = comment_parent;

    comment.job_parent = job_parent;

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

commentSchema.methods.addComment = function(comment_id, callback){
    this.comments.push(comment_id);
    this.save(function(err){
        callback();
    })
}


commentSchema.methods.addLike       = function(user_id, callback){
    if (this.likes.list.indexOf(user_id) != -1){
        this.likes.list.splice(this.likes.list.indexOf(user_id), 1);
        this.likes.number --;
        this.save(function(err){
            callback(0);
        })
    } else{
        this.likes.list.push(user_id);
        this.likes.number ++;
        this.save(function(err){
            callback(1);
        })
    }
}

commentSchema.methods.editInfor     = function(content, hash_tag, time, callback){
    var comment = this;
    comment.content = content;
    comment.hash_tag = hash_tag;
    comment.time     = time;
    add_hashTag_comment(hash_tag, comment._id, function(){
        comment.save(function(err){
            if (err){
                console.log('ERR : ', err);
            }
            callback(comment);           
        })
    });
}

// create the model for comments and expose it to our app
module.exports = mongoose.model('comments', commentSchema);
