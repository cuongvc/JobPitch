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
    "tag"           : "3333333333333333",
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

```
##### Return
```
{
    "error_code": 0,
    "job": {
        "__v": 0,
        "time": "Wed Jan 28 2015 04:14:10 GMT-0500 (EST)",
        "companyId": "54c8580e86d5ce565ceb3168",
        "_id": "54c8a8634c29af056f8e8f5f",
        "hires": {
            "list": [],
            "number": 0
        },
        "interviews": {
            "list": [],
            "number": 0
        },
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
        "tag": "3333333333333333",
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
    "tag"           : "3333333333333333",
    "hash_tag"      : ["nodejs", "php", "android"],
    "link_direct"   : "http://campcoders.com",
    "lat"           : 100,
    "lng"           : 100,
    "address"       : "Ha Noi, Viet Nam",
    "temp_path"     : "/tmp/upload_dd91afe009b519b97be380d6654f0626",
    "extension"     : "jpeg" 
}

Tat ca cac truong khong sua doi thi gui noi dung cu. Neu khong upload image moi thì temp_path và extension = ''. Neu upload image moi thi gui tuong tu create job

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
        "companyId": "54c8580e86d5ce565ceb3168",
        "_id": "54c8a8634c29af056f8e8f5f",
        "hires": {
            "list": [],
            "number": 0
        },
        "interviews": {
            "list": [],
            "number": 0
        },
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
        "tag": "3333333333333333",
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
        "companyId": "54c8580e86d5ce565ceb3168",
        "_id": "54c8a8634c29af056f8e8f5f",
        "hires": {
            "list": [],
            "number": 0
        },
        "interviews": {
            "list": [],
            "number": 0
        },
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
        "tag": "3333333333333333",
        "title": "3333333333333333333333",
        "image_normal": "http://jobpitch.campcoders.com:6969/images/normal_size/JobImages/1422437385803.jpeg",
        "image_small": "http://jobpitch.campcoders.com:6969/images/small_size/JobImages/1422437385803.jpeg",
        "image": "http://jobpitch.campcoders.com:6969/images/full_size/JobImages/1422437385803.jpeg"
    }
}
```

### 5. Apply

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

