// load the things we need
var mongoose            = require('mongoose');
var ObjectId            = mongoose.Schema.Types.ObjectId;
var bcrypt              = require('bcrypt-nodejs');
var domain              = require('./../config/default').domain_default;
var add_hashTag_notification = require('./../my_module/add_hashTag').notification;

var User                = require('./users');

// define the schema for our notification model
var notificationSchema = mongoose.Schema({

    user_id_receive          : {
        type         : ObjectId,
        ref          : 'users' 
    },

    link             : {
        type         : String,
        default      : ''
    },



    content          : {
        userName_make_notify : String,
        content              : String,
        short_content        : String,
        job_id               : {
            type             : ObjectId,
            ref              : 'jobs'
        },
        app_id               : {
            type             : ObjectId,
            ref              : 'applications'
        },
        userAvatar_make_notify : {
            type         : String
        }
    },

    type_notify      : {
        type         : Number,
        default      : 0
    },

    time             : {
        type         : String
    },

    status           : {
        type         : Number,
        default      : 0
    }

});


notificationSchema.methods.newInfor    = function(user_id_receive, userName_make_notify, content, 
                                                short_content, job_id, app_id,
                                                link, userAvatar_make_notify, type_notify){

    var notify = this;
    notify.user_id_receive = user_id_receive;
    notify.content.userAvatar_make_notify = userAvatar_make_notify;
    notify.content.userName_make_notify = userName_make_notify;
    notify.content.content = content;
    notify.content.short_content = short_content;
    notify.content.job_id = job_id;
    if (app_id != '')
        notify.content.app_id = app_id;
    notify.type_notify = type_notify;
    notify.time = new Date(new Date().toGMTString()).toJSON();
    notify.link = link;


    notify.save(function(err){
        User.findOne({_id : user_id_receive}, function(err, user_exist){
            if (err || !user_exist){
                return 0;
            } else{
                console.log('USERS EXIST : ', user_exist);
                user_exist.notifications.list.push(notify);
                user_exist.notifications.unread ++;
                user_exist.save(function(err){});
            }
        });

    })

}   

// create the model for notifications and expose it to our app
module.exports = mongoose.model('notifications', notificationSchema);
