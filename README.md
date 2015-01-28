## Link POST MAN
```

```
## API


### 1. Upload photo

```
POST http://jobpitch.campcoders.com:6969/api/upload_photo
Content-Type: form-data
Cache-Control: no-cache

{
    "image"         : FILE
}
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
POST http://jobpitch.campcoders.com:6969/api/create_job
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
POST http://jobpitch.campcoders.com:6969/api/edit_job
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
POST http://jobpitch.campcoders.com:6969/api/job_detail
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

### 5. Recent

```
POST http://jobpitch.campcoders.com:6969/api/recent
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
            "image_normal": "http://jobpitch.campcoders.com:6969/images/full_size/JobImages/default-image.png",
            "image_small": "http://jobpitch.campcoders.com:6969/images/full_size/JobImages/default-image.png",
            "image": "http://jobpitch.campcoders.com:6969/images/full_size/JobImages/default-image.png"
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
            "image_normal": "http://jobpitch.campcoders.com:6969/images/normal_size/JobImages/1422471783441.jpeg",
            "image_small": "http://jobpitch.campcoders.com:6969/images/small_size/JobImages/1422471783441.jpeg",
            "image": "http://jobpitch.campcoders.com:6969/images/full_size/JobImages/1422471783441.jpeg"
        }
    ]
}

```

### 6. Apply

```
POST http://jobpitch.campcoders.com:6969/api/apply
Content-Type: application/json
Cache-Control: no-cache

{
    "token"          : "$2a$08$X0......6LUMZFDSa",
    "user_id"        : "54c8580e86d5ce565ceb3168",
    "job_id"         : "54c8580e86d5ce565ceb3168",
    "title"          : "I can do it",
    "description"    : "xxxyyyzzz",
    "hash_tag"       : ["php", "nodejs", "android"]
}
```
##### Regex
```
    job_id           : id of Job

```
##### Return
```
{
    "error_code": 0
}
```

