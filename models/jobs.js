// load the things we need
var mongoose     = require('mongoose');
var ObjectId     = mongoose.Schema.Types.ObjectId;
var bcrypt       = require('bcrypt-nodejs');
var domain       = require('./../config/default').domain_default;
var image_default = require('./../config/default').jobImage_default;

// define the schema for our job model
var jobSchema = mongoose.Schema({

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

    companyId        : {
        type         : ObjectId,
        ref          : 'users' 
    },

    title  : {
        type         : String,
        default      : ''
    },

    tag              : {
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

    location         : {
        lat          : Number,
        lng          : Number,
        address      : String
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
        default      : 1        // 1 : hiring, 2: hired
    },

    likes            : {
        number       : {
            type        : Number,
            default     : 0
        },        list         : [{
            type        : ObjectId,
            ref         : 'talents'
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

    applications     : {
        number       : {
            type        : Number,
            default     : 0
        },        list         : [{
            type        : ObjectId,
            ref         : 'applications'
        }]
    },

    interviews       : {
        number       : {
            type        : Number,
            default     : 0
        },        list         : [{
            type        : ObjectId,
            ref         : 'users'
        }]
    },

    hires            : {
        number       : {
            type        : Number,
            default     : 0
        },        list         : [{
            type        : ObjectId,
            ref         : 'users'
        }]
    }

});

// check job is Own of account
jobSchema.methods.isOwn         = function(companyId){
    return (companyId == this.companyId);
}

jobSchema.methods.newInfor    = function(image, image_small, image_normal, companyId
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
    this.hash_tag          = hash_tag;
    this.description      = description;
    this.lat              = lat;
    this.lng              = lng;
    this.address          = address;
    this.link_direct      = link_direct;
    this.time             = time;
    console.log('callback');
    callback(this);       
}   

jobSchema.methods.editInfor     = function(job){
       return this;
}

// create the model for jobs and expose it to our app
module.exports = mongoose.model('jobs', jobSchema);
