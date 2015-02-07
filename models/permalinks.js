// load the things we need
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var make_permalink = require('./../my_module/make_permalink');

// define the schema for our permalink model
var permalinkSchema = mongoose.Schema({

    user_id: {
        type: ObjectId,
        ref: 'users'
    },
    job_id: {
        type: ObjectId,
        ref: 'jobs'
    },
    type: {
        type: Number
    },
    permalink: {
        type: String
    }
});


permalinkSchema.methods.newInfor = function(user_id, job_id, type, title, callback) {
    var permalink = this;
    if (user_id != '')
    	permalink.user_id = user_id;
    if (job_id != '')
    	permalink.job_id = job_id;
    permalink.type = type;
    permalink.permalink = make_permalink(title);
    permalink.save(function(err){
    	if (err){
    		console.log(err);
    	}
    	callback();
    })
}


// create the model for permalinks and expose it to our app
module.exports = mongoose.model('permalinks', permalinkSchema);
