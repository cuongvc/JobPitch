// load the things we need
var mongoose        = require('mongoose');
var searchPlugin    = require('mongoose-search-plugin');

var ObjectId        = mongoose.Schema.Types.ObjectId;
var bcrypt          = require('bcrypt-nodejs');
var domain          = require('./../config/default').domain_default;
var add_hashTag_app = require('./../my_module/add_hashTag').app;
var check_user      = require('./../my_module/check_exist').user;  
var User            = require('./users');

var distanceLimit   = require('./../config/default').distanceLimit;
var distance        = require('./../my_module/map/distance');

// define the schema for our application model
var applicationSchema = mongoose.Schema({

    job_id           : {
        type         : ObjectId,
        ref          : 'jobs',
    },

    job_title        : {
        type         : String,
        default      : ''
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

    userTagName          : {
        type         : String
    },


    position: {
        lat: {
            type: Number,
            default : 21.029346
        },

        lng: {
            type: Number,
            default : 105.832586
        },

        formatted_address: {
            type: String,
            default : 'Ha Noi, Viet Nam'
        },

        state : {
            long_name : {
                type : String, 
                default : 'Ha Noi'
            },
            short_name : {
                type : String,
                default : 'HN'
            },
            types : [{
                type : String
            }]
        },

        country : {
            long_name : {
                type : String, 
                default : 'Viet Nam'
            },
            short_name : {
                type : String,
                default : 'VN'
            },
            types : [{
                type : String
            }]

        },

        city : {
            long_name : {
                type : String, 
                default : 'Ha Noi'
            },
            short_name : {
                type : String,
                default : 'HN'
            },
            types : [{
                type : String
            }]

        },
    },

    userName_own_job : String,

    userTagName_own_job : String,

    userId_own_job   : {
        type         : ObjectId,
        ref          : 'users'
    },

    title  : {
        type         : String,
        default      : ''
    },

    hash_tag         : [{
        type         : String
    }],

    tagname          : {
        type         : [{
            name     : String,
            user_id  : {
                type : ObjectId,
                ref  : 'users'
            }
        }],
        default      : []
    },


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

var options = {
    keywordsPath: '_keywords', // path for keywords, `_keywords` as default 
    relevancePath: '_relevance', // path for relevance number, '_relevance' as default 
    fields: ['description', 'hash_tag','userName'], // array of fields to use as keywords (can be String or [String] types), 
    stemmer: 'PorterStemmer', // natural stemmer, PorterStemmer as default 
    // distance: 'JaroWinklerDistance' // distance algorythm, JaroWinklerDistance as default 
    distance: 'LevenshteinDistance' // distance algorythm, JaroWinklerDistance as default 
};

applicationSchema.plugin(searchPlugin, options);

// check application is Own of account
applicationSchema.methods.isOwn         = function(companyId){
    return (companyId == this.companyId);
}

applicationSchema.methods.newInfor    = function(user_id, userName, userTagName, userId_own_job, userName_own_job, 
                                        userTagName_own_job,  user_avatar, job_id, job_title, 
                                        title, hash_tag, tagname, description, time, 
                                        file, position, callback){

    var app                 = this;
    app.user_id             = user_id;
    
    app.userName            = userName;
    app.userTagName         = userTagName;
    
    app.user_avatar         = user_avatar;
    app.userId_own_job      = userId_own_job;
    app.userName_own_job    = userName_own_job;
    app.userTagName_own_job = userTagName_own_job;
    
    app.job_id              = job_id;
    app.job_title           = job_title;
    app.title               = title;
    app.hash_tag            = hash_tag;
    app.tagname             = tagname;
    app.description         = description;
    app.time                = time;
    app.position            = position;
    
    if (file != ''){
        app.file           = file;
    }
    console.log('add hastag');
    add_hashTag_app(position.country.short_name, hash_tag, app._id, function(){
        console.log('callback');
        app.save(function(err){
            callback(app);    
        });
    });

}   


applicationSchema.methods.editInfor    = function(title, description, hash_tag, tagname, time, file, callback){

    var app = this;

    app.title          = title;
    app.hash_tag       = hash_tag;
    app.tagname        = tagname;
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

applicationSchema.methods.distance      = function(lat, lng){
    var location1 = {lat : lat, lng : lng};
    var location2 = {lat : this.position.lat, lng : this.position.lng};
    return distance(location1, location2) < distanceLimit;
}


// =========================================================================


// create the model for applications and expose it to our app
module.exports = mongoose.model('applications', applicationSchema);
