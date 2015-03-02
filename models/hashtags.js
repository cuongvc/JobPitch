// load the things we need
var mongoose        = require('mongoose');
var ObjectId        = mongoose.Schema.Types.ObjectId;

// define the schema for our tag model
var hashtagSchema = mongoose.Schema({

    name          : {
        type         : String,
        default      : '',
        index        : true
    },

    country : mongoose.Schema.Types.Mixed

}, { strict: false });

// create the model for hashtags and expose it to our app
module.exports = mongoose.model('hashtags', hashtagSchema);
