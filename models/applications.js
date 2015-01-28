// load the things we need
var mongoose     = require('mongoose');
var ObjectId     = mongoose.Schema.Types.ObjectId;
var bcrypt       = require('bcrypt-nodejs');
var domain       = require('./../config/default').domain_default;

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

    interviews       : {
        type          : Number,
        default     : 0

    },

    hires            : {
        type          : Number,
        default     : 0

    }

});

// check application is Own of account
applicationSchema.methods.isOwn         = function(companyId){
    return (companyId == this.companyId);
}

applicationSchema.methods.newInfor    = function(user_id, job_id, title, hash_tag, description, time,  callback){
    this.user_id        = user_id;
    this.job_id         = job_id;
    this.title          = title;
    this.hash_tag       = hash_tag;
    this.description    = description;
    this.time           = time;
    callback(this);       
}   

applicationSchema.methods.editInfor     = function(application){
       return this;
}

// create the model for applications and expose it to our app
module.exports = mongoose.model('applications', applicationSchema);
