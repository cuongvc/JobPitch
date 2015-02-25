// load the things we need
var mongoose        = require('mongoose');
var searchPlugin    = require('mongoose-search-plugin');

var ObjectId        = mongoose.Schema.Types.ObjectId;
var bcrypt          = require('bcrypt-nodejs');
var domain          = require('./../config/default').domain_default;
var add_hashTag_app = require('./../my_module/add_hashTag').app;
var check_user      = require('./../my_module/check_exist').user;  
var User            = require('./users');


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

    userName        : {
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

    interests            : {
        number       : {
            type        : Number,
            default     : 0
        },        
        list         : [{
            type        : ObjectId,
            ref         : 'users'
        }]
    },   

    hires            : {
        status       : {
            type     : Number,
            default  : 0
        },

        time         : {
            type     : String
        }

    },

    comment       : [{
    	type           : ObjectId,
    	ref            : 'comments'
    }],

    companyName   : {
        type      : String
    },

    companyId     : {
        type           : ObjectId,
        ref            : 'users'
    }

});

applicationSchema.plugin(searchPlugin, {
        fields : ['description', 'hash_tag']
})

// check application is Own of account
applicationSchema.methods.isOwn         = function(companyId){
    return (companyId == this.companyId);
}

applicationSchema.methods.newInfor    = function(user_id, userName, user_avatar, 
                                        job_id, title, hash_tag, description, time, 
                                        file, companyName, companyId, callback){

    var app = this;
    app.user_id        = user_id;
    app.userName        = userName;
    app.user_avatar    = user_avatar;

    app.job_id         = job_id;
    app.title          = title;
    app.hash_tag       = hash_tag;
    app.description    = description;
    app.time           = time;

    app.companyId = companyId;
    app.companyName = companyName;
    
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


applicationSchema.methods.editInfor    = function(title, description, hash_tag, time, file, callback){

    var app = this;

    app.title          = title;
    app.hash_tag       = hash_tag;
    app.description    = description;
    app.time           = time;
   
    if (file != ''){
        app.file           = file;
    }

    add_hashTag_app(hash_tag, app._id, function(){
        app.save(function(err){
            callback(app);    
        });
    });

}   

// ================ ADD COMMENT, LIKE, INREST, HIRE ================

applicationSchema.methods.addComment = function(comment_id, callback){
	this.comment.push(comment_id);
	this.save(function(err){
		callback();
	})
}


applicationSchema.methods.addLike       = function(user_id, callback){
    var app = this;
    if (app.likes.list.indexOf(user_id) != -1){
        app.likes.list.splice(app.likes.list.indexOf(user_id), 1);
        app.likes.number --;

        User.findOne({
            _id: app.user_id
        }, function(err, user_own_app) {
            user_own_app.score--;
            user_own_app.save(function(err) {
                if (err) {
                    console.log(err);
                }
            })
        })

        app.save(function(err){
            callback(0);
        })




    } else{
        app.likes.list.push(user_id);
        app.likes.number ++;

        User.findOne({
            _id: app.user_id
        }, function(err, user_own_app) {
            user_own_app.score++;
            user_own_app.save(function(err) {
                if (err) {
                    console.log(err);
                }
            })
        })

        app.save(function(err){
            callback(1);
        })
    }
}

applicationSchema.methods.addShare       = function(user_id){
    var app = this;
    app.shares.list.push(user_id);
    app.shares.number ++;

    User.findOne({
        _id: app.user_id
    }, function(err, user_own_job) {
        user_own_job.score++;
        user_own_job.save(function(err) {
            if (err) {
                console.log(err);
            }
        })
    })

    app.save(function(err){});

}

applicationSchema.methods.addInterest       = function(user_id, callback){
    var app = this;
    if (app.interests.list.indexOf(user_id) != -1){
        app.interests.list.splice(app.interests.list.indexOf(user_id), 1);
        app.interests.number --;

        User.findOne({
            _id: app.user_id
        }, function(err, user_own_job) {
            user_own_job.score--;
            user_own_job.save(function(err) {
                if (err) {
                    console.log(err);
                }
            })
        })

        app.save(function(err){
            callback();
        })

    } else{
        app.interests.list.push(user_id);
        app.interests.number ++;

        User.findOne({_id : app.user_id}, function(err, user_exist){
            if (!err && user_exist){

                user_exist.score ++;
                user_exist.save(function(err){});

                user_exist.addInterest(user_id, function(){
                    app.save(function(err){
                        callback();
                    })            
                })

            } else{
                callback();
            }
        })
    }
}

applicationSchema.methods.addHire       = function(){
    this.hires.status = 1;
    this.hires.time         = new Date(new Date().toGMTString()).toJSON();

    this.save(function(err){
    });
}


// =========================================================================


// create the model for applications and expose it to our app
module.exports = mongoose.model('applications', applicationSchema);
