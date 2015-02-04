// load the things we need
var mongoose        = require('mongoose');
var ObjectId        = mongoose.Schema.Types.ObjectId;
var bcrypt          = require('bcrypt-nodejs');
var domain          = require('./../config/default').domain_default;
var add_hashTag_app = require('./../my_module/add_hashTag').app;


// define the schema for our application model
var applicationSchema = mongoose.Schema({

    job_id           : {
        type         : ObjectId,
        ref          : 'jobs',
    },

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

    title  : {
        type         : String,
        default      : ''
    },

    hash_tag         : [{
        type         : String
    }],

    description      : {
        type         : String,
        default      : ''
    },

    time             : {
        type         : String
    },

    file             : {
        type         : String,
        default      : ''
    },

    likes            : {
        number       : {
            type        : Number,
            default     : 0
        },        
        list         : [{
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

    interviews       : {
        type          : Number,
        default     : 0

    },

    hires            : {
        type          : Number,
        default     : 0

    },

    comment       : [{
    	type           : ObjectId,
    	ref            : 'comments'
    }]

});

// check application is Own of account
applicationSchema.methods.isOwn         = function(companyId){
    return (companyId == this.companyId);
}

applicationSchema.methods.newInfor    = function(user_id, user_name, user_avatar, 
                                        job_id, title, hash_tag, description, time, file, callback){

    var app = this;
    app.user_id        = user_id;
    app.user_name      = user_name;
    app.user_avatar    = user_avatar;

    app.job_id         = job_id;
    app.title          = title;
    app.hash_tag       = hash_tag;
    app.description    = description;
    app.time           = time;
    if (file != ''){
        app.file           = file;
    }
    console.log('add hastag');
    add_hashTag_app(hash_tag, app._id, function(){
        console.log('callback');
        app.save(function(err){
            callback(app);    
        });
    });

}   

applicationSchema.methods.add_comment = function(comment_id, callback){
	this.comment.push(comment_id);
	this.save(function(err){
		callback();
	})
}


applicationSchema.methods.addLike       = function(user_id, callback){
    if (this.likes.list.indexOf(user_id) != -1){
        this.likes.list.splice(this.likes.list.indexOf(user_id), 1);
        this.likes.number --;
        this.save(function(err){
            callback();
        })
    } else{
        this.likes.list.push(user_id);
        this.likes.number ++;
        this.save(function(err){
            callback();
        })
    }
}

applicationSchema.methods.editInfor     = function(application){
       return this;
}

// create the model for applications and expose it to our app
module.exports = mongoose.model('applications', applicationSchema);
