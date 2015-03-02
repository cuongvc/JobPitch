// load the things we need
var mongoose        = require('mongoose');

// define the schema for our tag model
var tagnameSchema = mongoose.Schema({

    name          : {
        type         : String,
        default      : ''
    },

    number        : {
        type         : Number,
        default      : 1
    }

});

// create the model for tagnames and expose it to our app
module.exports = mongoose.model('tagnames', tagnameSchema);
