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

applicationSchema.methods.newInfor    = function(image, image_small, image_normal, companyId
                                        ,title, tag, hash_tag, description, lat, lng, address
                                        ,link_direct, time , callback){
    if (image != '')
        this.image            = image;
    if (image_small != '')
        this.image_small      = image_small;
    if (image_normal != '')
        this.image_normal     = image_normal;
    this.companyId        = companyId;
    this.title            = title;
    this.tag              = tag;
    this.hash_tag         = hash_tag;
    this.description      = description;
    this.lat              = lat;
    this.lng              = lng;
    this.address          = address;
    this.link_direct      = link_direct;
    this.time             = time;
    console.log('callback');
    callback(this);       
}   

applicationSchema.methods.editInfor     = function(application){
       return this;
}

// create the model for applications and expose it to our app
module.exports = mongoose.model('applications', applicationSchema);
