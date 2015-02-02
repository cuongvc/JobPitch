// load the things we need
var mongoose        = require('mongoose');
var ObjectId        = mongoose.Schema.Types.ObjectId;

// define the schema for our tag model
var tagSchema = mongoose.Schema({

    name          : {
        type         : String,
        default      : ''
    },

    job_id        : [{
        type         : ObjectId,
        ref          : 'jobs'
    }],

    app_id        : [{
        type         : ObjectId,
        ref          : 'applications'
    }]

});


tagSchema.methods.addJob    = function(job_id){
    this.job_id.push(job_id);
    return 0;
}



tagSchema.methods.addApp    = function(app_id){
    this.app_id.push(app_id);
    return 0;
}

// create the model for tags and expose it to our app
module.exports = mongoose.model('tags', tagSchema);
