// load the things we need
var mongoose            = require('mongoose');
var ObjectId            = mongoose.Schema.Types.ObjectId;

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


// create the model for permalinks and expose it to our app
module.exports = mongoose.model('permalinks', permalinkSchema);
