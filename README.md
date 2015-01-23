
## Link POST MAN
```

```
## API
### 1. Login as an talent by facebook
```
POST http://campcoders.com:6969/api/login/talent/facebook 
Content-Type: application/json
Cache-Control: no-cache

{
    {
        "access_token" : "........................."
    }

}
```
##### Regex
```
   'access_token' : access_token for facebook
```
##### Return
```
{
    "error_code": 0,
    "talent": {
        "_id": "54c2842b0fd745...cd3c9b1fbe",
        "talentName": "Cường Vũ",
        "__v": 0,
        "token": "$2a$08$fWTLBrZBkz5cB3ibl1Do1/c.",
        "permission": 0,
        "messages": [],
        "notifications": [],
        "friends": [],
        "follows": [],
        "myApplications": [],
        "contact": "",
        "active": 1,
        "fb_infor": {
            "access_token": "CAAOla..UPs",
            "email": "vcc.bka@gmail.com",
            "profileUrl": "https://www.facebook.com/...1930490924048/",
            "gender": "male",
            "username": "Cường Vũ",
            "avatar": "https://fbcdn-profile-a.ak...2561437_o.jpg",
            "id": "691930490924048"
        },
        "local_infor": {
            "email": "",
            "password": ""
        },
        "type_account": 1,
        "year_of_birth": null,
        "education": "",
        "industry": "",
        "address": "",
        "talentFullname": "",
        "avatar_normal": "https://fbcdn-pr..561437_o.jpg",
        "avatar_small": "https://fbcdn-............jpg",
        "avatar": "https://fbcdn-profile-a.akam....jpg"
    }
}
```

### 2. Signup as a company - email

```
POST http://campcoders.com:6969/api/signup/company/email
Content-Type: application/json
Cache-Control: no-cache

{
    "companyName" : "Campcoders",
    "email"       : "cuongvc93@gmail.com",
    "password"    : "a123456"
}
```
##### Regex
```
   'companyName'    => 'require|max:40|min:6'
   'email'          => 'require'
   'password'       => 'require|min = 6|max = 40'
```
##### Return
```
{
    "error_code": 0,
    "company": {
        "__v": 0,
        "companyName": "Campcoders.com",
        "_id": "54c288430fd745cd3c9b1fbf",
        "token": "$2a$08...o35Cjv74uLRRAxXNmSY6",
        "permission": 0,
        "messages": [],
        "notifications": [],
        "followMes": [],
        "myJobs": [],
        "active": 1,
        "fb_infor": {
            "access_token": "",
            "email": "",
            "profileUrl": "",
            "gender": "",
            "username": "",
            "logo": "",
            "id": ""
        },
        "local_infor": {
            "email": "cuongvc@gmail.com",
            "password": "$2a$08$Bk0GENb5F8...i"
        },
        "type_account": 2,
        "contact": "",
        "website": "",
        "address": "",
        "companyFullname": "",
        "logo_normal": "http://campcoders...go/default-logo.png",
        "logo_small": "http://campcoders.com:6969/.../default-logo.png",
        "logo": "http://campcoders.com:6969/img...fault-logo.png"
    }
}
```

