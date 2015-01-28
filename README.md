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
        "time": "Wed Jan 28 2015 04:14:10 GMT-0500 (EST)",
        "user_id": "54c8580e86d5ce565ceb3168",
        "_id": "54c8a8634c29af056f8e8f5f",
        "hire": 0,
        "interview": 0,
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
        "description": "33333333333333333",
        "hash_tag": [
            "nodejs",
            "php",
            "android"
        ],
        "title": "3333333333333333333333",
        "image_normal": "http://jobpitch.campcoders.com:6969/images/normal_size/JobImages/1422437385803.jpeg",
        "image_small": "http://jobpitch.campcoders.com:6969/images/small_size/JobImages/1422437385803.jpeg",
        "image": "http://jobpitch.campcoders.com:6969/images/full_size/JobImages/1422437385803.jpeg"
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
        "time": "Wed Jan 28 2015 04:14:10 GMT-0500 (EST)",
        "user_id": "54c8580e86d5ce565ceb3168",
        "_id": "54c8a8634c29af056f8e8f5f",
        "hire": 0,
        "interview": 0,
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
        "description": "33333333333333333",
        "hash_tag": [
            "nodejs",
            "php",
            "android"
        ],
        "title": "3333333333333333333333",
        "image_normal": "http://jobpitch.campcoders.com:6969/images/normal_size/JobImages/1422437385803.jpeg",
        "image_small": "http://jobpitch.campcoders.com:6969/images/small_size/JobImages/1422437385803.jpeg",
        "image": "http://jobpitch.campcoders.com:6969/images/full_size/JobImages/1422437385803.jpeg"
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
        "time": "Wed Jan 28 2015 04:14:10 GMT-0500 (EST)",
        "user_id": "54c8580e86d5ce565ceb3168",
        "_id": "54c8a8634c29af056f8e8f5f",
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
        "description": "33333333333333333",
        "hash_tag": [
            "nodejs",
            "php",
            "android"
        ],
        "title": "3333333333333333333333",
        "image_normal": "http://jobpitch.campcoders.com:6969/images/normal_size/JobImages/1422437385803.jpeg",
        "image_small": "http://jobpitch.campcoders.com:6969/images/small_size/JobImages/1422437385803.jpeg",
        "image": "http://jobpitch.campcoders.com:6969/images/full_size/JobImages/1422437385803.jpeg"
    }
}
```

### 5. Recent

```
POST http://jobpitch.campcoders.com:6969/api/recent
Content-Type: application/json
Cache-Control: no-cache

{
    "token"         : "$2a$08$X0jvCjP377cp5eqPAwVvr.AssoagMvMBs0YG576LUMZFDSa",
    "user_id"       : "54c8580e86d5ce565ceb3168",
    "lat"           : 100,
    "lng"           : 100,
    "tag"           : "Nodejs",
    "address"       : "26 Nguyen Hong, Ha Noi, Viet Nam"
}

    + lat, lng, address la  required. Gui location cua user da luu.

        Neu user doi location hoac thong tin user khong co location (khi lan dau dang nhap - de mac dinh lat = 40.681966, lng =  -73.998220, address = "417 Clinton St Brooklyn, NY 11231, Hoa Kỳ") thi xin quyen lay location roi gui. 

    + tag : filter job theo tag

```
##### Regex
```

```
##### Return
```
{
    "error_code": 0,
    "job": {
        "__v": 0,
        "time": "Wed Jan 28 2015 04:14:10 GMT-0500 (EST)",
        "user_id": "54c8580e86d5ce565ceb3168",
        "_id": "54c8a8634c29af056f8e8f5f",
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
        "description": "33333333333333333",
        "hash_tag": [
            "nodejs",
            "php",
            "android"
        ],
        "title": "3333333333333333333333",
        "image_normal": "http://jobpitch.campcoders.com:6969/images/normal_size/JobImages/1422437385803.jpeg",
        "image_small": "http://jobpitch.campcoders.com:6969/images/small_size/JobImages/1422437385803.jpeg",
        "image": "http://jobpitch.campcoders.com:6969/images/full_size/JobImages/1422437385803.jpeg"
    }
}
```

### 6. Apply

```
POST http://jobpitch.campcoders.com:6969/api/recent
Content-Type: application/json
Cache-Control: no-cache

{
    "token"          : "$2a$08$X0jvCjP377cp5eqPAwVvr.AssoagMvMBs0YG576LUMZFDSa",
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

