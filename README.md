## Link POST MAN
```
    https://www.getpostman.com/collections/5e4a4bd783c5b95ee492


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
    "lat"           : 100,
    "lng"           : 100,
    "address"       : "Ha Noi, Viet Nam",
    "temp_path"     : "/tmp/upload_fcfb4234b9a58ed1052b53a8e30dca92",
    "extension"     : "jpeg" 
}

    temp_path va extension la tu api upload_photo

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
    "token"         : "$2a$08$X0jvCjP377cp5eqPAwVvr.uZqLN/AssoagMvMBs0YG576LUMZFDSa",
    "user_id"       : "54c8580e86d5ce565ceb3168",
    "desc"          : "33333333333333333",
    "title"         : "3333333333333333333333",
    "hash_tag"      : ["nodejs", "php", "android"],
    "link_direct"   : "http://campcoders.com",
    "lat"           : 100,
    "lng"           : 100,
    "address"       : "Ha Noi, Viet Nam",
    "temp_path"     : "/tmp/upload_dd91afe009b519b97be380d6654f0626",
    "extension"     : "jpeg" 
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
    "lat"           : 21.018549,
    "lng"           : 105.812198,
    "tag"           : "HR",
    "address"       : "9 Nguyên Hong, Thành Công, Ba Đình, Hà Nội, Việt Nam"
}

    + lat, lng, address la  required. Gui location cua user da luu.

        Neu user doi location hoac thong tin user khong co location (khi lan 
        dau dang nhap - de mac dinh lat = 40.681966, lng =  -73.998220, 
        address = "417 Clinton St Brooklyn, NY 11231, Hoa Kỳ") thi xin 
        quyen lay location roi gui. 

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
    file             : link lay tu api 14 : upload file

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
    "token"             : "$2a$08$MsIS...xaiYNfi",
    "user_id"           : "54c9ee7a202b449e430cc43b",
    "type_account"      : "1",
    "logo"              : "/tmp/upload_9821b519a328625a770f7a107780a202",
    "extension"         : "jpeg",
    "address"           : "9 Nguyên Hồng, Thành Công, Ba Đình, Hà Nội, ",
    "contact"           : "",
    "website"           : "",
    "companyName"       : "",
    "avatar"            : "",
    "userFullname"      : "",
    "industry"          : "",
    "education"         : "",
    "year_of_birth"     : ""
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
        "_id": "54c9ee7a202b449e430cc43b",
        "companyName": "",
        "gender": "male",
        "userName": "Coders Camp",
        "year_of_birth": null,
        "education": "",
        "industry": "",
        "userFullname": "",
        "avatar_normal": "http://job.dev/images/normal_size/TalentImages/1422582404102.jpeg",
        "avatar_small": "http://job.dev/images/small_size/TalentImages/1422582404102.jpeg",
        "avatar": "http://job.dev/images/full_size/TalentImages/1422582404102.jpeg",
        "friends": [],
        "myFollows": [],
        "myApplications": [],
        "myJobs": [],
        "followMes": [],
        "website": "",
        "companyFullname": "",
        "logo_normal": "http://job.dev/images/normal_size/CompanyLogos/1422581837039.jpeg",
        "logo_small": "http://job.dev/images/small_size/CompanyLogos/1422581837039.jpeg",
        "logo": "http://job.dev/images/full_size/CompanyLogos/1422581837039.jpeg",
        "active": 1,
        "permission": 0,
        "token": "$2a$08$MsIS/taIt3rc67utvP0f6uGjE4yn.dn6O/eIHBsq.15e1mxaiYNfi",
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
            "access_token": "CAAV3ZBbwWAoYBAFli79pXejjYngfhXxZAPdyh1csk29Ggqo7myGO8htQdcifCYvVRmCSobCOwZBcYvtW5ToUZCYGxKZABWfZCcK9Md9nY4cLj6a4z0xS8RvNdIv7WiwBwA7EOXF77gtjCCV2rK20fl6Fd6LT9mrAdYVjoS6yudGxFfxuyZAp4bAZBNzecYcgGv5ip8rrtpj6tEKE9uC2DUPT",
            "email": "campcoders@gmail.com",
            "profileUrl": "https://www.facebook.com/app_scoped_user_id/1388447568130299/",
            "gender": "male",
            "username": "Coders Camp",
            "avatar": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpf1/v/t1.0-1/10429471_1382379502070439_8203398351903245362_n.jpg?oh=6910ddc76345d155b85b5181ca9ec73a&oe=5522B22A&__gda__=1428332989_5dea252caac1001e967472426a3ddecb",
            "id": "1388447568130299"
        },
        "local_infor": {
            "email": "vcc.bka@gmail.com",
            "password": "k12j3j12po312o;u3u213;u12o3b"
        },
        "type_account": 1,
        "location": {
            "address": "9 Nguyên Hồng, Thành Công, Ba Đình, Hà Nội, Việt Nam",
            "lng": 105.812198,
            "lat": 21.018549
        },
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
    "comment_parent"        : "54d104892b6d292c1e71cb96"
}

application_parent va comment_parent o day la application/comment ma user 
comment vao. Chi 1 trong 2 co gia tri, cai con lai bang ""

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
