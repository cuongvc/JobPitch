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
    }],

    comment_id    : [{
        type         : ObjectId,
        ref          : 'comments'
    }],
    
    number        : {
        type         : Number,
        default      : 1
    }

});


tagSchema.methods.addJob    = function(job_id){
    this.job_id.push(job_id);
    this.number ++;
    this.save(function(err){});
    return 0;
}



tagSchema.methods.addApp    = function(app_id){
    this.app_id.push(app_id);
    this.number ++;
    this.save(function(err){});
    return 0;
}

tagSchema.methods.addComment= function(comment_id){
    this.comment_id.push(comment_id);
    this.number ++;
    this.save(function(err){});
    return 0;
}

// create the model for tags and expose it to our app
module.exports = mongoose.model('tags', tagSchema);
