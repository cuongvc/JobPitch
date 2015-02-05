// load the things we need
var mongoose            = require('mongoose');
var ObjectId            = mongoose.Schema.Types.ObjectId;
var bcrypt              = require('bcrypt-nodejs');
var domain              = require('./../config/default').domain_default;


// define the schema for our contract model
var contractSchema = mongoose.Schema({

    user_id          : {
        type         : ObjectId,
        ref          : 'users' 
    },

    company_id       : {
        type         : ObjectId,
        ref          : 'users'
    },

    job_id           : {
        type         : ObjectId,
        ref          : 'jobs'
    },

    time             : {
        type         : String,
        default      : ''
    }

});

contractSchema.methods.newInfor    = function(user_id, company_id, job_id, callback){
    var contract = this;
    contract.user_id            = user_id;
    contract.company_id         = company_id;
    contract.job_id             = job_id;
    contract.time               = new Date(new Date().toGMTString()).toJSON();
    contract.save(function(err){
        callback(contract);    
    })
}   


// create the model for contracts and expose it to our app
module.exports = mongoose.model('contracts', contractSchema);
