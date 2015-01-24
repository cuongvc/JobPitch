// load the things we need
var mongoose        = require('mongoose');
var ObjectId        = mongoose.Schema.Types.ObjectId;
var bcrypt          = require('bcrypt-nodejs');
var domain          = require('./../config/default').domain_default;
var avatar_default  = require('./../config/default').avatar_default;


// define the schema for our talent model
var talentSchema = mongoose.Schema({

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

    talentName       : {
        type         : String,
        required     : true
    },

    talentFullname         : {
        type         : String,
        default      : ''
    },

    address          : {
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

    sex              : {
        type         : String
    },

    year_of_birth    : {
        type         : Number,
        default      : null
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

    active                   : {
        type           : Number,
        default        : 1
    },

    contact          : {
        type         : String,
        default      : ''
    },

    myApplications   : [{
        type         : ObjectId,
        ref          : 'applications'
    }],

    follows          : [{
        type         : ObjectId,
        ref          : 'companys'
    }],

    friends          : [{   

        list         : {
            type         : ObjectId,
            ref          : 'talents'
        },

        avatar       : String,
        talentname   : String,
        avatar_small : String
    }],

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

    permission       : {
        type         : Number,
        default      : 0
    },

    token     : {
        type         : String,
        default      : ''
    }

});

// generating a hash
talentSchema.methods.generateHash = function(password) {
    var password_ = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null); 
    return password_;
};

// checking if password is valid
talentSchema.methods.validPassword = function(password) {
    if (this.local_infor.password =='') return 0;         
    return bcrypt.compareSync(password, this.local_infor.password);
};

// check talent is Own of account
talentSchema.methods.isOwn         = function(talent_id){
    return (talent_id == this.id);
}

// make new Infor
talentSchema.methods.newInforFb    = function(avatar, talent, callback){
    this.type_account           = 1;    // faebook account
    this.avatar                 = avatar;
    this.avatar_small           = avatar;
    this.avatar_normal          = avatar;
    this.talentName             = talent.name;
    this.gender                 = talent.gender;

    this.fb_infor.id            = talent.id;
    this.fb_infor.avatar        = avatar;
    this.fb_infor.username      = talent.name;
    this.fb_infor.gender        = talent.gender;
    this.fb_infor.profileUrl    = talent.link;
    this.fb_infor.email         = talent.email;
    this.fb_infor.access_token  = talent.access_token;
    callback(this);
}   

// edit Infor
// { Avatar, Avatar_small, Avatar_normal, Fullname, YearOfBirth
//   Address, Industry, Sex, Contact }
talentSchema.methods.editInfor     = function(talent){
    this.avatar         = talent.avatar;
    this.avatar_small   = talent.avatar_small;
    this.avatar_normal  = talent.avatar_normal;    
    this.talentFullname = talent.fullname;
    this.year_of_birth  = talent.year_of_birth;
    this.address        = talent.address;
    this.industry       = talent.industry;
    this.sex            = talent.sex;
    this.contact        = talent.contact;

    return this;
}

// make new token when login/sign-up
talentSchema.methods.makeToken     = function(){
    var token = bcrypt.hashSync((new Date).toString(), bcrypt.genSaltSync(8), null)
    this.token = token;
    return 1;
}

// create the model for talents and expose it to our app
module.exports = mongoose.model('talents', talentSchema);
