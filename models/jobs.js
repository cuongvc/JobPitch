// load the things we need
var mongoose        = require('mongoose');
var User            = require('./users');
var ObjectId        = mongoose.Schema.Types.ObjectId;
var bcrypt          = require('bcrypt-nodejs');
var domain          = require('./../config/default').domain_default;
var distanceLimit   = require('./../config/default').distanceLimit;
var image_default   = require('./../config/default').jobImage_default;
var distance        = require('./../my_module/map/distance');
var add_hashTag_job = require('./../my_module/add_hashTag').job;
var Jobs            = require('./jobs');
// var autoIncrement = require('mongoose-auto-increment');
// autoIncrement.initialize(mongoose);

var make_permalink   = require('./../my_module/make_permalink');
var Permalink        = require('./permalinks');


// define the schema for our job model
var jobSchema = new mongoose.Schema({

    image             : {
        type         : String,
        default      : image_default
    },

    image_small       : {
        type         : String,
        default      : image_default
    },    

    image_normal      : {
        type         : String,
        default      : image_default
    },  

    user_id          : {
        type         : ObjectId,
        ref          : 'users' 
    },

    userName         : {
        type         : String,
        default      : '',
        autocomplete : true
    },

    userTagName      : {
        type         : String,
        default      : ''
    },

    title            : {
        type         : String,
        default      : ''
    },

    permalink        : {
        type         : String,
        default      : '',
        index: true
    },


    hash_tag         : {
        type         : [{
            type         : String,
        }],
        default      : []
    },

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
        default      : '',
        autocomplete : true
    },

    location         : {
        lat          : {
            type         : Number
        },

        lng          : {
            type         : Number
        },

        address      : {
            type         : String,
            default      : ''
        },

        city         : {
            type         : String,
            default      : ''
        },

        country      : {
            type         : String,
            default      : ''
        },

        state      : {
            type         : String,
            default      : ''
        },

    },

    link_direct      : {
        type         : String,
        default      : ''
    },

    time             : {
        type         : String
    },

    status           : {
        type         : Number,
        default      : 1
            // 1: dang tim nguoi
            // 2: het han dang tuyen (sau 24h)
            // 3: het han tim nguoi
            // 4: da tim duoc nguoi 
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

    score            : {
        type         : Number,
        default      : 0
    },

    applications     : {
        number       : {
            type        : Number,
            default     : 0
        },        
        list         : [{
            type        : ObjectId,
            ref         : 'applications'
        }]
    },

    interviews       : {
        type        : Number,
        default     : 0
    },

    hires            : {
        type        : Number,
        default     : 0
    },

    contracts        : {
        number       : {
            type        : Number,
            default     : 0
        },        
        list         : [{
            type        : ObjectId,
            ref         : 'contract'
        }]
    },

    // user apply job
    receive_notify   : [{
        type        : ObjectId,
        ref         : 'users'
    }]
    

});

// var options = {
//     keywordsPath: '_keywords', // path for keywords, `_keywords` as default 
//     relevancePath: '_relevance', // path for relevance number, '_relevance' as default 
//     fields: ['description', 'hash_tag','userName', 'title'], // array of fields to use as keywords (can be String or [String] types), 
//     stemmer: 'PorterStemmer', // natural stemmer, PorterStemmer as default 
//     // distance: 'JaroWinklerDistance' // distance algorythm, JaroWinklerDistance as default 
//     distance: 'LevenshteinDistance' // distance algorythm, JaroWinklerDistance as default 
// };

// jobSchema.plugin(searchPlugin, options);

// check job is Own of account
jobSchema.methods.isOwn         = function(user_id){
    return (user_id == this.user_id);
}

jobSchema.methods.containTag    = function(tag){
    if (typeof(tag) == 'undefined')
        return 1;
    for (var i = 0 ; i < this.hash_tag.length ; i ++){
        console.log(this.hash_tag[i]);
        if (this.hash_tag[i] == tag){
            return 1;
        }
    }
    return 0;
}

jobSchema.methods.newInfor    = function(image, image_small, image_normal, user_id, userName, userTagName,
                                        title, hash_tag, tagname, description, lat, lng, address, 
                                        city, country, state ,link_direct, time , callback){

    var job = this;
    if (image != '')
        job.image              = image;
    if (image_small != '')
        job.image_small        = image_small;
    if (image_normal != '')
        job.image_normal       = image_normal;
    job.userName               = userName;
    job.userTagName            = userTagName;
    job.user_id                = user_id;
    job.title                  = title;
    job.hash_tag               = hash_tag;
    job.tagname                = tagname;
    job.description            = description;
    job.link_direct            = link_direct;
    job.time                   = time;
    job.location.lat           = lat;
    job.location.lng           = lng;
    job.location.address       = address;
    job.location.city          = city;
    job.location.country       = country;
    job.location.state         = state;
    
    var newPermalink = new Permalink();
    newPermalink.newInfor('', job._id, 2, title, function(){
        job.permalink =  newPermalink.permalink;
        add_hashTag_job(hash_tag, job._id, function(){
            callback(job);
        })    
    });    
}   

jobSchema.methods.distance      = function(lat, lng){
    var location1 = {lat : lat, lng : lng};
    var location2 = {lat : this.location.lat, lng : this.location.lng};
    return distance(location1, location2) < distanceLimit;
}

jobSchema.methods.editInfor    = function(image, image_small, image_normal, user_id, userName
                                        ,title, hash_tag, tagname, description, lat, lng, address, city, country, state
                                        ,link_direct, time , callback){

    var job = this;
    if (image != '')
        job.image              = image;
    if (image_small != '')
        job.image_small        = image_small;
    if (image_normal != '')
        job.image_normal       = image_normal;
    job.userName               = userName;
    job.user_id                = user_id;
    job.title                  = title;
    job.hash_tag               = hash_tag;
    job.tagname                = tagname;
    job.description            = description;
    job.link_direct            = link_direct;
    job.time                   = time;
    job.location.lat           = lat;
    job.location.lng           = lng;
    job.location.address       = address;
    job.location.city          = city;
    job.location.country       = country;
    job.location.state         = state;

    var newPermalink = new Permalink();
    newPermalink.newInfor('', job._id, 2, title, function(){
        job.permalink =  newPermalink.permalink;
        add_hashTag_job(hash_tag, job._id, function(){
            callback(job);
        })    
    });    
}   


jobSchema.methods.addApply      = function(user_id, application, callback){
    var job = this;
    if (job.receive_notify.indexOf(user_id) == -1)
        job.receive_notify.push(user_id);

    User.findOne({
        _id: job.user_id
    }, function(err, user_own_job) {
        user_own_job.score++;
        user_own_job.save(function(err) {
            if (err) {
                console.log(err);
            }
        })
    })

    job.applications.list.push(application);
    job.applications.number ++;
    job.score ++;
    job.save(function(err){
        callback();
    })
}

jobSchema.methods.addLike       = function(user_id, callback){
    var job = this;
    if (job.likes.list.indexOf(user_id) != -1) {
        job.likes.list.splice(job.likes.list.indexOf(user_id), 1);
        job.likes.number--;
        job.score--;
        job.save(function(err) {
            callback(0);
        })

        User.findOne({
            _id: job.user_id
        }, function(err, user_own_job) {
            user_own_job.score--;
            user_own_job.save(function(err) {
                if (err) {
                    console.log(err);
                }
            })
        })


    } else{
        job.likes.list.push(user_id);
        job.likes.number ++;
        job.score ++;
        job.save(function(err){
            callback(1);
        })

        User.findOne({
            _id: job.user_id
        }, function(err, user_own_job) {
            user_own_job.score++;
            user_own_job.save(function(err) {
                if (err) {
                    console.log(err);
                }
            })
        })


    }
}

jobSchema.methods.addShare       = function(user_id){
    var job = this;

    job.shares.list.push(user_id);
    job.shares.number ++;
    job.score ++;
    job.save(function(err){
    })

    User.findOne({
        _id: job.user_id
    }, function(err, user_own_job) {
        user_own_job.score++;
        user_own_job.save(function(err) {
            if (err) {
                console.log(err);
            }
        })
    })

}


jobSchema.methods.addContract       = function(contract, callback){
    if (this.contracts.list.indexOf(contract._id) == -1){
        this.contracts.list.push(contract._id);
        this.contracts.number ++;
        this.save(function(err){
            callback();
        })
    } else{
        callback();
    }
}

jobSchema.methods.changeStatus       = function(status, callback){
   this.status = status;
   this.save(function(err){
        callback();
   })
}

// jobSchema.plugin(autoIncrement.plugin, {model : 'Job', fields : 'jobId'});

// create the model for jobs and expose it to our app
module.exports = mongoose.model('jobs', jobSchema);
