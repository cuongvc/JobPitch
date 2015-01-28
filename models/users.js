// load the things we need
var mongoose        = require('mongoose');
var graph           =   require('fbgraph');
var async           = require('async');
var ObjectId        = mongoose.Schema.Types.ObjectId;
var bcrypt          = require('bcrypt-nodejs');
var domain          = require('./../config/default').domain_default;
var avatar_default  = require('./../config/default').avatar_default;
var logo_default    = require('./../config/default').logo_default;

var client_id_fb     = require('./../config/Oauth').facebookAuth.clientID;
var client_secret_fb = require('./../config/Oauth').facebookAuth.clientSecret;


// define the schema for our user model
var userSchema = mongoose.Schema({

    address          : {
        type         : String,
        default      : ''
    },

    location         : {
        lat          : {
            type         : Number,
            default      : 200
        },

        lng          : {
            type         : Number,
            default      : 200
        },

        address      : {
            type         : String,
            default      : ''
        }
    },

    type_account     : {
        type         : Number,
        default      : 1
    },

    local_infor      : {
        password     : {
            type     : String,
            default  : ''
        },
        email        : {
            type     : String,
            default  : ''
        }
    },
    
    fb_infor         : {
        id           : {
            type     : String,
            default  : ''
        },
        avatar       : {
            type     : String,
            default  : ''
        },
        username     : {
            type     : String,
            default  : ''
        },
        gender        : {
            type     : String,
            default  : ''
        },
        profileUrl        : {
            type     : String,
            default  : ''
        },
        email        : {
            type     : String,
            default  : ''
        },
        access_token :{
            type     : String,
            default  : ''
        }
    },

    twitter_infor         : {
        id           : {
            type     : String,
            default  : ''
        },
        avatar       : {
            type     : String,
            default  : ''
        },
        username     : {
            type     : String,
            default  : ''
        },
        gender        : {
            type     : String,
            default  : ''
        },
        profileUrl        : {
            type     : String,
            default  : ''
        },
        email        : {
            type     : String,
            default  : ''
        },
        access_token : {
            type     : String,
            default  : ''
        },
        token_secret : {
            type     : String,
            default  : ''
        }
    },

    linkedin_infor         : {
        id           : {
            type     : String,
            default  : ''
        },
        avatar       : {
            type     : String,
            default  : ''
        },
        username     : {
            type     : String,
            default  : ''
        },
        gender        : {
            type     : String,
            default  : ''
        },
        profileUrl        : {
            type     : String,
            default  : ''
        },
        email        : {
            type     : String,
            default  : ''
        },
        access_token :{
            type     : String,
            default  : ''
        }
    },

    google_infor         : {
        id           : {
            type     : String,
            default  : ''
        },
        avatar       : {
            type     : String,
            default  : ''
        },
        username     : {
            type     : String,
            default  : ''
        },
        gender        : {
            type     : String,
            default  : ''
        },
        profileUrl        : {
            type     : String,
            default  : ''
        },
        email        : {
            type     : String,
            default  : ''
        },
        access_token :{
            type     : String,
            default  : ''
        }
    },

    contact          : {
        type         : String,
        default      : ''
    },

    notifications    : [{

        unread       : {
            type        : Number,
            default     : 0
        },

        list         : [{
            type         : ObjectId,
            ref          : 'notifications'
        }]

    }],

    messages         : [{

        unread       : {
            type        : Number,
            default     : 0
        },

        list         : [{
            type         : ObjectId,
            ref          : 'messages'
        }]

    }],

    token     : {
        type         : String,
        default      : ''
    },

    permission       : {
        type         : Number,
        default      : 0
    },

    active                   : {
        type           : Number,
        default        : 1
    },

    logo             : {
        type         : String,
        default      : logo_default
    },

    logo_small       : {
        type         : String,
        default      : logo_default
    },    

    logo_normal      : {
        type         : String,
        default      : logo_default
    },  

    companyName      : {
        type         : String
    },

    companyFullname  : {
        type         : String,
        default      : ''
    },

    website          : {
        type         : String,
        default      : ''
    },

    followMes        : [{
        type         : ObjectId,
        ref          : 'users'
    }],


    myJobs           : [{
        type         : ObjectId,
        ref          : 'jobs'
    }],

    myApplications   : [{
        type         : ObjectId,
        ref          : 'applications'
    }],

    myFollows          : [{
        type         : ObjectId,
        ref          : 'companys'
    }],

    friends          : [{   

        list         : {
            type         : ObjectId,
            ref          : 'users'
        }
    }],

    avatar           : {
        type         : String,
        default      : avatar_default
    },

    avatar_small     : {
        type         : String,
        default      : avatar_default
    },    

    avatar_normal     : {
        type         : String,
        default      : avatar_default
    },  

    userName       : {
        type         : String
    },

    userFullname         : {
        type         : String,
        default      : ''
    },


    industry         : {
        type         : String,
        default      : ''
    },

    education             : {
        type         : String,
        default      : ''
    },

    gender           : {
        type         : String
    },

    year_of_birth    : {
        type         : Number,
        default      : null
    }

});


// ======================== LOCAL INFOR =======================================
// generating a hash
userSchema.methods.generateHash = function(password) {
    var password_ = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null); 
    return password_;
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    if (this.local_infor.password =='') return 0;         
    return bcrypt.compareSync(password, this.local_infor.password);
};

// check user is Own of account
userSchema.methods.isOwn         = function(user_id){
    return (user_id == this.id);
}

// ======================== FACEBOOK INFOR ====================================

function  API_FB(api, callback){
    var options = {
        timeout:  6969
        , pool:     { maxSockets:  Infinity }
        , headers:  { connection:  "keep-alive" }
    };
    graph
        .setOptions(options)
        .get(api, function(err, data) {
          if (err) {
            callback(err, null);
          } else{
              callback(null, data);
          }    
        });
}

userSchema.methods.getAvatarFb   = function(access_token, callback){

    var profile;
    var avatar, avatar_small, avatar_normal;
    var options = {
        timeout:  6969
        , pool:     { maxSockets:  Infinity }
        , headers:  { connection:  "keep-alive" }
    };

    graph.setAccessToken(access_token);
    graph.extendAccessToken({
        "access_token":      access_token
        , "client_id":       client_id_fb
        , "client_secret":   client_secret_fb
    }, function (err, facebookRes) {
        if (err) {
            console.log('Error : ', err.messages);
            callback();
        }

        async.waterfall([
            function(next){
                API_FB("me?fields=picture.width(800).height(800)&redirect=false", function(err, data){
                    if (err){
                        console.log(err);
                        next(err);
                    } else{
                        avatar = data.picture.data.url;                                               // GET AVATAR
                        avatar_normal= data.picture.data.url;
                        next(null);
                    }
                });
            },

            function(next){
                API_FB("me?fields=picture.width(200).height(200)&redirect=false", function(err, data){
                    if (err){
                        console.log(err);
                        next(err);
                    } else{
                        avatar_small = data.picture.data.url;
                        next(null); 
                    }
                });               
            }

        ], function(err){
            if (err){
                console.log(err);
                return 0;
            };
            callback(avatar, avatar_normal, avatar_small);
        });
    });
}

// make new Infor
userSchema.methods.newInforFb    = function(access_token, profile, callback){

    this.getAvatarFb(access_token, function(avatar, avatar_normal, avatar_small){
        this.avatar                  = avatar;
        this.avatar_small            = avatar_small;
        this.avatar_normal           = avatar_normal;
        this.type_account            = 2;
        this.userName                = profile.displayName;
        this.gender                  = profile.gender;
        this.fb_infor.avatar         = avatar_normal;
        this.fb_infor.id             = profile.id;
        this.fb_infor.gender         = profile.gender;
        this.fb_infor.profileUrl     = profile.profileUrl;  
        this.fb_infor.access_token   = access_token;
        this.fb_infor.username       = profile.displayName;
        this.fb_infor.email          = profile.emails[0].value;

        this.makeToken();
        this.save(function(err) {
            if (err)
                 throw err;
            callback(this);
        });                            
    });
}   


// ======================== TWITTER INFOR ====================================

userSchema.methods.newInforTw    = function(access_token, token_secret, profile, callback){
    this.userName                   = profile.displayName;
    this.avatar                     = profile._json.profile_image_url;
    this.avatar_small               = profile._json.profile_image_url;
    this.avatar_normal              = profile._json.profile_image_url;
    this.type_account               = 3;

    this.twitter_infor.id           = profile.id;
    this.twitter_infor.access_token = access_token;
    this.twitter_infor.token_secret = token_secret;
    this.twitter_infor.username     = profile.displayName;

    this.makeToken();
    this.save(function(err) {
        if (err)
            throw err;
        callback(this);
    });
}

// ======================== GOOGLE INFOR ====================================
userSchema.methods.newInforGg    = function(access_token, profile, callback){
    this.userName                   = profile.displayName;
    this.avatar                     = profile._json.picture;
    this.avatar_small               = profile._json.picture;
    this.avatar_normal              = profile._json.picture;
    this.gender                     = profile._json.gender;
    this.type_account               = 4;

    this.google_infor.id           = profile.id;
    this.google_infor.access_token = access_token;
    this.google_infor.username     = profile.displayName;
    this.google_infor.gender       = profile.gender;
    this.google_infor.avatar       = profile._json.picture;
    this.google_infor.email        = profile.emails[0].value;   
    this.google_infor.profileUrl   = profile._json.link;  

    this.makeToken();
    this.save(function(err) {
        if (err)
            throw err;
        callback(this);
    });
}

// edit Infor
// { Avatar, Avatar_small, Avatar_normal, Fullname, YearOfBirth
//   Address, Industry, Sex, Contact }
userSchema.methods.editInfor_user     = function(user){
    this.avatar         = user.avatar;
    this.avatar_small   = user.avatar_small;
    this.avatar_normal  = user.avatar_normal;    
    this.userFullname = user.fullname;
    this.year_of_birth  = user.year_of_birth;
    this.address        = user.address;
    this.industry       = user.industry;
    this.sex            = user.sex;
    this.contact        = user.contact;

    return this;
}

userSchema.methods.editInfor_company     = function(company){
    this.logo            = company.logo;
    this.logo_small      = company.logo_small;
    this.logo_normal     = company.logo_normal;    
    this.companyFullname = company.companyFullname;
    this.companyName     = company.companyName;
    this.website         = company.website;
    this.industry        = company.industry;
    this.contact         = company.contact;

    return this;
}

// make new token when login/sign-up
userSchema.methods.makeToken     = function(){
    var token = bcrypt.hashSync((new Date).toString(), bcrypt.genSaltSync(8), null)
    this.token = token;
    return 1;
}

// create the model for users and expose it to our app
module.exports = mongoose.model('users', userSchema);
