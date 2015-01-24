// load the things we need
var mongoose     = require('mongoose');
var ObjectId     = mongoose.Schema.Types.ObjectId;
var bcrypt       = require('bcrypt-nodejs');
var domain       = require('./../config/default').domain_default;
var logo_default = require('./../config/default').logo_default;


// define the schema for our company model
var companySchema = mongoose.Schema({

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
        default      : logo_default'
    },  

    companyName      : {
        type         : String,
        required     : true
    },

    companyFullname  : {
        type         : String,
        default      : ''
    },

    address          : {
        type         : String,
        default      : ''
    },

    website          : {
        type         : String,
        default      : ''
    },
   

    contact          : {
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
        logo       : {
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

    myJobs           : [{
        type         : ObjectId,
        ref          : 'jobs'
    }],

    followMes        : [{
        type         : ObjectId,
        ref          : 'talents'
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
companySchema.methods.generateHash = function(password) {
    var password_ = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null); 
    return password_;
};

// checking if password is valid
companySchema.methods.validPassword = function(password) {
    if (this.local_infor.password =='') return 0;         
    return bcrypt.compareSync(password, this.local_infor.password);
};

// check company is Own of account
companySchema.methods.isOwn         = function(company_id){
    return (company_id == this.id);
}

// make new Infor from Facebook
companySchema.methods.newInforFb    = function(logo, company, callback){
    this.type_account           = 1;    // faebook account
    this.logo                 = logo;
    this.logo_small           = logo;
    this.logo_normal          = logo;
    this.companyname             = company.name;
    this.gender                 = company.gender;

    this.fb_infor.id            = company.id;
    this.fb_infor.logo        = logo;
    this.fb_infor.username      = company.name;
    this.fb_infor.gender        = company.gender;
    this.fb_infor.profileUrl    = company.link;
    this.fb_infor.email         = company.email;
    this.fb_infor.access_token  = company.access_token;
    callback(this);
}   


// make new Infor from Email
companySchema.methods.newInforLC    = function(companyName, email, password, callback){
    this.type_account                   = 2;    // faebook account
    this.companyName                    = companyName;
    this.local_infor.password           = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    this.local_infor.email              = email;
    callback(this);
}   

// edit Infor
// { logo, logo_small, logo_normal, Fullname, YearOfBirth
//   Address, Industry, Sex, Contact }
companySchema.methods.editInfor     = function(company){
    this.logo         = company.logo;
    this.logo_small   = company.logo_small;
    this.logo_normal  = company.logo_normal;    
    this.fullname       = company.fullname;
    this.year_of_birth  = company.year_of_birth;
    this.address        = company.address;
    this.industry       = company.industry;
    this.sex            = company.sex;
    this.contact        = company.contact;

    return this;
}

// make new token when login/sign-up
companySchema.methods.makeToken     = function(){
    var token = bcrypt.hashSync((new Date).toString(), bcrypt.genSaltSync(8), null)
    this.token = token;
    return 1;
}

// create the model for companys and expose it to our app
module.exports = mongoose.model('companys', companySchema);
