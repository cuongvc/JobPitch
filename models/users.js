// load the things we need
var mongoose       = require('mongoose');
var searchPlugin   = require('mongoose-search-plugin');


var graph          = require('fbgraph');
var async          = require('async');
var ObjectId       = mongoose.Schema.Types.ObjectId;
var bcrypt         = require('bcrypt-nodejs');
var domain         = require('./../config/default').domain_default;
var avatar_default = require('./../config/default').avatar_default;
var logo_default   = require('./../config/default').logo_default;
var cover_default  = require('./../config/default').cover_default;

if (process.env.USER == 'root')
    var Oauth = require('./../config/Oauth');
else
    var Oauth = require('./../config/Oauth_development');

var client_id_fb = Oauth.facebookAuth.clientID;
var client_secret_fb = Oauth.facebookAuth.clientSecret;
var Permalink       = require('./permalinks');


// define the schema for our user model
var userSchema = mongoose.Schema({

    address: {
        type: String,
        default: ''
    },

    isUser: {
        type: Number,
        default: 1
    },

    location: {
        lat: {
            type: Number
        },

        lng: {
            type: Number
        },

        city: {
            type: String
        },

        country : {
            type : String
        }
    },

    type_account: {
        type: Number,
        default: 1
    },

    local_infor: {
        password: {
            type: String,
            default: ''
        },
        email: {
            type: String,
            default: ''
        }
    },

    fb_infor: {
        id: {
            type: String,
            default: ''
        },
        avatar: {
            type: String,
            default: ''
        },
        username: {
            type: String,
            default: ''
        },
        gender: {
            type: String,
            default: ''
        },
        profileUrl: {
            type: String,
            default: ''
        },
        email: {
            type: String,
            default: ''
        },
        access_token: {
            type: String,
            default: ''
        }
    },

    twitter_infor: {
        id: {
            type: String,
            default: ''
        },
        avatar: {
            type: String,
            default: ''
        },
        username: {
            type: String,
            default: ''
        },
        gender: {
            type: String,
            default: ''
        },
        profileUrl: {
            type: String,
            default: ''
        },
        email: {
            type: String,
            default: ''
        },
        access_token: {
            type: String,
            default: ''
        },
        token_secret: {
            type: String,
            default: ''
        }
    },

    linkedin_infor: {
        id: {
            type: String,
            default: ''
        },
        avatar: {
            type: String,
            default: ''
        },
        username: {
            type: String,
            default: ''
        },
        gender: {
            type: String,
            default: ''
        },
        profileUrl: {
            type: String,
            default: ''
        },
        email: {
            type: String,
            default: ''
        },
        access_token: {
            type: String,
            default: ''
        }
    },

    google_infor: {
        id: {
            type: String,
            default: ''
        },
        avatar: {
            type: String,
            default: ''
        },
        username: {
            type: String,
            default: ''
        },
        gender: {
            type: String,
            default: ''
        },
        profileUrl: {
            type: String,
            default: ''
        },
        email: {
            type: String,
            default: ''
        },
        access_token: {
            type: String,
            default: ''
        }
    },

    contact: {
        type: String,
        default: ''
    },

    notifications: {

        unread: {
            type: Number,
            default: 0
        },

        list: [{
            type: ObjectId,
            ref: 'notifications',
            default: []
        }],

        default : {
            unread : 0,
            list : []
        }

    },

    messages: [{

        unread: {
            type: Number,
            default: 0
        },

        list: [{
            type: ObjectId,
            ref: 'messages'
        }]

    }],

    token: {
        type: String,
        default: ''
    },

    score : {
        type : Number,
        default : 0
    },

    permission: {
        type: Number,
        default: 0
    },

    active: {
        type: Number,
        default: 1
    },

    companyName: {
        type: String
    },

    companyFullname: {
        type: String,
        default: ''
    },

    website: {
        type: String,
        default: ''
    },

    followMes: [{
        type: ObjectId,
        ref: 'users'
    }],


    myJobs: [{
        type: ObjectId,
        ref: 'jobs'
    }],

    myApplications: [{
        type: ObjectId,
        ref: 'applications'
    }],

    myFollows: [{
        type: ObjectId,
        ref: 'users'
    }],

    friends: [{

        list: {
            type: ObjectId,
            ref: 'users'
        }
    }],

    avatar: {
        type: String,
        default: avatar_default
    },

    avatar_small: {
        type: String,
        default: avatar_default
    },

    avatar_normal: {
        type: String,
        default: avatar_default
    },

    cover           : {
        type    : String,
        default : cover_default
    },

    cover_small     : {
        type    : String,
        default : cover_default
    },

    cover_normal    : {
        type    : String,
        default : cover_default
    },

    userName: {
        type: String
    },

    tagName : {
        type: String,
        index : true
    },

    userFullname: {
        type: String,
        default: ''
    },


    industry: {
        type: String,
        default: ''
    },

    education: {
        type: String,
        default: ''
    },

    gender: {
        type: String
    },

    year_of_birth: {
        type: Number,
        default: null
    },

    email: {
        type: String,
        default: ''
    },

    // verify = 0 : not verify
    verify: {
        type: Number,
        default: 0
    },

    skype: {
        type: String,
        default: ''
    },

    phone: {
        type: String,
        default: ''
    },

    companyEmail: {
        type: String,
        default: ''
    },

    interests: {
        number: {
            type: Number,
            default: 0
        },
        list: [{
            type: ObjectId,
            ref: 'users'
        }]
    },

    contracts: {
        number: {
            type: Number,
            default: 0
        },
        list: [{
            type: ObjectId,
            ref: 'contract'
        }]
    },

    moreInfor : [{
        title : String,
        value : String
    }]

});


var options = {
    keywordsPath: '_keywords', // path for keywords, `_keywords` as default 
    relevancePath: '_relevance', // path for relevance number, '_relevance' as default 
    fields: ['userName', 'email'], // array of fields to use as keywords (can be String or [String] types), 
    stemmer: 'PorterStemmer', // natural stemmer, PorterStemmer as default 
    // distance: 'JaroWinklerDistance' // distance algorythm, JaroWinklerDistance as default 
    distance: 'LevenshteinDistance' // distance algorythm, JaroWinklerDistance as default 
};

userSchema.plugin(searchPlugin, options);


// ======================== VERIFY =======================================

userSchema.methods.Verify = function(skype, phone, companyEmail, callback) {
    var user = this;
    user.skype = skype,
        user.phone = phone;
    user.companyEmail = companyEmail;
    user.save(function(err) {
        callback(user);
    });
}

// ======================== LOCAL INFOR =======================================

userSchema.methods.newInforLc = function(name, email, password, isUser, callback) {
              
    var user = this;
    user.email = email;
    user.local_infor.email = email;
    user.local_infor.password = user.generateHash(password);
    user.isUser = isUser;
    var newPermalink = new Permalink();

    if (isUser) {
        user.userName = name;
        newPermalink.newInfor(user._id, '', 1, user.userName, function(){ 
            user.permalink = newPermalink.permalink;
            callback(user);
        });  
    } else {
        user.companyName = name;
        newPermalink.newInfor(user._id, '', 1, user.companyName, function(){ 
            user.permalink = newPermalink.permalink;
            callback(user);
        });  

    };
}

// generating a hash
userSchema.methods.generateHash = function(password) {
    var password_ = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    return password_;
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    if (this.local_infor.password == '') return 0;
    return bcrypt.compareSync(password, this.local_infor.password);
};

// check user is Own of account
userSchema.methods.isOwn = function(user_id) {
    return (user_id == this.id);
}

// ======================== FACEBOOK INFOR ====================================

function API_FB(api, callback) {
    var options = {
        timeout: 6969,
        pool: {
            maxSockets: Infinity
        },
        headers: {
            connection: "keep-alive"
        }
    };
    graph
        .setOptions(options)
        .get(api, function(err, data) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
}

userSchema.methods.getAvatarFb = function(access_token, callback) {

    var profile;
    var avatar, avatar_small, avatar_normal;
    var options = {
        timeout: 6969,
        pool: {
            maxSockets: Infinity
        },
        headers: {
            connection: "keep-alive"
        }
    };

    graph.setAccessToken(access_token);
    graph.extendAccessToken({
        "access_token": access_token,
        "client_id": client_id_fb,
        "client_secret": client_secret_fb
    }, function(err, facebookRes) {
        if (err) {
            console.log('Error : ', err);
            callback('', '', '');
            return 0;
        }

        async.waterfall([
            function(next) {
                API_FB("me?fields=picture.width(800).height(800)&redirect=false", function(err, data) {
                    if (err) {
                        console.log(err);
                        next(err);
                    } else {
                        avatar = data.picture.data.url; // GET AVATAR
                        avatar_normal = data.picture.data.url;
                        next(null);
                    }
                });
            },

            function(next) {
                API_FB("me?fields=picture.width(200).height(200)&redirect=false", function(err, data) {
                    if (err) {
                        console.log(err);
                        next(err);
                    } else {
                        avatar_small = data.picture.data.url;
                        next(null);
                    }
                });
            }

        ], function(err) {
            if (err) {
                console.log(err);
                return 0;
            };
            callback(avatar, avatar_normal, avatar_small);
        });
    });
}

// ======================== EDIT PROFILE ====================================
userSchema.methods.editProfile = function(address, contact, website, avatar, avatar_small, 
    avatar_normal, companyName, skype, phone, companyEmail,
    userFullname, industry, education, year_of_birth, moreInfor, callback) {

    this.address = address;
    this.contact = contact;
    this.website = website;
    this.companyName = companyName;
    this.userFullname = userFullname;
    this.industry = industry;
    this.education = education;
    this.year_of_birth = year_of_birth;
    this.skype = skype;
    this.phone = phone;
    this.companyEmail = companyEmail;
    this.moreInfor = moreInfor;

    if (avatar != '') {
        this.avatar = avatar;
        this.avatar_normal = avatar_normal;
        this.avatar_small = avatar_small;
    };

    console.log('callback this');
    callback(this);
}

// ======================== FACEBOOK INFOR ====================================


// make new Infor
userSchema.methods.newInforFb = function(access_token, profile, callback) {
    user = this;
    this.getAvatarFb(access_token, function(avatar, avatar_normal, avatar_small) {

        user.avatar = avatar;
        user.avatar_small = avatar_small;
        user.avatar_normal = avatar_normal;
        user.type_account = 2;
        user.userName = profile.displayName;
        user.gender = profile.gender;
        user.email = profile.emails[0].value;
        user.fb_infor.avatar = avatar_normal;
        user.fb_infor.id = profile.id;
        user.fb_infor.gender = profile.gender;
        user.fb_infor.profileUrl = profile.profileUrl;
        user.fb_infor.access_token = access_token;
        user.fb_infor.username = profile.displayName;
        user.fb_infor.email = profile.emails[0].value;
        console.log("USER._ID : ", user._id)

        var newPermalink = new Permalink();
        newPermalink.newInfor(user._id, '', 1, user.userName, function(){
            user.permalink = newPermalink;
            user.makeToken();
            user.save(function(err) {
                if (err)
                    throw err;
                callback(user);
            });
        });

    });
}


// ======================== TWITTER INFOR ====================================

userSchema.methods.newInforTw = function(access_token, token_secret, profile, callback) {
    console.log('PROFILE :', profile, ' access_token : ', access_token, ' token_secret : ', token_secret);

    var user = this;
    user.userName = profile.displayName;
    user.avatar = profile._json.profile_image_url;
    user.avatar_small = profile._json.profile_image_url;
    user.avatar_normal = profile._json.profile_image_url;
    user.type_account = 3;

    user.twitter_infor.id = profile.id;
    user.twitter_infor.access_token = access_token;
    user.twitter_infor.token_secret = token_secret;
    user.twitter_infor.username = profile.displayName;

    var newPermalink = new Permalink();
    newPermalink.newInfor(user._id, '', 1, user.userName, function(){
        user.permalink = newPermalink;
        user.makeToken();
        user.save(function(err) {
            if (err)
                throw err;
            callback(user);
        });
    });
}

// ======================== GOOGLE INFOR ====================================
userSchema.methods.newInforGg = function(access_token, profile, callback) {
    var user = this;
    user.userName = profile.displayName;
    user.avatar = profile._json.picture;
    user.avatar_small = profile._json.picture;
    user.avatar_normal = profile._json.picture;
    user.gender = profile._json.gender;
    user.type_account = 4;
    user.email = profile.emails[0].value;

    user.google_infor.id = profile.id;
    user.google_infor.access_token = access_token;
    user.google_infor.username = profile.displayName;
    user.google_infor.gender = profile.gender;
    user.google_infor.avatar = profile._json.picture;
    user.google_infor.email = profile.emails[0].value;
    user.google_infor.profileUrl = profile._json.link;

    var newPermalink = new Permalink();
    newPermalink.newInfor(user._id, '', 1, user.userName, function(){
        user.permalink = newPermalink;
        user.makeToken();
        user.save(function(err) {
            if (err)
                throw err;
            callback(user);
        });
    });}


// ======================== LINKEDIN INFOR ====================================
userSchema.methods.newInforLk = function(access_token, profile, callback) {
    var user = this;
    user.avatar = profile.photos[0];
    user.avatar_small = profile.photos[0];
    user.avatar_normal = profile.photos[0];
    user.linkedin_infor.avatar = profile.photos[0];

    user.userName = profile.displayName;
    user.gender = profile._json.gender;
    user.type_account = 5;
    user.email = profile.emails[0].value;

    user.linkedin_infor.id = profile.id;
    user.linkedin_infor.access_token = access_token;
    user.linkedin_infor.username = profile.displayName;
    user.linkedin_infor.gender = profile.gender;
    user.linkedin_infor.email = profile.emails[0].value;
    user.linkedin_infor.profileUrl = profile._json.publicProfileUrl;

    var newPermalink = new Permalink();
    newPermalink.newInfor(user._id, '', 1, user.userName, function(){
        user.permalink = newPermalink;
        user.makeToken();
        user.save(function(err) {
            if (err)
                throw err;
            callback(user);
        });
    });}


// ======================== EDIT INFOR ====================================

// edit Infor
// { Avatar, Avatar_small, Avatar_normal, Fullname, YearOfBirth
//   Address, Industry, Sex, Contact }
userSchema.methods.editInfor_user = function(user) {
    this.avatar = user.avatar;
    this.avatar_small = user.avatar_small;
    this.avatar_normal = user.avatar_normal;
    this.userFullname = user.fullname;
    this.year_of_birth = user.year_of_birth;
    this.address = user.address;
    this.industry = user.industry;
    this.sex = user.sex;
    this.contact = user.contact;

    return this;
}


// ================= MAKE TOKEN ===========================================


// make new token when login/sign-up
userSchema.methods.makeToken = function() {
    var token = bcrypt.hashSync((new Date).toString(), bcrypt.genSaltSync(8), null)
    this.token = token;
    return 1;
}

// ================= ADD JOB, APPLICATION, INTEREST, CONTRACT ===============

userSchema.methods.addJob = function(job_id) {
    this.myJobs.push(job_id);
    this.score ++;
    this.save(function(err) {
        return 0;
    });
}

userSchema.methods.addApply = function(app_id, callback) {
    this.myApplications.push(app_id);
    this.save(function(err) {
        callback();
    });
}

userSchema.methods.addInterest = function(user_id, callback) {
    if (this.interests.list.indexOf(user_id) == -1) {
        this.interests.list.push(user_id);
        this.interests.number++;
        this.save(function(err) {
            callback();
        })
    } else {
        callback();
    }
}

userSchema.methods.addContract = function(contract, callback) {
    if (this.contracts.list.indexOf(contract._id) == -1) {
        this.contracts.list.push(contract._id);
        this.contracts.number++;
        this.save(function(err) {
            callback();
        })
    } else {
        callback();
    }
}

userSchema.methods.addMyFollow = function(user_id, callback) {
    if (this.myFollows.indexOf(user_id) == -1) {
        this.myFollows.push(user_id);
        this.save(function(err) {
            callback();
        })
    } else {
        console.log('remove from my follow');

        this.myFollows.splice(this.myFollows.indexOf(user_id), 1);
        this.save(function(err) {
            callback();
        })

    }
}


userSchema.methods.addFollowMe = function(user_id, callback) {
    if (this.followMes.indexOf(user_id) == -1) {
        this.followMes.push(user_id);
        this.score ++;
        this.save(function(err) {
            callback();
        })
    } else {
        console.log('remove from follow me');
        this.score --;
        this.followMes.splice(this.followMes.indexOf(user_id), 1);
        this.save(function(err) {
            callback();
        })

    }
}


// create the model for users and expose it to our app
module.exports = mongoose.model('users', userSchema);
