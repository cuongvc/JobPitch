## API hoan thanh:
    
```
    Comment, like, interest, hire, change status job, follow, get users ( 
        get users la api de hien thi nhung nguoi like, interest, follow)

```

## Link POST MAN
```
    https://www.getpostman.com/collections/a45c5431e086afb6762d

```
## API


### 1. Upload photo

```
POST http://jobpitch.campcoders.com/api/upload_photo
Content-Type: form-data
Cache-Control: no-cache

{
    "image"         : FILE,
    "x"             : 0,
    "y"             : 0,
    "height"        : 500,
    "width"         : 600
}

x, y,height, width la optional
```

##### Regex

```
    file        : File

```

##### Return

```
{
    "error_code": 0,
    "path": "/tmp/upload_f2ffeff9cfb68e0e8bbac882f01e538b",
    "extension": "jpeg"
}

```

### 2. Create Job

```
POST http://jobpitch.campcoders.com/api/create_job
Content-Type: application/json
Cache-Control: no-cache
{
    "token"         : "$2a$08$X0jvCjP..Sa",
    "user_id"       : "54c8580e86d5ce565ceb3168",
    "desc"          : "Qu....................n",
    "title"         : "nhân sự",
    "hash_tag"      : ["HR", "Campcoders.com"],
    "link_direct"   : "this is link_direct",

    "address"       : 'Khu Đô Thị Nam Thăng Long, Phú Thượng, Tây Hồ, Hà Nội, Việt Nam',
    "position"      : 
       { "lat": 21.0721265,
         "lng": 105.81098910000003,
         "formatted_address": 'Khu Đô Thị Nam Thăng Long, Phú Thượng, Tây Hồ, Hà Nội, Việt Nam',
         "state": { long_name: 'Hà Nội', short_name: 'Hà Nội', types: [Object] },
         "country": { long_name: 'Việt Nam', short_name: 'VN', types: [Object] },
         "city": '' 
        },

    "temp_path"     : "/tmp/upload_fcfb4234b9a58ed1052b53a8e30dca92",
    "extension"     : "jpeg",

    "phone"         : "01674251748",
    "skype"         : "cuongvc93",
    "companyEmail"  : "campcoders@campcoders.com"
}

    temp_path va extension la tu api upload_photo
    phone, skype, companyEmail la optional

```

##### Regex

```
    address     : Suggest of Google
    link_direct : url
    Tat ca thong tin deu la require, tru link_direct, temp_path, extension. 
    Neu khong gui thong tin thi gui voi gia tri la ''.

```

##### Return

```
{
    "error_code": 0,
    "job": {
        "__v": 0,
        "time": "Wed Jan 28 2015 13:44:16 GMT-0500 (EST)",
        "user_id": "54c8580e86d5ce565ceb3168",
        "_id": "54c92e026145bc0a616cefb1",
        "hires": 0,
        "interviews": 0,
        "applications": {
            "list": [],
            "number": 0
        },
        "shares": {
            "list": [],
            "number": 0
        },
        "likes": {
            "list": [],
            "number": 0
        },
        "status": 1,
        "link_direct": "http://campcoders.com",
        "location": {
            "address": "Ha Noi, Viet Nam",
            "lng": 100,
            "lat": 100
        },
        "description": "..........................n",
        "hash_tag": [
            "HR",
            "Campcoders.com"
        ],
        "title": "nhân sự",
        "image_normal": "http://jobpitch.campcoders.c....2470922792.jpeg",
        "image_small": "http://jobpitch.campcoder....422470922792.jpeg",
        "image": "http://jobpitch.campcoders.co.............22792.jpeg"
    }
}

```

### 3. Edit Job

```
POST http://jobpitch.campcoders.com/api/edit_job
Content-Type: form-data
Cache-Control: no-cache

{
    "token"             : "$2a$08$cuGGBSy7CZOhCrnr5rrdhOwayH6Ka1rJdw91St8K/tvvVE2e/0kSy",
    "user_id"           : "54eef31ef87632e72c4db927",
    "type_account"      : "1",
    "extension"         : "jpeg",
    "address"           : "9 Nguyên Hồng, Thành Công, Ba Đình, Hà Nội, Việt Nam",
    "contact"           : "",
    "website"           : "",
    "companyName"       : "",
    "avatar"            : "",
    "userFullname"      : "",
    "industry"          : "",
    "education"         : "",
    "year_of_birth"     : "",
    "skype"             : "campcoder",
    "phone"             : "0987654321",
    "companyEmail"      : "thanhah@campcoders.com",
}

Tat ca cac truong khong sua doi thi gui noi dung cu. Neu khong upload image 
moi thì temp_path và extension = ''. Neu upload image moi thi gui tuong tu 
create job

```

##### Regex

```
    address     : Suggest of Google
    link_direct : url

```

##### Return

```
{
    "error_code": 0,
    "job": {
        "__v": 7,
        "_id": "54ca75ac393d050028ce49d9",
        "time": "2015-01-29T18:02:19.000Z",
        "user_id": "54c9ee7a202b449e430cc43b",
        "hires": 0,
        "interviews": 0,
        "applications": {
            "list": [
                "54ca76b969b8c7b729d50edc",
                "54ca76cb69b8c7b729d50edd"
            ],
            "number": 2
        },
        "shares": {
            "list": [],
            "number": 0
        },
        "likes": {
            "list": [],
            "number": 0
        },
        "status": 1,
        "link_direct": "http://campcoders.com",
        "location": {
            "address": "Ngõ 34 - Nguyên Hồng, Láng Hạ, Đống Đa, Hà Nội, Việt Nam",
            "lng": 105.810339,
            "lat": 21.016481
        },
        "description": "Quản lý toàn bộ công tác tuyển dụng nhân sự - Hỗ trợ thực hiện các hoạt động đào tạo và tái đào tạo- Quản lý giám sát hoạt động nhân sự trong Khách Sạn- Xây dựng, quản lý, tổ chức và thực hiện các chính sách nhân sự cho nhân viên theo quy định của Khách Sạn",
        "hash_tag": [
            "HR",
            "Campcoders.com"
        ],
        "title": "nhân sự",
        "userName": "Coders Camp",
        "image_normal": "http://job.dev/images/normal_size/JobImages/1422555163758.jpeg",
        "image_small": "http://job.dev/images/small_size/JobImages/1422555163758.jpeg",
        "image": "http://job.dev/images/full_size/JobImages/1422555163758.jpeg"
    },
    "app": [
        {
            "time": "2015-01-29T18:06:49.000Z",
            "job_id": "54ca75ac393d050028ce49d9",
            "user_avatar": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg",
            "user_name": "eMenu Admin",
            "user_id": "54c9ee8b202b449e430cc43c",
            "_id": "54ca76b969b8c7b729d50edc",
            "__v": 0,
            "hires": 0,
            "interviews": 0,
            "shares": {
                "list": [],
                "number": 0
            },
            "likes": {
                "list": [],
                "number": 0
            },
            "description": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "hash_tag": [
                "php",
                "nodejs",
                "android"
            ],
            "title": "I can do it"
        },
        {
            "time": "2015-01-29T18:07:07.000Z",
            "job_id": "54ca75ac393d050028ce49d9",
            "user_avatar": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg",
            "user_name": "eMenu Admin",
            "user_id": "54c9ee8b202b449e430cc43c",
            "_id": "54ca76cb69b8c7b729d50edd",
            "__v": 0,
            "hires": 0,
            "interviews": 0,
            "shares": {
                "list": [],
                "number": 0
            },
            "likes": {
                "list": [],
                "number": 0
            },
            "description": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "hash_tag": [
                "php",
                "nodejs",
                "android"
            ],
            "title": "I can do it"
        }
    ]
}

```



### 4. JobDetail

```
POST http://jobpitch.campcoders.com/api/job_detail
Content-Type: application/json
Cache-Control: no-cache

{
    "token"         : "$2a$08$X0jvCjP377cp5eqPAwVvr.AssoagMvMBs0YG576LUMZFDSa",
    "user_id"       : "54c8580e86d5ce565ceb3168",
    "job_id"         : "54c8580e86d5ce565ceb3168"
}

** Chi la chu cua job moi co quyen nhin duoc list interview. Nhung application
co trong list interview duoc danh dau mau khac **

```
##### Regex
```
    job_id           : id of Job
    du lieu tra ve co them object app : cac application cua job

```
##### Return
```
{
    "error_code": 0,
    "job": {
        "__v": 7,
        "_id": "54ca75ac393d050028ce49d9",
        "time": "2015-01-29T18:02:19.000Z",
        "user_id": "54c9ee7a202b449e430cc43b",
        "hires": 0,
        "interviews": 0,
        "applications": {
            "list": [
                "54ca76b969b8c7b729d50edc",
                "54ca76cb69b8c7b729d50edd"
            ],
            "number": 2
        },
        "shares": {
            "list": [],
            "number": 0
        },
        "likes": {
            "list": [],
            "number": 0
        },
        "status": 1,
        "link_direct": "http://campcoders.com",
        "location": {
            "address": "Ngõ 34 - Nguyên Hồng, Láng Hạ, Đống Đa, Hà Nội, Việt Nam",
            "lng": 105.810339,
            "lat": 21.016481
        },
        "description": "Quản lý toàn bộ công tác tuyển dụng nhân sự - Hỗ trợ thực hiện các hoạt động đào tạo và tái đào tạo- Quản lý giám sát hoạt động nhân sự trong Khách Sạn- Xây dựng, quản lý, tổ chức và thực hiện các chính sách nhân sự cho nhân viên theo quy định của Khách Sạn",
        "hash_tag": [
            "HR",
            "Campcoders.com"
        ],
        "title": "nhân sự",
        "userName": "Coders Camp",
        "image_normal": "http://job.dev/images/normal_size/JobImages/1422555163758.jpeg",
        "image_small": "http://job.dev/images/small_size/JobImages/1422555163758.jpeg",
        "image": "http://job.dev/images/full_size/JobImages/1422555163758.jpeg"
    },
    "app": [
        {
            "time": "2015-01-29T18:06:49.000Z",
            "job_id": "54ca75ac393d050028ce49d9",
            "user_avatar": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg",
            "user_name": "eMenu Admin",
            "user_id": "54c9ee8b202b449e430cc43c",
            "_id": "54ca76b969b8c7b729d50edc",
            "__v": 0,
            "hires": 0,
            "interviews": 0,
            "shares": {
                "list": [],
                "number": 0
            },
            "likes": {
                "list": [],
                "number": 0
            },
            "description": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "hash_tag": [
                "php",
                "nodejs",
                "android"
            ],
            "title": "I can do it"
        },
        {
            "time": "2015-01-29T18:07:07.000Z",
            "job_id": "54ca75ac393d050028ce49d9",
            "user_avatar": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg",
            "user_name": "eMenu Admin",
            "user_id": "54c9ee8b202b449e430cc43c",
            "_id": "54ca76cb69b8c7b729d50edd",
            "__v": 0,
            "hires": 0,
            "interviews": 0,
            "shares": {
                "list": [],
                "number": 0
            },
            "likes": {
                "list": [],
                "number": 0
            },
            "description": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "hash_tag": [
                "php",
                "nodejs",
                "android"
            ],
            "title": "I can do it"
        }
    ]
}
```

### 5. Recent

```
POST http://jobpitch.campcoders.com/api/recent
Content-Type: application/json
Cache-Control: no-cache

{
    "token"         : "$2a$08$X0jvCjP37...0YG576LUMZFDSa",
    "user_id"       : "54c8580e86d5ce565ceb3168",
    "tag"           : "HR",
    "skip"          : 0,
    "limit"         : 50
}

    + tag : filter job theo tag

```
##### Regex
```

```
##### Return
```
{
    "error_code": 0,
    "jobs": [
        {
            "time": "Wed Jan 28 2015 14:13:47 GMT-0500 (EST)",
            "user_id": "54c8580e86d5ce565ceb3168",
            "_id": "54c934eb6e0f58580882aef5",
            "__v": 0,
            "hires": 0,
            "interviews": 0,
            "applications": {
                "list": [],
                "number": 0
            },
            "shares": {
                "list": [],
                "number": 0
            },
            "likes": {
                "list": [],
                "number": 0
            },
            "status": 1,
            "link_direct": "http://campcoders.com",
            "location": {
                "address": "Ngõ 34 - Nguyên Hồng, Láng Hạ, Đống Đa, Hà Nội, Việt Nam",
                "lng": 105.811434,
                "lat": 21.021641
            },
            "description": "Quản lý toàn bộ công tác tuyển dụng nhân sự - Hỗ trợ thực hiện các hoạt động đào tạo và tái đào tạo- Quản lý giám sát hoạt động nhân sự trong Khách Sạn- Xây dựng, quản lý, tổ chức và thực hiện các chính sách nhân sự cho nhân viên theo quy định của Khách Sạn",
            "hash_tag": [
                "HR",
                "Campcoders.com"
            ],
            "title": "nhân sự",
            "image_normal": "http://jobpitch.campcoders.com/images/full_size/JobImages/default-image.png",
            "image_small": "http://jobpitch.campcoders.com/images/full_size/JobImages/default-image.png",
            "image": "http://jobpitch.campcoders.com/images/full_size/JobImages/default-image.png"
        },
        {
            "time": "Wed Jan 28 2015 13:59:06 GMT-0500 (EST)",
            "user_id": "54c8580e86d5ce565ceb3168",
            "_id": "54c9317bacfb68017b94a021",
            "__v": 0,
            "hires": 0,
            "interviews": 0,
            "applications": {
                "list": [],
                "number": 0
            },
            "shares": {
                "list": [],
                "number": 0
            },
            "likes": {
                "list": [],
                "number": 0
            },
            "status": 1,
            "link_direct": "http://campcoders.com",
            "location": {
                "address": "Ngõ 34 - Nguyên Hồng, Láng Hạ, Đống Đa, Hà Nội, Việt Nam",
                "lng": 105.810339,
                "lat": 21.016481
            },
            "description": "Quản lý toàn bộ công tác tuyển dụng nhân sự - Hỗ trợ thực hiện các hoạt động đào tạo và tái đào tạo- Quản lý giám sát hoạt động nhân sự trong Khách Sạn- Xây dựng, quản lý, tổ chức và thực hiện các chính sách nhân sự cho nhân viên theo quy định của Khách Sạn",
            "hash_tag": [
                "HR",
                "Campcoders.com"
            ],
            "title": "nhân sự",
            "image_normal": "http://jobpitch.campcoders.com/images/normal_size/JobImages/1422471783441.jpeg",
            "image_small": "http://jobpitch.campcoders.com/images/small_size/JobImages/1422471783441.jpeg",
            "image": "http://jobpitch.campcoders.com/images/full_size/JobImages/1422471783441.jpeg"
        }
    ]
}

```

### 6. Apply

```
POST http://jobpitch.campcoders.com/api/apply
Content-Type: application/json
Cache-Control: no-cache

{
    "token"         : "$2a$08$YR8X4MB32LnXHJrYdZ32EekzXWwD6PvPLupOvDXtHSl50ThbO1mya",
    "user_id"       : "54cef3ee162f8f5428d2323b",
    "job_id"         : "54cf85e0d6f0cebb214ed28d",
    "title"          : "I can do it",
    "description"    : "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "hash_tag"       : ["Php", "Nodejs", "Android", "Campcoders.com"],
    "file"           :    "http://job.dev/files/1422888466125.pdf"
}

```
##### Regex
```
    job_id           : id of Job
    file             : link lay tu api 14 : upload file. Neu khong co file thi de bang "".

```
##### Return
```
{
    "error_code": 0,
    "application": {
        "__v": 0,
        "time": "2015-02-02T14:39:21.000Z",
        "job_id": "54cf85e0d6f0cebb214ed28d",
        "user_avatar": "http://job.dev/images/full_size/TalentImages/default-avatar.png",
        "user_name": "CuongVC93",
        "user_id": "54cef3ee162f8f5428d2323b",
        "_id": "54cf8c197fc2296d294781a9",
        "hires": 0,
        "interviews": 0,
        "shares": {
            "list": [],
            "number": 0
        },
        "likes": {
            "list": [],
            "number": 0
        },
        "file": "http://job.dev/files/1422888466125.pdf",
        "description": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "hash_tag": [
            "Php",
            "Nodejs",
            "Android",
            "Campcoders.com"
        ],
        "title": "I can do it"
    }
}
```

### 7. Edit profile

```
POST http://jobpitch.campcoders.com/api/edit_profile
Content-Type: application/json
Cache-Control: no-cache


{
    "token"             : "$2a$08$cuGGBSy7CZOhCrnr5rrdhOwayH6Ka1rJdw91St8K/tvvVE2e/0kSy",
    "user_id"           : "54eef31ef87632e72c4db927",
    "type_account"      : "1",
    "extension"         : "jpeg",
    "address"           : "9 Nguyên Hồng, Thành Công, Ba Đình, Hà Nội, Việt Nam",
    "contact"           : "",
    "website"           : "",
    "companyName"       : "",
    "avatar"            : "",
    "userFullname"      : "",
    "industry"          : "",
    "education"         : "",
    "year_of_birth"     : "",
    "skype"             : "campcoder",
    "phone"             : "0987654321",
    "companyEmail"      : "thanhah@campcoders.com",
    "tagname"           : "cuongvu_123",
    "summary"           : "summary",
    "specialties"       : "specialties"
}

    token, user_id, type_account, address, contact is require

    companyName, website for company
    fullname, year_of_birth, job for user

```
##### Regex
```
    

```
##### Return
```
{
    "error_code": 0,
    "user": {
        "__v": 0,
        "_id": "54eef31ef87632e72c4db927",
        "companyName": "",
        "gender": "male",
        "specialties": "specialties",
        "summary": "summary",
        "tagname": "cuongvu_123",
        "userName": "Cường Vũ",
        "_keywords": [
            "c",
            "ng",
            "v",
            "cuongvc93",
            "gmail",
            "com"
        ],
        "contracts": {
            "list": [],
            "number": 0
        },
        "interests": {
            "list": [],
            "number": 0
        },
        "companyEmail": "thanhah@campcoders.com",
        "phone": "0987654321",
        "skype": "campcoder",
        "verify": 0,
        "email": "cuongvc93@gmail.com",
        "year_of_birth": null,
        "education": "",
        "industry": "",
        "userFullname": "",
        "cover_normal": "http://job.dev/images/full_size/UserImages/default-cover.jpeg",
        "cover_small": "http://job.dev/images/full_size/UserImages/default-cover.jpeg",
        "cover": "http://job.dev/images/full_size/UserImages/default-cover.jpeg",
        "avatar_normal": "https://lh5.googleusercontent.com/-IlI6TyJIlrs/AAAAAAAAAAI/AAAAAAAAAC8/AsmFVAZBIkw/photo.jpg",
        "avatar_small": "https://lh5.googleusercontent.com/-IlI6TyJIlrs/AAAAAAAAAAI/AAAAAAAAAC8/AsmFVAZBIkw/photo.jpg",
        "avatar": "https://lh5.googleusercontent.com/-IlI6TyJIlrs/AAAAAAAAAAI/AAAAAAAAAC8/AsmFVAZBIkw/photo.jpg",
        "friends": [],
        "myFollows": [],
        "myApplications": [],
        "myJobs": [],
        "followMes": [],
        "website": "",
        "companyFullname": "",
        "active": 1,
        "permission": 0,
        "score": 0,
        "token": "$2a$08$cuGGBSy7CZOhCrnr5rrdhOwayH6Ka1rJdw91St8K/tvvVE2e/0kSy",
        "messages": [],
        "notifications": {
            "default": {
                "list": []
            },
            "list": [],
            "unread": 0
        },
        "contact": "",
        "google_infor": {
            "access_token": "ya29.JgFFk8o2kCVM2-Njtps2emsAym0ljglN_DorrGZrSeW8wVQCqyUDQlLJ6gDYLvp3LZRRfXcy7J-S2g",
            "email": "cuongvc93@gmail.com",
            "profileUrl": "https://plus.google.com/116647846410186673378",
            "gender": "",
            "username": "Cường Vũ",
            "avatar": "https://lh5.googleusercontent.com/-IlI6TyJIlrs/AAAAAAAAAAI/AAAAAAAAAC8/AsmFVAZBIkw/photo.jpg",
            "id": "116647846410186673378"
        },
        "linkedin_infor": {
            "access_token": "",
            "email": "",
            "profileUrl": "",
            "gender": "",
            "username": "",
            "avatar": "",
            "id": ""
        },
        "twitter_infor": {
            "token_secret": "",
            "access_token": "",
            "email": "",
            "profileUrl": "",
            "gender": "",
            "username": "",
            "avatar": "",
            "id": ""
        },
        "fb_infor": {
            "access_token": "",
            "email": "",
            "profileUrl": "",
            "gender": "",
            "username": "",
            "avatar": "",
            "id": ""
        },
        "local_infor": {
            "email": "",
            "password": ""
        },
        "type_account": 4,
        "isUser": 1,
        "address": "9 Nguyên Hồng, Thành Công, Ba Đình, Hà Nội, Việt Nam"
    }
}
```

### 8. View my jobs

```
POST http://jobpitch.campcoders.com/api/my_jogs
Content-Type: application/json
Cache-Control: no-cache

{
    "token"         : "$2a$08$OsMl...Z18lwH5rFMrcGLIwwxLPgupq.",
    "user_id"       : "54cba60d3bbfb7d437d6c512"
}

```
##### Regex
```
    

```
##### Return
```
{
    "error_code": 0,
    "jobs": [
        {
            "__v": 14,
            "_id": "54cbac4e28837ea23ba88d22",
            "time": "2015-01-30T16:07:40.000Z",
            "user_id": "54cba60d3bbfb7d437d6c512",
            "hires": 0,
            "interviews": 0,
            "applications": {
                "list": [
                    "54cbada928837ea23ba88d25",
                    "54cbadb528837ea23ba88d26",
                    "54cbadb728837ea23ba88d27",
                    "54cbadb728837ea23ba88d28",
                    "54cbadb828837ea23ba88d29",
                    "54cbadb828837ea23ba88d2a",
                    "54cbadb928837ea23ba88d2b",
                    "54cbadb928837ea23ba88d2c",
                    "54cbadb928837ea23ba88d2d",
                    "54cbadb928837ea23ba88d2e",
                    "54cbadb928837ea23ba88d2f",
                    "54cbadb928837ea23ba88d30"
                ],
                "number": 12
            },
            "shares": {
                "list": [],
                "number": 0
            },
            "likes": {
                "list": [],
                "number": 0
            },
            "status": 1,
            "link_direct": "http://campcoders.com",
            "location": {
                "address": "Ngõ 34 - Nguyên Hồng, Láng Hạ, Đống Đa, Hà Nội, Việt Nam",
                "lng": 105.810339,
                "lat": 21.016481
            },
            "description": "Quản lý toàn bộ công tác tuyển dụng nhân sự - Hỗ trợ thực hiện các hoạt động đào tạo và tái đào tạo- Quản lý giám sát hoạt động nhân sự trong Khách Sạn- Xây dựng, quản lý, tổ chức và thực hiện các chính sách nhân sự cho nhân viên theo quy định của Khách Sạn",
            "hash_tag": [
                "HR",
                "Campcoders.com"
            ],
            "title": "nhân sự",
            "userName": "Cường Vũ",
            "image_normal": "http://job.dev/images/normal_size/JobImages/1422634751069.jpeg",
            "image_small": "http://job.dev/images/small_size/JobImages/1422634751069.jpeg",
            "image": "http://job.dev/images/full_size/JobImages/1422634751069.jpeg"
        }
    ]
}

```

### 9. View my applications

```
POST http://jobpitch.campcoders.com/api/my_applications
Content-Type: application/json
Cache-Control: no-cache

{
    "token"         : "$2a$08$OsMl...Z18lwH5rFMrcGLIwwxLPgupq.",
    "user_id"       : "54cba60d3bbfb7d437d6c512"
}

```
##### Regex
```
    

```
##### Return
```
{
    "error_code": 0,
    "applications": [
        {
            "time": "2015-01-30T16:13:43.000Z",
            "job_id": "54cbac4e28837ea23ba88d22",
            "user_avatar": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpa1/t31.0-1/c718.0.960.960/p960x960/10557488_606609982789433_860901210522561437_o.jpg",
            "user_name": "Cường Vũ",
            "user_id": "54cba60d3bbfb7d437d6c512",
            "_id": "54cbadb728837ea23ba88d27",
            "__v": 0,
            "hires": 0,
            "interviews": 0,
            "shares": {
                "list": [],
                "number": 0
            },
            "likes": {
                "list": [],
                "number": 0
            },
            "description": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "hash_tag": [
                "HR",
                "Campcoders",
                "FPT"
            ],
            "title": "I can do it"
        },
        {
            "time": "2015-01-30T16:13:43.000Z",
            "job_id": "54cbac4e28837ea23ba88d22",
            "user_avatar": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpa1/t31.0-1/c718.0.960.960/p960x960/10557488_606609982789433_860901210522561437_o.jpg",
            "user_name": "Cường Vũ",
            "user_id": "54cba60d3bbfb7d437d6c512",
            "_id": "54cbadb728837ea23ba88d28",
            "__v": 0,
            "hires": 0,
            "interviews": 0,
            "shares": {
                "list": [],
                "number": 0
            },
            "likes": {
                "list": [],
                "number": 0
            },
            "description": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "hash_tag": [
                "HR",
                "Campcoders",
                "FPT"
            ],
            "title": "I can do it"
        }
    ]
}

```


### 10. Sign-up by email

```
POST http://jobpitch.campcoders.com/api/signup
Content-Type: application/json
Cache-Control: no-cache

{
    "user_name"    : "CuongVu",
    "isUser"       : 1,
    "email"        : "cuongvc93@gmail.com",
    "password"     : "coc@123456"
}


```
##### Regex
```
    

```
##### Return
```
{
    "error_code": 0,
    "user": {
        "__v": 0,
        "userName": "CuongVu",
        "_id": "54cbba53bece0ae24a0007ea",
        "email": "cuongvc93@gmail.com",
        "year_of_birth": null,
        "education": "",
        "industry": "",
        "userFullname": "",
        "avatar_normal": "http://job.dev/images/full_size/TalentImages/default-avatar.png",
        "avatar_small": "http://job.dev/images/full_size/TalentImages/default-avatar.png",
        "avatar": "http://job.dev/images/full_size/TalentImages/default-avatar.png",
        "friends": [],
        "myFollows": [],
        "myApplications": [],
        "myJobs": [],
        "followMes": [],
        "website": "",
        "companyFullname": "",
        "logo_normal": "http://job.dev/images/full_size/CompanyLogos/default-logo.png",
        "logo_small": "http://job.dev/images/full_size/CompanyLogos/default-logo.png",
        "logo": "http://job.dev/images/full_size/CompanyLogos/default-logo.png",
        "active": 1,
        "permission": 0,
        "token": "$2a$08$EWt5Eb1c.FUZVTWKB64kGuIIj0Do8bZkWFny46giRvnMOseomhRFO",
        "messages": [],
        "notifications": [],
        "contact": "",
        "google_infor": {
            "access_token": "",
            "email": "",
            "profileUrl": "",
            "gender": "",
            "username": "",
            "avatar": "",
            "id": ""
        },
        "linkedin_infor": {
            "access_token": "",
            "email": "",
            "profileUrl": "",
            "gender": "",
            "username": "",
            "avatar": "",
            "id": ""
        },
        "twitter_infor": {
            "token_secret": "",
            "access_token": "",
            "email": "",
            "profileUrl": "",
            "gender": "",
            "username": "",
            "avatar": "",
            "id": ""
        },
        "fb_infor": {
            "access_token": "",
            "email": "",
            "profileUrl": "",
            "gender": "",
            "username": "",
            "avatar": "",
            "id": ""
        },
        "local_infor": {
            "email": "cuongvc93@gmail.com",
            "password": "$2a$08$n0XMyuW51JQGANY5OdBQjefyFIckQNv2KC6t0IGh/.mnaZQIuC9Je"
        },
        "type_account": 1,
        "location": {
            "address": "417 Clinton St Brooklyn, NY 11231, Hoa Kỳ",
            "lng": -73.99822,
            "lat": 40.681966
        },
        "isUser": 1,
        "address": ""
    }
}

```



### 11. Login with email

```
POST http://jobpitch.campcoders.com/api/signup
Content-Type: application/json
Cache-Control: no-cache

{
    "email"        : "cuongvc93@gmail.com",
    "password"     : "coc@123456"
}



```
##### Regex
```
    

```
##### Return
```
{
    "error_code": 0,
    "user": {
        "__v": 0,
        "userName": "CuongVu",
        "_id": "54cbba53bece0ae24a0007ea",
        "email": "cuongvc93@gmail.com",
        "year_of_birth": null,
        "education": "",
        "industry": "",
        "userFullname": "",
        "avatar_normal": "http://job.dev/images/full_size/TalentImages/default-avatar.png",
        "avatar_small": "http://job.dev/images/full_size/TalentImages/default-avatar.png",
        "avatar": "http://job.dev/images/full_size/TalentImages/default-avatar.png",
        "friends": [],
        "myFollows": [],
        "myApplications": [],
        "myJobs": [],
        "followMes": [],
        "website": "",
        "companyFullname": "",
        "logo_normal": "http://job.dev/images/full_size/CompanyLogos/default-logo.png",
        "logo_small": "http://job.dev/images/full_size/CompanyLogos/default-logo.png",
        "logo": "http://job.dev/images/full_size/CompanyLogos/default-logo.png",
        "active": 1,
        "permission": 0,
        "token": "$2a$08$EWt5Eb1c.FUZVTWKB64kGuIIj0Do8bZkWFny46giRvnMOseomhRFO",
        "messages": [],
        "notifications": [],
        "contact": "",
        "google_infor": {
            "access_token": "",
            "email": "",
            "profileUrl": "",
            "gender": "",
            "username": "",
            "avatar": "",
            "id": ""
        },
        "linkedin_infor": {
            "access_token": "",
            "email": "",
            "profileUrl": "",
            "gender": "",
            "username": "",
            "avatar": "",
            "id": ""
        },
        "twitter_infor": {
            "token_secret": "",
            "access_token": "",
            "email": "",
            "profileUrl": "",
            "gender": "",
            "username": "",
            "avatar": "",
            "id": ""
        },
        "fb_infor": {
            "access_token": "",
            "email": "",
            "profileUrl": "",
            "gender": "",
            "username": "",
            "avatar": "",
            "id": ""
        },
        "local_infor": {
            "email": "cuongvc93@gmail.com",
            "password": "$2a$08$n0XMyuW51JQGANY5OdBQjefyFIckQNv2KC6t0IGh/.mnaZQIuC9Je"
        },
        "type_account": 1,
        "location": {
            "address": "417 Clinton St Brooklyn, NY 11231, Hoa Kỳ",
            "lng": -73.99822,
            "lat": 40.681966
        },
        "isUser": 1,
        "address": ""
    }
}

```


### 12. Get tags

```
GET http://jobpitch.campcoders.com/api/tags
Content-Type: application/json
Cache-Control: no-cache

```
##### Regex
```
    

```
##### Return
```
{
    "error_code": 0,
    "tags": [
        {
            "_id": "54cf85ded6f0cebb214ed28b",
            "__v": 0,
            "app_id": [],
            "job_id": [
                "54cf85ded6f0cebb214ed28a"
            ],
            "name": "Android"
        },
        {
            "_id": "54cf85ded6f0cebb214ed28c",
            "__v": 0,
            "app_id": [],
            "job_id": [
                "54cf85ded6f0cebb214ed28a"
            ],
            "name": "HTML"
        },
        {
            "_id": "54cf85e4d6f0cebb214ed28f",
            "__v": 0,
            "app_id": [],
            "job_id": [
                "54cf85e4d6f0cebb214ed28e"
            ],
            "name": "Nodejs"
        }
    ]
}

```


### 13. Search tag

```
POST http://jobpitch.campcoders.com/api/search_tag
Content-Type: application/json
Cache-Control: no-cache

{
  "tag" : "Nodejs",
  "position" : 2
}

position = 1: search tag in jobs
position = 2: search tag in applications
position = 3: search tag in jobs and applications

```
##### Regex
```
    

```
##### Return
```
{
    "error_code": 0,
    "applications": [
        {
            "time": "2015-02-02T14:21:13.000Z",
            "job_id": "54cf85e0d6f0cebb214ed28d",
            "user_avatar": "http://job.dev/images/full_size/TalentImages/default-avatar.png",
            "user_name": "CuongVC93",
            "user_id": "54cef3ee162f8f5428d2323b",
            "_id": "54cf87d918bcddcc237a82a6",
            "__v": 0,
            "hires": 0,
            "interviews": 0,
            "shares": {
                "list": [],
                "number": 0
            },
            "likes": {
                "list": [],
                "number": 0
            },
            "description": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "hash_tag": [
                "Php",
                "Nodejs",
                "Android",
                "Campcoders.com"
            ],
            "title": "I can do it"
        }
    ]
}

```

### 14. Upload file

```
POST http://jobpitch.campcoders.com/api/upload_file
Content-Type: form-data
Cache-Control: no-cache

{
    "file"         : FILE
}
```
##### Regex
```
    file        : File

```
##### Return
```
{
    "error_code":0,"file":"http://job.dev/files/1422888086875.pdf"
}

```


### 15. Comment

```
POST http://jobpitch.campcoders.com/api/comment
Content-Type: application/json
Cache-Control: no-cache

{
    "token"                 : "$2a$08$lhiCBo8YnwspPqpUrBi6hOPQT2fn8uY8cmTz4MkCAz4ncTXeqB2hq",
    "user_id"               : "54cf8e29a2d2bf0f2c849c35",
    "content"               : "Ban tung lam voi chuc vu gi?",
    "hash_tag"              : ["Php", "Nodejs", "Android", "Campcoders.com"],
    "application_parent"    : "",
    "comment_parent"        : "54d104892b6d292c1e71cb96",
    "job_parent"            : "54d104892b6d292c1e71cb96"
}

application_parent va comment_parent o day la application/comment ma user 
comment vao. Chi 1 trong 2 co gia tri, cai con lai bang ""
job_parent la require

```
##### Regex
```


```
##### Return
```
{
    "error_code": 0,
    "comment": {
        "__v": 0,
        "time": "Wed Feb 04 2015 00:38:29 GMT+0700 (ICT)",
        "comment_parent": "54d104892b6d292c1e71cb96",
        "job_parent" : "54d104892b6d292c1e71cb96",
        "user_avatar": "Cường Vũ",
        "user_name": "https://lh5.googleusercontent.com/-IlI6TyJIlrs/AAAAAAAAAAI/AAAAAAAAAC8/AsmFVAZBIkw/photo.jpg",
        "user_id": "54cf8e29a2d2bf0f2c849c35",
        "_id": "54d1079512a9894b25904c66",
        "comments": [],
        "shares": {
            "list": [],
            "number": 0
        },
        "likes": {
            "list": [],
            "number": 0
        },
        "content": "Ban tung lam voi chuc vu gi?",
        "hash_tag": [
            "Php",
            "Nodejs",
            "Android",
            "Campcoders.com"
        ]
    }
}


```


### 16. Get Comment

```
POST http://jobpitch.campcoders.com/api/get_comments
Content-Type: application/json
Cache-Control: no-cache

{
    "token"        : "$2a$08$lhiCBo8YnwspPqpUrBi6hOPQT2fn8uY8cmTz4MkCAz4ncTXeqB2hq",
    "user_id"      : "54cf8e29a2d2bf0f2c849c35",
    "comments"     :  [
                        "54d105f112a9894b25904c5e",
                        "54d105f112a9894b25904c5f"
                      ]

}

Mang cac commentId o day duoc lay trong object cua Application hoac cua 1 Comment. Do la cac comment cua Application/Comment do.

```
##### Regex
```


```
##### Return
```
{
    "error_code": 0,
    "comment": [
        {
            "time": "Wed Feb 04 2015 00:31:29 GMT+0700 (ICT)",
            "comment_parent": "54d104892b6d292c1e71cb96",
            "user_avatar": "Cường Vũ",
            "user_name": "https://lh5.googleusercontent.com/-IlI6TyJIlrs/AAAAAAAAAAI/AAAAAAAAAC8/AsmFVAZBIkw/photo.jpg",
            "user_id": "54cf8e29a2d2bf0f2c849c35",
            "_id": "54d105f112a9894b25904c5e",
            "__v": 0,
            "comments": [],
            "shares": {
                "list": [],
                "number": 0
            },
            "likes": {
                "list": [],
                "number": 0
            },
            "content": "Ban tung lam voi chuc vu gi?",
            "hash_tag": [
                "Php",
                "Nodejs",
                "Android",
                "Campcoders.com"
            ]
        },
        {
            "time": "Wed Feb 04 2015 00:31:29 GMT+0700 (ICT)",
            "comment_parent": "54d104892b6d292c1e71cb96",
            "user_avatar": "Cường Vũ",
            "user_name": "https://lh5.googleusercontent.com/-IlI6TyJIlrs/AAAAAAAAAAI/AAAAAAAAAC8/AsmFVAZBIkw/photo.jpg",
            "user_id": "54cf8e29a2d2bf0f2c849c35",
            "_id": "54d105f112a9894b25904c5f",
            "__v": 0,
            "comments": [],
            "shares": {
                "list": [],
                "number": 0
            },
            "likes": {
                "list": [],
                "number": 0
            },
            "content": "Ban tung lam voi chuc vu gi?",
            "hash_tag": [
                "Php",
                "Nodejs",
                "Android",
                "Campcoders.com"
            ]
        }
    ]
}


```


### 17. Like

```
POST http://jobpitch.campcoders.com/api/like
Content-Type: application/json
Cache-Control: no-cache

{
    "token"                 : "$2a$08$zW6mO2jG5yGk2KzcJoiawueVBbTyEH1Xi3jG4y7FoZ8SL2DKyjQwG",
    "user_id"               : "54d18f02c0f4602d7d22055f",
    "type_like"             : 3,
    "job_id"                : "54d18f56c0f4602d7d220560",
    "application_id"        : "54d0fe3b2b6d292c1e71cb93",
    "comment_id"            : "54d1048a2b6d292c1e71cb97"
}


type_like = 1: like job, truong job_id co gia tri
type_like = 2: like application, truong application_id co gia tri
type_like = 3: like comment, truong comment_id co gia tri

```
##### Regex
```


```
##### Return
```
{"error_code":0}


```

### 18. Interest

```
POST http://jobpitch.campcoders.com/api/interest
Content-Type: application/json
Cache-Control: no-cache

{
    "token"                 : "$2a$08$zW6mO2jG5yGk2KzcJoiawuey7FoZ8SL2DKyjQwG",
    "user_id"               : "54d18f02c0f4602d7d22055f",
    "app_id"                : "54d0fe3b2b6d292c1e71cb93"
}



    app_id : application ma user interest
    user phai la cong ty (isUser = 2), da verify moi co quyen interest. API 
    nay dung luon cho truong hop bo interest.

```
##### Regex
```


```
##### Return
```
{"error_code":0}

```

### 19. Hire

```
POST http://jobpitch.campcoders.com/api/hire
Content-Type: application/json
Cache-Control: no-cache

{
    "token"                 : "$2a$08$Qv//nggkHtkV6GzEXu1NF.smGyZKETNoY3ydYG",
    "user_id"               : "54d266309709b2cd3fd845c4",
    "job_id"                : "54d2664a9709b2cd3fd845c5",
    "app_id"                : "54d2665f9709b2cd3fd845c6"
}




    app_id : application ma company hire
    user hire phai la cong ty (isUser = 2), la chu cua job
    job_id : job dang hire

    Sau khi hire, danh dau application do la da duoc hire. 
    Trong thong tin cua  job da them 1 truong la contract : list cac contract cua job do.
    Trong thong tin cua  user da them 1 truong la contract : list cac contract cua user do.   

```
##### Regex
```


```
##### Return
```
{"error_code":0}

```

### 20. Change Status job

```
POST http://jobpitch.campcoders.com/api/job_status
Content-Type: application/json
Cache-Control: no-cache

{
    "token"                 : "$2a$08$Qv//nggkHtkV6GzEXu1NF.smGyZKETNoY3ydYG",
    "user_id"               : "54d266309709b2cd3fd845c4",
    "job_id"                : "54d2664a9709b2cd3fd845c5",
    "status_job"            : 1
}

    Chi user chu cua job moi duoc thuc hien
    1: dang tim nguoi
    2: het han dang tuyen (sau 24h)
    3: het han tim nguoi
    4: da tim duoc nguoi 

```
##### Regex
```


```
##### Return
```
{"error_code":0}

```



### 21. Follow

```
POST http://jobpitch.campcoders.com/api/follow
Content-Type: application/json
Cache-Control: no-cache

{
    "token"                     :  "$2a$08$O5/3iHOg4U2PeGcvbwYB0O93247GhpvW",
    "user_id"                   :  "54d185c336691a8b0f1169cd",
    "user_follow_id"            :  "54d265b91f81837248f1be3d"
}


    User_id follow user_follow_id

```
##### Regex
```


```
##### Return
```
{"error_code":0}

```


### 22. Get users

```
POST http://jobpitch.campcoders.com/api/users
Content-Type: application/json
Cache-Control: no-cache

{
    "token"                     :  "$2a$08$tVRMd5RvQ2YDIVQpjTNz7O5/3iHOg4U2PeGcvbwYB0O93247GhpvW",
    "user_id"                   :  "54d185c336691a8b0f1169cd",
    "users"                     : ["54d185c336691a8b0f1169cd", 
                                   "54d1874836691a8b0f1169d5", 
                                   "54d19220761af20924788e36", 
                                   "54d265b91f81837248f1be3d", 
                                   "54d1860236691a8b0f1169ce", 
                                   "54d193c88cf8889a2e08ce37"]
}

    Dung de get thong tin 1 list user, dung khi: xem cac user follow, like, 
    interest

```
##### Regex
```


```
##### Return
```
{
    "error_code": 0,
    "users": [
        {
            "_id": "54d185c336691a8b0f1169cd",
            "userName": "Pale Color",
            "avatar_normal": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/t31.0-1/c0.0.960.960/p960x960/965368_576403985759899_2014020168_o.jpg",
            "avatar_small": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xfp1/v/t1.0-1/c0.0.200.200/p200x200/1394789_576403985759899_2014020168_n.jpg?oh=e6090c6aec80967e2831d30a9369dfcc&oe=5568B42F&__gda__=1431918605_9078d35c239f4c1a374c0d1ddc36f866",
            "avatar": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/t31.0-1/c0.0.960.960/p960x960/965368_576403985759899_2014020168_o.jpg"
        },
        {
            "_id": "54d1860236691a8b0f1169ce",
            "userName": "Thanchet",
            "avatar_normal": "http://jobpitch.campcoders.com/images/full_size/TalentImages/default-avatar.png",
            "avatar_small": "http://jobpitch.campcoders.com/images/full_size/TalentImages/default-avatar.png",
            "avatar": "http://jobpitch.campcoders.com/images/full_size/TalentImages/default-avatar.png"
        },
        {
            "_id": "54d1874836691a8b0f1169d5",
            "userName": "Cường Vũ",
            "avatar_normal": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpa1/t31.0-1/c718.0.960.960/p960x960/10557488_606609982789433_860901210522561437_o.jpg",
            "avatar_small": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpa1/v/t1.0-1/c150.0.200.200/p200x200/10455046_606609982789433_860901210522561437_n.jpg?oh=faa9495086ca2ff0eac31beccc473dcb&oe=5550116D&__gda__=1432909098_79c67ae7c6d1b8e06cbd34697a3b46b9",
            "avatar": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpa1/t31.0-1/c718.0.960.960/p960x960/10557488_606609982789433_860901210522561437_o.jpg"
        }
    ]
}

```

### 23. Get Data from permalink

```
GET http://jobpitch.campcoders.com/api/:permalink
Content-Type: application/json
Cache-Control: no-cache


```
##### Regex
```


```
##### Return
```
{"error_code":0,
"user":
    {"__v":0,
    "_id":"54d64038de2e957640010185",
    "userName":"cuongvu",
    "contracts":{"list":[],"number":0},
    "interests":{"list":[],"number":0},
    "companyEmail":"","phone":"",
    "skype":"","verify":0,
    "email":"vcc.bka@gmail.com",
    "year_of_birth":null,
    "education":"",
    "industry":"",
    "userFullname":"",
    "avatar_normal":"http://job.dev/images/full_size/TalentImages/default-avatar.png",
    "avatar_small":"http://job.dev/images/full_size/TalentImages/default-avatar.png",
    "avatar":"http://job.dev/images/full_size/TalentImages/default-avatar.png",
    "friends":[],
    "myFollows":[],
    "myApplications":[],
    "myJobs":[],
    "followMes":[],
    "website":"",
    "companyFullname":"",
    "logo_normal":"http://job.dev/images/full_size/CompanyLogos/default-logo.png",
    "logo_small":"http://job.dev/images/full_size/CompanyLogos/default-logo.png",
    "logo":"http://job.dev/images/full_size/CompanyLogos/default-logo.png",
    "active":1,"permission":0,
    "token":"$2a$08$vx.6I2r93Je3eTwGvOOWdOUFzcXSnt7XNQ5PE72GbI6SQbrTNgw/G",
    "messages":[],
    "notifications":{"list":[],"unread":0},
    "contact":"",
    "google_infor":{"access_token":"","email":"","profileUrl":"","gender":"","username":"","avatar":"","id":""},
    "linkedin_infor":{"access_token":"","email":"","profileUrl":"","gender":"","username":"","avatar":"","id":""},
    "twitter_infor":{"token_secret":"","access_token":"","email":"","profileUrl":"","gender":"","username":"","avatar":"","id":""},
    "fb_infor":{"access_token":"","email":"","profileUrl":"","gender":"","username":"","avatar":"","id":""},
    "local_infor":{"email":"vcc.bka@gmail.com","password":"$2a$08$k8X2pSPAOYwhF7jeaNfUUe2vFaErCYXxyHyDHS9QtbUnEjUP7ENNO"},
    "type_account":1,
    "location":{"address":"9 Nguyên Hong, Thành Công, Ba Đình, Hà Nội, Việt Nam","lng":105.812198,"lat":21.018549},"isUser":2,"address":""}}

```

### 24. Get notify

```
GET http://jobpitch.campcoders.com/api/get_notify
Content-Type: application/json
Cache-Control: no-cache

{
    "token"                     :  "$2a$08$tVRMd5Rv2PeGcvbwYB0O93247GhpvW",
    "user_id"                   :  "54d185c336691a8b0f1169cd"m,
    "skip"                      :  0,
    "limit"                     :  20
}

```
##### Regex
```


```
##### Return
```
{
    "error_code": 0,
    "notifys": [
        {
            "_id": "54d81985e7b6c9584c7f2445",
            "time": "2015-02-09T02:20:53.000Z",
            "userAvatar_make_notify": "https://media.licdn.com/mpr/mprx/0_k14DPHK2N-ddlTl0XtI-PwTfnrm4gTl0oB2tPwCKWzsdCLQxHzH3jI9YZYa6OQK15rV1y2r-Gmro",
            "user_id_receive": "54d812ac7c4f668d24cc96c8",
            "__v": 0,
            "status": 1,
            "type_notify": 12,
            "content": {
                "content": " apply job",
                "userName_make_notify": "Campcoders Account"
            },
            "link": "Project-Field-Manager"
        },
        {
            "_id": "54d818c5b7326bdf3b655ef2",
            "time": "2015-02-09T02:17:41.000Z",
            "userAvatar_make_notify": "http://jobpitch.campcoders.com/images/full_size/TalentImages/default-avatar.png",
            "user_id_receive": "54d812ac7c4f668d24cc96c8",
            "__v": 0,
            "status": 1,
            "type_notify": 11,
            "content": {
                "content": " create new Job",
                "userName_make_notify": "cuongvu"
            },
            "link": "Project-Field-Manager"
        },
        {
            "_id": "54d81846b7326bdf3b655eed",
            "time": "2015-02-09T02:15:34.000Z",
            "userAvatar_make_notify": "http://jobpitch.campcoders.com/images/full_size/TalentImages/default-avatar.png",
            "user_id_receive": "54d812ac7c4f668d24cc96c8",
            "__v": 0,
            "status": 1,
            "type_notify": 11,
            "content": {
                "content": " create new Job",
                "userName_make_notify": "cuongvu"
            },
            "link": "05-Java-Developers-Attractive-Salary"
        },
        {
            "_id": "54d81680b7326bdf3b655eea",
            "time": "2015-02-09T02:08:00.000Z",
            "userAvatar_make_notify": "http://jobpitch.campcoders.com/images/full_size/TalentImages/default-avatar.png",
            "user_id_receive": "54d812ac7c4f668d24cc96c8",
            "__v": 0,
            "status": 1,
            "type_notify": 11,
            "content": {
                "content": " create new Job",
                "userName_make_notify": "cuongvu"
            },
            "link": "Nh-n-Vi-n-Kinh-Doanh-Thi-t-B-M-y-May-C-ng-Nghi-p"
        },
        {
            "_id": "54d812ef7c4f668d24cc96cc",
            "time": "2015-02-09T01:52:47.000Z",
            "userAvatar_make_notify": "http://jobpitch.campcoders.com/images/full_size/TalentImages/default-avatar.png",
            "user_id_receive": "54d812ac7c4f668d24cc96c8",
            "__v": 0,
            "status": 1,
            "type_notify": 11,
            "content": {
                "content": " create new Job",
                "userName_make_notify": "cuongvu"
            },
            "link": "Sales-English-Speaking-"
        }
    ]
}

```

### 24. Get applications

```
GET http://jobpitch.campcoders.com/api/get_applications
Content-Type: application/json
Cache-Control: no-cache

{
    "token"                 : "$2a$08$PAoqJ9SafffikdBp5Tow1HZMB75NcXnVh0zuYi",
    "user_id"               : "54d82a8e85dde2572bb70d2c",
    "own_of_app_id"         : "54d82a8e85dde2572bb70d2c",
    "skip"                  : 0,
    "limit"                 : 5
}

    own_of_app_id la optional : = '' thi query tat ca application cua user top
    neu own_of_app_id co gia tri thi la query tat ca applications cua 1 user


```
##### Regex
```


```
##### Return
```
{
    "error_code": 0,
    "applications": [
        {
            "time": "2015-02-09T03:33:40.000Z",
            "job_id": "54d8257e5214e7f826776043",
            "user_avatar": "https://media.licdn.com/mpr/mprx/0_k14DPHK2N-ddlTl0XtI-PwTfnrm4gTl0oB2tPwCKWzsdCLQxHzH3jI9YZYa6OQK15rV1y2r-Gmro",
            "user_name": "Campcoders Account",
            "user_id": "54d82a8e85dde2572bb70d2c",
            "_id": "54d82a9485dde2572bb70d2f",
            "__v": 0,
            "comment": [],
            "hires": {
                "status": 0
            },
            "interests": {
                "list": [],
                "number": 0
            },
            "interviews": 0,
            "shares": {
                "list": [],
                "number": 0
            },
            "likes": {
                "list": [],
                "number": 0
            },
            "file": "",
            "description": "12312312321",
            "hash_tag": [],
            "title": "ApplyTitle"
        },
        {
            "time": "2015-02-09T03:33:38.000Z",
            "job_id": "54d8257e5214e7f826776043",
            "user_avatar": "https://media.licdn.com/mpr/mprx/0_k14DPHK2N-ddlTl0XtI-PwTfnrm4gTl0oB2tPwCKWzsdCLQxHzH3jI9YZYa6OQK15rV1y2r-Gmro",
            "user_name": "Campcoders Account",
            "user_id": "54d82a8e85dde2572bb70d2c",
            "_id": "54d82a9285dde2572bb70d2e",
            "__v": 0,
            "comment": [],
            "hires": {
                "status": 0
            },
            "interests": {
                "list": [],
                "number": 0
            },
            "interviews": 0,
            "shares": {
                "list": [],
                "number": 0
            },
            "likes": {
                "list": [],
                "number": 0
            },
            "file": "",
            "description": "12312312321",
            "hash_tag": [],
            "title": "ApplyTitle"
        }
    ]
}
```


### 24. Get jobs

```
GET http://jobpitch.campcoders.com/api/get_jobs
Content-Type: application/json
Cache-Control: no-cache

{
    "token"                 : "$2a$08$wp7a4PdgPyoisWcEcys4QuupoKRUIm5QerVprUG09QJJjka3RgM2m",
    "user_id"               : "54d8238544aba1c5232c2ac1",
    "skip"                  : 0,
    "limit"                 : 3,
    "own_of_job_id"         : "54d82403918494ac248e24c9"
}


```
##### Regex
```


```
##### Return
```
{
    "error_code": 0,
    "jobs": [
        {
            "__v": 1,
            "_id": "54d8356acd70876a37545955",
            "time": "2015-02-09T04:19:54.000Z",
            "user_id": "54d82403918494ac248e24c9",
            "receive_notify": [
                "54d82a8e85dde2572bb70d2c"
            ],
            "contracts": {
                "list": [],
                "number": 0
            },
            "hires": 0,
            "interviews": 0,
            "applications": {
                "list": [
                    "54d83570cd70876a37545958"
                ],
                "number": 1
            },
            "shares": {
                "list": [],
                "number": 0
            },
            "likes": {
                "list": [],
                "number": 0
            },
            "status": 1,
            "link_direct": "123",
            "location": {
                "address": "12312",
                "lng": 105.810339,
                "lat": 21.016481
            },
            "description": "123123",
            "hash_tag": [],
            "permalink": "123",
            "title": "123",
            "userName": "1111111",
            "image_normal": "http://job.dev/images/normal_size/JobImages/1423455856950.jpeg",
            "image_small": "http://job.dev/images/small_size/JobImages/1423455856950.jpeg",
            "image": "http://job.dev/images/full_size/JobImages/1423455856950.jpeg"
        },
        {
            "time": "2015-02-09T03:51:36.000Z",
            "user_id": "54d82403918494ac248e24c9",
            "_id": "54d82ec89c6695c730cf3de1",
            "__v": 0,
            "receive_notify": [
                "54d82a8e85dde2572bb70d2c"
            ],
            "contracts": {
                "list": [],
                "number": 0
            },
            "hires": 0,
            "interviews": 0,
            "applications": {
                "list": [],
                "number": 0
            },
            "shares": {
                "list": [],
                "number": 0
            },
            "likes": {
                "list": [],
                "number": 0
            },
            "status": 1,
            "link_direct": "111",
            "location": {
                "address": "1111",
                "lng": 105.810339,
                "lat": 21.016481
            },
            "description": "111",
            "hash_tag": [],
            "permalink": "111111111",
            "title": "111111111",
            "userName": "1111111",
            "image_normal": "http://job.dev/images/normal_size/JobImages/1423454747952.jpeg",
            "image_small": "http://job.dev/images/small_size/JobImages/1423454747952.jpeg",
            "image": "http://job.dev/images/full_size/JobImages/1423454747952.jpeg"
        },
        {
            "time": "2015-02-09T03:49:53.000Z",
            "user_id": "54d82403918494ac248e24c9",
            "_id": "54d82e62124034e22f186e38",
            "__v": 0,
            "receive_notify": [
                "54d82a8e85dde2572bb70d2c"
            ],
            "contracts": {
                "list": [],
                "number": 0
            },
            "hires": 0,
            "interviews": 0,
            "applications": {
                "list": [],
                "number": 0
            },
            "shares": {
                "list": [],
                "number": 0
            },
            "likes": {
                "list": [],
                "number": 0
            },
            "status": 1,
            "link_direct": "123123",
            "location": {
                "address": "123123123",
                "lng": 105.810339,
                "lat": 21.016481
            },
            "description": "3123123",
            "hash_tag": [],
            "permalink": "12312",
            "title": "12312",
            "userName": "1111111",
            "image_normal": "http://job.dev/images/normal_size/JobImages/1423454163482.jpeg",
            "image_small": "http://job.dev/images/small_size/JobImages/1423454163482.jpeg",
            "image": "http://job.dev/images/full_size/JobImages/1423454163482.jpeg"
        }
    ]
}
```


### 25. Edit avatar/cover

```
POST http://jobpitch.campcoders.com/api/edit_avatar
Content-Type: application/json
Cache-Control: no-cache

{
    "token"         : "$2a$08$wp7UIm5QerVprUG09QJJjka3RgM2m",
    "user_id"       : "54d8238544aba1c5232c2ac1",
    "type_image"    : 1,
    "temp_path"     : "public/upload/upload_57beec5444e7716b2affb4cc6d3d7ef8",
    "extension"     : "jpeg"
}

type_image : 1 la edit avatar. 2 la edit cover
```
##### Regex
```


```
##### Return
```
{"error_code":0}

```


### 26. Get User infor for contact

```
GET     http://job.dev/api/user/54db9ac592f6e6181fe5fd3b
Content-Type: application/json
Cache-Control: no-cache

```
##### Regex
```


```
##### Return
```
{
    "error_code": 0,
    "user": {
        "__v": 0,
        "_id": "54db9ac592f6e6181fe5fd3b",
        "userName": "cuongvu",
        "moreInfor": [],
        "contracts": {
            "list": [],
            "number": 0
        },
        "interests": {
            "list": [],
            "number": 0
        },
        "companyEmail": "",
        "phone": "",
        "skype": "",
        "verify": 0,
        "email": "vcc.bka@gmail.com",
        "year_of_birth": null,
        "education": "",
        "industry": "",
        "userFullname": "",
        "cover_normal": "http://job.dev/images/full_size/UserImages/default-cover.jpeg",
        "cover_small": "http://job.dev/images/full_size/UserImages/default-cover.jpeg",
        "cover": "http://job.dev/images/full_size/UserImages/default-cover.jpeg",
        "avatar_normal": "http://job.dev/images/full_size/UserImages/default-avatar.png",
        "avatar_small": "http://job.dev/images/full_size/UserImages/default-avatar.png",
        "avatar": "http://job.dev/images/full_size/UserImages/default-avatar.png",
        "friends": [],
        "myFollows": [],
        "myApplications": [],
        "myJobs": [],
        "followMes": [],
        "website": "",
        "companyFullname": "",
        "active": 1,
        "permission": 0,
        "contact": "",
        "type_account": 1,
        "location": {
            "address": "9 Nguyên Hong, Thành Công, Ba Đình, Hà Nội, Việt Nam",
            "lng": 105.812198,
            "lat": 21.018549
        },
        "isUser": 2,
        "address": ""
    }
}

```

### 27. Get job

```
GET     http://job.dev/api/job/54db9ac592f6e6181fe5fd3b
Content-Type: application/json
Cache-Control: no-cache

```
##### Regex
```


```
##### Return
```
{
    "error_code": 0,
    "job": {
        "time": "2015-02-11T02:10:33.000Z",
        "user_id": "54db9ac592f6e6181fe5fd3b",
        "_id": "54daba19c3c29f571b82451b",
        "__v": 0,
        "receive_notify": [],
        "contracts": {
            "list": [],
            "number": 0
        },
        "hires": 0,
        "interviews": 0,
        "applications": {
            "list": [],
            "number": 0
        },
        "shares": {
            "list": [],
            "number": 0
        },
        "likes": {
            "list": [],
            "number": 0
        },
        "status": 4,
        "link_direct": "http://campcoders.com",
        "location": {
            "address": "Ngõ 34 - Nguyên Hồng, Láng Hạ, Đống Đa, Hà Nội, Việt Nam",
            "lng": 105.810339,
            "lat": 21.016481
        },
        "description": "Quản lý toàn bộ công tác tuyển dụng nhân sự - Hỗ trợ thực hiện các hoạt động đào tạo và tái đào tạo- Quản lý giám sát hoạt động nhân sự trong Khách Sạn- Xây dựng, quản lý, tổ chức và thực hiện các chính sách nhân sự cho nhân viên theo quy định của Khách Sạn",
        "hash_tag": [
            "Nodejs",
            "Angular"
        ],
        "permalink": "nh-n-s-",
        "title": "nhân sự",
        "userName": "CuongVC93",
        "image_normal": "http://job.dev/images/normal_size/JobImages/1423621317648.jpeg",
        "image_small": "http://job.dev/images/small_size/JobImages/1423621317648.jpeg",
        "image": "http://job.dev/images/full_size/JobImages/1423621317648.jpeg"
    }
}
```

### 27. Forgot password

```
POST     http://jobpitch.campcoders.com/api/forgot_password
Content-Type: application/json
Cache-Control: no-cache

{
  "email" : "vcc.bka@gmail.com"
}


```
##### Regex
```


```
##### Return
```
{"error_code":0}
```

### 27. Search by keyword

```
POST     http://jobpitch.campcoders.com/api/search_keyword
Content-Type: application/json
Cache-Control: no-cache

{
    "keyword"                   :  "nodejs",
    "skip"                      : 0,
    "limit"                     : 1,
    "return_job"                : 1,
    "return_app"                : 1,
    "return_comment"            : 1
}

skip, limit: app dung voi moi loai
return_job = 1: return ca job tim duoc. return_job = 0 : khong return job tim duoc
return_app = 1: return ca app tim duoc. return_app = 0 : khong return app tim duoc
return_comment = 1: return ca comment tim duoc. return_comment = 0 : khong return comment tim duoc


```
##### Regex
```


```
##### Return
```
{
    "error_code": 0,
    "jobs": [
        {
            "_id": "54eefd78950cd24a68b6a476",
            "time": "2015-02-26T11:03:19.000Z",
            "user_id": "54eefd4c950cd24a68b6a470",
            "_keywords": [
                "thu",
                "th",
                "ph",
                "ch",
                "gi",
                "nh",
                "tranh",
                "c",
                "ho",
                "ng",
                "doanh",
                "market",
                "ty",
                "maket",
                "thanchet",
                "chui",
                "vi"
            ],
            "__v": 9,
            "receive_notify": [
                "54eea194292a7c2349743d64",
                "54eec074bbd33ec655a01828",
                "54eefd55950cd24a68b6a473"
            ],
            "contracts": {
                "list": [],
                "number": 0
            },
            "hires": 0,
            "interviews": 0,
            "applications": {
                "list": [
                    "54eefd87950cd24a68b6a479",
                    "54eefe00950cd24a68b6a47d",
                    "54ef049f4af476d46bcc0cf9",
                    "54ef04a04af476d46bcc0cfd",
                    "54ef04b34af476d46bcc0d02",
                    "54ef04b84af476d46bcc0d07",
                    "54ef04c94af476d46bcc0d0c",
                    "54efd970c0602456108d81ef"
                ],
                "number": 8
            },
            "score": 9,
            "shares": {
                "list": [],
                "number": 0
            },
            "likes": {
                "list": [
                    "54eea194292a7c2349743d64"
                ],
                "number": 1
            },
            "status": 1,
            "link_direct": "",
            "location": {
                "lng": 105.79058250000003,
                "lat": 21.0362368,
                "state": "Hanoi",
                "country": "Vietnam",
                "city": "",
                "address": "Cầu Giấy, Hanoi, Vietnam"
            },
            "description": "- Thu thập và phân tích về giá cả, sản phẩm của các đối thủ cạnh tranh.\n- Cập nhật và phân tích các hoạt động của đối thủ cạnh tranh có ảnh hưởng đến doanh số bán hàng và các hoạt động marketing của Công ty.",
            "tagname": [],
            "hash_tag": [
                "#Maketing"
            ],
            "permalink": "Chuy-n-Vi-n-Maketing",
            "title": "Chuyên Viên #Maketing",
            "userTagName": "",
            "userName": "Thanchet",
            "image_normal": "http://jobpitch.campcoders.com/images/normal_size/JobImages/1424949462225.jpeg",
            "image_small": "http://jobpitch.campcoders.com/images/small_size/JobImages/1424949462225.jpeg",
            "image": "http://jobpitch.campcoders.com/images/full_size/JobImages/1424949462225.jpeg"
        }
    ],
    "applications": [
        {
            "_id": "54f02f9d22234ca01d63166e",
            "time": "2015-02-27T08:49:33.000Z",
            "job_id": "54f02ea622234ca01d631660",
            "userTagName_own_job": "thuank4cg",
            "userName_own_job": "thuank4cg",
            "user_avatar": "https://media.licdn.com/mpr/mprx/0_LPiHRotx8QgZ-0jSFqPRRW3YCCEUrJySFAcBReC7gbYEfgwDWv1XvH9Tu2o5POgTXK39qfrZr_jo",
            "userName": "Pham Tat Thanh",
            "user_id": "54eec61f31ad06c959a17174",
            "__v": 5,
            "_keywords": [
                "year",
                "android",
                "dev",
                "smartosc",
                "embded",
                "softwar",
                "fsoft",
                "japan",
                "readi",
                "challeng",
                "pham",
                "tat",
                "thanh"
            ],
            "comment": [],
            "hires": {
                "status": 0
            },
            "interests": {
                "list": [
                    "54f02d9722234ca01d63165d",
                    "54eec436eb60f996583b3e5c"
                ],
                "number": 2
            },
            "interviews": 0,
            "shares": {
                "list": [],
                "number": 0
            },
            "likes": {
                "list": [
                    "54f02ee222234ca01d631663"
                ],
                "number": 1
            },
            "file": "",
            "description": "5 years Android dev for SmartOSC, 2 years Embedded software for FSoft Japan. Ready for any challenge!",
            "tagname": [],
            "hash_tag": [],
            "title": "",
            "job_title": "Embedded SW Engineer, Mobile Application Engineer"
        }
    ]
}


```

### 28. Export to pdf

```
POST     http://jobpitch.campcoders.com/api/export_pdf
Content-Type: application/json
Cache-Control: no-cache

{
    "link_html"                   :  "https://www.npmjs.com/package/nodepdf"
}


```
##### Regex
```


```
##### Return
```
{
    "pdf_link": "http://jobpitch.campcoders.com/...."
   
}


```

### 29. Delete job

```
POST     http://jobpitch.campcoders.com/api/delete_job
Content-Type: application/json
Cache-Control: no-cache

{
    "token"         : "$2aMcZnhKK1n8XZe2glnGGg9PZOzqZ.",
    "user_id"       : "54deb68032f4c1f223bc6e72",
    "job_id"        : "54deb69d32f4c1f223bc6e74"
}

```
##### Regex
```


```
##### Return
```
{"error_code":0}

```

### 30. Delete Application

```
POST     http://jobpitch.campcoders.com/api/delete_apply
Content-Type: application/json
Cache-Control: no-cache

{
    "token"                 : "$2a$08$DL.k4rWU07MMkQbfZePnXPXfUjA0FJFMbz1PEhm",
    "user_id"               : "54deb7c4767662cf2473e666",
    "app_id"                : "54ebf0c2443d4fe11cbffc48"

}

```
##### Regex
```


```
##### Return
```
{"error_code":0}

```


### 31. Delete Comment

```
POST     http://jobpitch.campcoders.com/api/delete_comment
Content-Type: application/json
Cache-Control: no-cache

{
    "token"                 : "$2a$08$JBSMlHKdPW4SiSf38LfcsnE1cq3vKaWHOC",
    "user_id"               : "54deb7c4767662cf2473e666",
    "cmt_id"                : "54ec1c69dcc477911f240059"

}

```
##### Regex
```


```
##### Return
```
{"error_code":0}

```

### 32. Edit Apply

```
POST     http://jobpitch.campcoders.com/api/edit_apply
Content-Type: application/json
Cache-Control: no-cache

{
    "token"                 : "$2a$08$f69u5BJvllnlcgqCrYBVT.15OJHEt88iToOwyCbZ0LVEUb/ATfbmO",
    "user_id"               : "54deb7c4767662cf2473e666",
    "title"                 : "I can do it",
    "app_id"                : "54ec0b97d5e8c0b512f3f27e",
    "description"           : "APPLY CHANGE",
    "hash_tag"              : ["Php", "Nodejs", "Android", "Campcoders.com", "1", "2", "3", "4", "5", "6"],
    "file"                  : ""
}


```
##### Regex
```


```
##### Return
```
{
    "error_code": 0,
    "app": {
        "__v": 15,
        "_id": "54ec0b97d5e8c0b512f3f27e",
        "companyId": "54deb68032f4c1f223bc6e72",
        "companyName": "cuongvu",
        "job_id": "54ebee4da14809601ab0f81a",
        "time": "2015-02-24T10:29:56.000Z",
        "userName": "Cường Vũ",
        "user_avatar": "https://lh5.googleusercontent.com/-IlI6TyJIlrs/AAAAAAAAAAI/AAAAAAAAAC8/AsmFVAZBIkw/photo.jpg",
        "user_id": "54deb7c4767662cf2473e666",
        "_keywords": [
            "appli",
            "chang",
            "php",
            "nodej",
            "android",
            "campcod",
            "com"
        ],
        "comment": [
            "54ec1c69dcc477911f240059",
            "54ec1c72dcc477911f24005b",
            "54ec1c72dcc477911f24005d",
            "54ec1c72dcc477911f24005f",
            "54ec1c9ddcc477911f240062"
        ],
        "hires": {
            "status": 0
        },
        "interests": {
            "list": [],
            "number": 0
        },
        "interviews": 0,
        "shares": {
            "list": [],
            "number": 0
        },
        "likes": {
            "list": [],
            "number": 0
        },
        "file": "",
        "description": "APPLY CHANGE",
        "hash_tag": [
            "Php",
            "Nodejs",
            "Android",
            "Campcoders.com",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6"
        ],
        "title": "I can do it"
    }
}
```


### 33. Edit Comment

```
POST     http://jobpitch.campcoders.com/api/edit_comment
Content-Type: application/json
Cache-Control: no-cache

{
    "token"                 : "$2a$08$V8Qcu7Ec4E5N9Dl.z4rUq.3n079IZoacTMu5e",
    "user_id"               : "54deb68032f4c1f223bc6e72",
    "comment_id"            : "54ec1c69dcc477911f240059",
    "content"               : "Comment moi",
    "hash_tag"              : ["Php", "Nodejs", "Android", "Campcoders.com"]
}



```
##### Regex
```


```
##### Return
```
{
    "error_code": 0,
    "comment": {
        "__v": 2,
        "_id": "54ec1c69dcc477911f240059",
        "application_parent": "54ec0b97d5e8c0b512f3f27e",
        "job_parent": "54ebee4da14809601ab0f81a",
        "time": "2015-02-24T10:45:00.000Z",
        "userName": "cuongvu",
        "user_avatar": "http://job.dev/images/full_size/UserImages/default-avatar.png",
        "user_id": "54deb68032f4c1f223bc6e72",
        "_keywords": [
            "comment",
            "moi",
            "php",
            "nodej",
            "android",
            "campcod",
            "com"
        ],
        "comments": [],
        "shares": {
            "list": [],
            "number": 0
        },
        "likes": {
            "list": [],
            "number": 0
        },
        "content": "Comment moi",
        "hash_tag": [
            "Php",
            "Nodejs",
            "Android",
            "Campcoders.com"
        ]
    }
}


```

### 34. Return top job

```
GET     http://jobpitch.campcoders.com/api/top_job
Content-Type: application/json
Cache-Control: no-cache

```
##### Regex
```


```
##### Return
```
{
    "error_code": 0,
    "top_job": [
        {
            "_id": "54ebe9bf4bd2a19f106a9db4",
            "title": "QA Manager"
        },
        {
            "_id": "54ebe9f04bd2a19f106a9db6",
            "title": "DotGear Studio: Game Desginer"
        },
        {
            "_id": "54ebea5d4bd2a19f106a9db8",
            "title": "Chuyên Viên Kế Toán Cấp Cao"
        },
        {
            "_id": "54ec64490a7875e13bd6e6ba",
            "title": "Tttt"
        },
        {
            "_id": "54ebead74bd2a19f106a9dba",
            "title": "FlappyBird: Game Designer"
        },
        {
            "_id": "54ebeae04bd2a19f106a9dbc",
            "title": "Engineering Manager"
        }
    ]
}

```


### 35. Return top company

```
GET     http://jobpitch.campcoders.com/api/top_company
Content-Type: application/json
Cache-Control: no-cache

```
##### Regex
```


```
##### Return
```
{
    "error_code": 0,
    "top_job": [
        {
            "_id": "54ebe9bf4bd2a19f106a9db4",
            "title": "QA Manager"
        },
        {
            "_id": "54ebe9f04bd2a19f106a9db6",
            "title": "DotGear Studio: Game Desginer"
        },
        {
            "_id": "54ebea5d4bd2a19f106a9db8",
            "title": "Chuyên Viên Kế Toán Cấp Cao"
        },
        {
            "_id": "54ec64490a7875e13bd6e6ba",
            "title": "Tttt"
        },
        {
            "_id": "54ebead74bd2a19f106a9dba",
            "title": "FlappyBird: Game Designer"
        },
        {
            "_id": "54ebeae04bd2a19f106a9dbc",
            "title": "Engineering Manager"
        }
    ]
}

```

### 36. Swing current

```
POST     http://jobpitch.campcoders.com/api/swing_current
Content-Type: application/json
Cache-Control: no-cache

{
    "token"                 : "$2a$08$YVdz7YmQhuVcY55Zc7tnXeReCXXnBv6O8IHPc1wra89Kn/X1J2Wm2",
    "user_id"               : "54deb68032f4c1f223bc6e72",
    "position" :  
        { 
          lat: 16.0544068,
          lng: 108.20216670000002,
          formatted_address: 'Đà Nẵng, Đà Nẵng, Việt Nam',
          city: 
           { long_name: 'Đà Nẵng',
             short_name: 'Đà Nẵng',
             types: [ 'locality', 'political' ] },
          state: 
           { long_name: 'Đà Nẵng',
             short_name: 'Đà Nẵng',
             types: [ 'administrative_area_level_1', 'political' ] },
          country: 
           { long_name: 'Việt Nam',
             short_name: 'VN',
             types: [ 'country', 'political' ] },
          user_id: '54f125b604522fc56903a3ec',
          token: '$2a$08$GbKlfdWcB6SVkyQJN7EzruJ1OLd63dq1LHPUgf4Fcbdyji7Dn9vQ6' 
        }

}

```
##### Regex
```


```
##### Return
```
{
    "error_code": 0
}

```

### 37. Share job

```
POST     http://jobpitch.campcoders.com/api/share_job
Content-Type: application/json
Cache-Control: no-cache

{
    "token"                 : "$2a$08$cSgfHvg.S59MO0JAXoOyT3GqaoEQJYKYyGxhzu.",
    "user_id"               : "54deb68032f4c1f223bc6e72",
    "job_id"                : "54ebee4da14809601ab0f81a"
}

```
##### Regex
```


```
##### Return
```
{
    "error_code": 0
}

```

### 38. Share apply

```
POST     http://jobpitch.campcoders.com/api/share_apply
Content-Type: application/json
Cache-Control: no-cache

{
    "token"                 : "$2a$08$cSgfHvg.S59MO0JAXo.aoEQJYKYyGxhzu.",
    "user_id"               : "54deb68032f4c1f223bc6e72",
    "app_id"                : "54ec0b97d5e8c0b512f3f27e"
}

```
##### Regex
```


```
##### Return
```
{
    "error_code": 0
}

```

### 35. Return top hashtag

```
GET     http://jobpitch.campcoders.com/api/top_hashtag
Content-Type: application/json
Cache-Control: no-cache

```
##### Regex
```


```
##### Return
```
{
    "error_code": 0,
    "top_hashtag": [
        {
            "_id": "54eeda81e5195b671393c260",
            "number": 3,
            "name": "#php"
        },
        {
            "_id": "54eeda6ce5195b671393c25d",
            "number": 3,
            "name": "#nodejs"
        },
        {
            "_id": "54eedaddb4330bb714dd6692",
            "number": 2,
            "name": "#android"
        }
    ]
}

```

### 36. Suggest hashtag

```
GET     http://jobpitch.campcoders.com/api/suggest/hashtag
Content-Type: application/json
Cache-Control: no-cache

```
##### Regex
```


```
##### Return
```
{
    "error_code": 0,
    "hashtag": [
        {
            "_id": "54eeda81e5195b671393c260",
            "number": 3,
            "name": "#php"
        },
        {
            "_id": "54eedaddb4330bb714dd6692",
            "number": 2,
            "name": "#android"
        },
        {
            "_id": "54eeda6ce5195b671393c25d",
            "number": 3,
            "name": "#nodejs"
        }
    ]
}

```

### 37. Suggest tagname

```
GET     http://jobpitch.campcoders.com/api/suggest/tagname
Content-Type: application/json
Cache-Control: no-cache

```
##### Regex
```


```
##### Return
```
{
    "error_code": 0,
    "tagname": [
        {
            "_id": "54eef31ef87632e72c4db927",
            "tagname": "cuongvu_123"
        }
    ]
}

```

### 38. Get location

```
Post     http://jobpitch.campcoders.com/api/location
Content-Type: application/json
Cache-Control: no-cache

```
##### Regex
```
{
    "token"                 : "$2a$08$F01DvCHZbakHNW0rNqJOjeGamkwFVPFv/rSBshUYWQthVWNXUNNDe",
    "user_id"               : "54f0422e26abff5065d17311"
}


```
##### Return
```
{
    "error_code": 0,
    "location": {
        "lng": 105.832586,
        "lat": 21.029346,
        "country": "Viet Nam",
        "city": "Ha Noi"
    }
}

```

### 39. Return top hashtag

```
Post     http://jobpitch.campcoders.com/api/top_hashtag
Content-Type: application/json
Cache-Control: no-cache

```
##### Regex
```
{
  "country_short_name" : "VN",
  "skip"               : 0,
  "limit"              : 10



```
##### Return
```
{
    "error_code": 0,
    "top_hashtag": [
        {
            "_id": "54f1605c92c220b31d492226",
            "country": {
                "VN": {
                    "number": 4
                }
            },
            "name": "#nodejs"
        },
        {
            "_id": "54f1605c92c220b31d492227",
            "country": {
                "VN": {
                    "number": 4
                }
            },
            "name": "#php"
        },
        {
            "_id": "54f152d7289899d518f8542a",
            "country": {
                "VN": {
                    "number": 3
                }
            },
            "name": "#PHP"
        },
        {
            "_id": "54f152d7289899d518f8542b",
            "country": {
                "VN": {
                    "number": 3
                }
            },
            "name": "#Developer"
        }
    ]
}

```

### 40. Return top company

```
Post     http://jobpitch.campcoders.com/api/top_hashtag
Content-Type: application/json
Cache-Control: no-cache

```
##### Regex
```
{
  "country_short_name" : "VN",
  "skip"               : 0,
  "limit"              : 10
}



```
##### Return
```
{
    "error_code": 0,
    "top_company": [
        {
            "_id": "54f131a218fe23d37421a084",
            "userName": "cuongvu",
            "followMes": []
        }
    ]
}

```