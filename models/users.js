// load the things we need
var mongoose        = require('mongoose');
var ObjectId        = mongoose.Schema.Types.ObjectId;
var bcrypt          = require('bcrypt-nodejs');
var domain          = require('./../config/default').domain_default;
var avatar_default  = require('./../config/default').avatar_default;
var logo_default    = require('./../config/default').logo_default;



// define the schema for our user model
var userSchema = mongoose.Schema({

    address          : {
        type         : String,
        default      : ''
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
        access_token :{
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

// make new Infor
userSchema.methods.newInforFb    = function(token, profile, callback){
    this.avatar                  = profile.photos[0].value;
    this.avatar_small            = profile.photos[0].value;
    this.avatar_normal           = profile.photos[0].value;
    this.userName                = profile.displayName;
    this.gender                  = profile.gender;
    this.fb_infor.id             = profile.id;
    this.fb_infor.avatar         = profile.photos[0].value;
    this.fb_infor.gender         = profile.gender;
    this.fb_infor.profileUrl     = profile.profileUrl;  
    this.fb_infor.access_token   = token;
    this.fb_infor.username       = profile.displayName;
    this.fb_infor.email          = profile.emails[0].value;

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
