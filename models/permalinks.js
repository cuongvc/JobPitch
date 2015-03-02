// load the things we need
var mongoose            = require('mongoose');
var ObjectId            = mongoose.Schema.Types.ObjectId;

var make_permalink      = require('./../my_module/make_permalink');

// define the schema for our permalink model
var permalinkSchema = mongoose.Schema({

    user_id          : {
        type         : ObjectId,
        ref          : 'users' 
    },

    job_id           : {
        type         : ObjectId,
        ref          : 'jobs' 
    },

    type_permalink   : {
        type         : Number
    },

    permalink        : String
});

permalinkSchema.methods.newInfor = function(user_id, job_id, type_permalink, title, callback){
    var permalink_ = this;
    if(user_id != '')
        permalink_.user_id = user_id;
    if (job_id != '')
        permalink_.job_id = job_id;
    permalink_.type_permalink = type_permalink;
    permalink_.permalink = make_permalink(title);
    permalink_.save(function(err){
        callback();
    })
    
}

// create the model for permalinks and expose it to our app
module.exports = mongoose.model('permalinks', permalinkSchema);
