// load the things we need
var mongoose     = require('mongoose');
var ObjectId     = mongoose.Schema.Types.ObjectId;
var bcrypt       = require('bcrypt-nodejs');
var domain       = require('./../config/default').domain_default;

// define the schema for our job model
var jobSchema = mongoose.Schema({

    image             : {
        type         : String,
        default      : domain + '/img/full_size/job_image/default-image.png'
    },

    image_small       : {
        type         : String,
        default      : domain + '/img/full_size/job_image/default-image.png'
    },    

    image_normal      : {
        type         : String,
        default      : domain + '/img/full_size/job_image/default-image.png'
    },  

    companyId        : {
        type         : ObjectId,
        ref          : 'companys' 
    },

    tagLine  : {
        type         : String,
        default      : ''
    },

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
            ref         : 'talents'
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
            ref         : 'talents'
        }]
    },

    hires            : {
        number       : {
            type        : Number,
            default     : 0
        },        list         : [{
            type        : ObjectId,
            ref         : 'talents'
        }]
    }

});

// check job is Own of account
jobSchema.methods.isOwn         = function(companyId){
    return (companyId == this.companyId);
}

// make new Infor of Job
// infor : {image, image_small, image_normal, companyId, tagLine, description, location, 
//          link_direct, time, contact}

jobSchema.methods.newInfor    = function(image, image_small, image_normal, companyId
                                        ,tagLine, description, lat, lng, address
                                        ,link_direct, time , callback){
    if (image != '')
        this.image            = image;
    if (image_small != '')
        this.image_small      = image_small;
    if (image_normal != '')
        this.image_normal     = image_normal;
    this.companyId        = companyId;
    this.tagLine          = tagLine;
    this.description      = description;
    this.lat              = lat;
    this.lng              = lng;
    this.address          = address;
    this.link_direct      = link_direct;
    this.time             = time;

    callback(this);       
}   




// edit Infor
// { logo, logo_small, logo_normal, Fullname, YearOfBirth
//   Address, Industry, Sex, Contact }
jobSchema.methods.editInfor     = function(job){
       return this;
}

// create the model for jobs and expose it to our app
module.exports = mongoose.model('jobs', jobSchema);
