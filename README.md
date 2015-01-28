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
    "token"         : "$2a$08$X0jvCjP377cp5eqPAwVvr.AssoagMvMBs0YG576LUMZFDSa",
    "user_id"       : "54c8580e86d5ce565ceb3168",
    "desc"          : "This is desc"
    "title"       : "This is title"
    "tag"           : "Nodejs",
    "hash_tag"      : ["nodejs", "php", "android"],
    "link_direct"   : "this is link_direct"
    "image"         : FILE
    "lat"           : 100
    "lng"           : 100
    "address"       : "Ha Noi, Viet Nam"
}
```
##### Regex
```
    address     : Suggest of Google
    link_direct : url
    file        : File

```
##### Return
```
{
    "error_code": 0,
    "job": {
        "__v": 0,
        "time": "Tue Jan 27 2015 23:17:58 GMT-0500 (EST)",
        "companyId": "54c8580e86d5ce565ceb3168",
        "_id": "54c862f6d8f61d810c1f817d",
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
        "link_direct": "this is link_direct",
        "description": "This is desc",
        "tag": "Nodejs",
        "title": "This is title",
        "hash_tag"      : ["nodejs", "php", "android"],
        "image_normal": "http://jobpitch.campcoders.com:6969/images/normal_size/JobImages/1422418752982.png",
        "image_small": "http://jobpitch.campcoders.com:6969/images/small_size/JobImages/1422418752982.png",
        "image": "http://jobpitch.campcoders.com:6969/images/full_size/JobImages/1422418752982.png"
    }
}
```

### 2. Edit Job

```
POST http://jobpitch.campcoders.com:6969/api/edit_job
Content-Type: form-data
Cache-Control: no-cache

{
    "token"         : "$2a$08$X0jvCjP377cp5eqPAwVvr.AssoagMvMBs0YG576LUMZFDSa",
    "user_id"       : "54c8580e86d5ce565ceb3168",
    "job_id"        : "54c8580e86d5ce565ceb3168"
    "desc"          : "This is desc"
    "title"       : "This is title"
    "tag"           : "Nodejs"
    "hash_tag"      : ["nodejs", "php", "android"],
    "link_direct"   : "this is link_direct"
    "image"         : FILE
    "lat"           : 100
    "lng"           : 100
    "address"       : "Ha Noi, Viet Nam"
}

Neu 1 truong nao do khong thay doi, gui lai thong tin cu cho tien sua chua. image khong thay doi thi khong can gui.

```
##### Regex
```
    address     : Suggest of Google
    link_direct : url
    file        : File

```
##### Return
```
{
    "error_code": 0,
    "job": {
        "__v": 0,
        "time": "Tue Jan 27 2015 23:17:58 GMT-0500 (EST)",
        "companyId": "54c8580e86d5ce565ceb3168",
        "_id": "54c862f6d8f61d810c1f817d",
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
        "link_direct": "this is link_direct",
        "description": "This is desc",
        "tag": "Nodejs",
        "title": "This is title",
        "hash_tag"      : ["nodejs", "php", "android"],
        "image_normal": "http://jobpitch.campcoders.com:6969/images/normal_size/JobImages/1422418752982.png",
        "image_small": "http://jobpitch.campcoders.com:6969/images/small_size/JobImages/1422418752982.png",
        "image": "http://jobpitch.campcoders.com:6969/images/full_size/JobImages/1422418752982.png"
    }
}
```



### 3. JobDetail

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
        "time": "Tue Jan 27 2015 23:17:58 GMT-0500 (EST)",
        "companyId": "54c8580e86d5ce565ceb3168",
        "_id": "54c862f6d8f61d810c1f817d",
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
        "link_direct": "this is link_direct",
        "description": "This is desc",
        "tag": "Nodejs",
        "title": "This is title",
        "image_normal": "http://jobpitch.campcoders.com:.....18752982.png",
        "image_small": "http://jobpitch.campcoders.com:69..2418752982.png",
        "image": "http://jobpitch.campcoders.com......s/1422418752982.png"
    }
}
```

### 4. Apply

```
POST http://jobpitch.campcoders.com:6969/api/recent
Content-Type: application/json
Cache-Control: no-cache

{
    "token"         : "$2a$08$X0jvCjP377cp5eqPAwVvr.AssoagMvMBs0YG576LUMZFDSa",
    "user_id"       : "54c8580e86d5ce565ceb3168",
    "job_id"         : "54c8580e86d5ce565ceb3168",
    "title"       : "I can do it",
    "description"   : "xxxyyyzzz"
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

