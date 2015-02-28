	var BASE_URL              = 'http://job.dev';
	
	if(document.location.host == 'jobpitch.campcoders.com') BASE_URL = 'http://jobpitch.campcoders.com';
	
	var STR_UPLOAD_IMAGE         = BASE_URL + '/api/upload_photo';
	var STR_API_CREATE_JOB       = BASE_URL + '/api/create_job';
	var STR_API_GETP_RECENT      = BASE_URL + '/api/recent';
	var STR_API_APPLY            = BASE_URL + '/api/apply';
	var STR_API_COMMENT          = BASE_URL + '/api/comment';
	var STR_API_JOB_DETAIL       = BASE_URL + '/api/job_detail';
	
	var STR_API_SIGN_UP          = BASE_URL + '/api/signup_email';
	var STR_API_LOGIN            = BASE_URL + '/api/login_email';
	var STR_API_TAGS             = BASE_URL + '/api/tags';
	var STR_API_LIKE             = BASE_URL + '/api/like';
	var STR_API_GET_USER         = BASE_URL + '/api/users';
	var STR_API_FOLLOW           = BASE_URL + '/api/follow';
	var STR_API_GET_NOTIFICATION = BASE_URL + '/api/get_notify';
	var STR_API_GET_PITCH        = BASE_URL + '/api/get_applications';
	var STR_API_GET_COMMENTS     = BASE_URL + '/api/get_comments';
	var STR_API_MY_JOBS          = BASE_URL + '/api/my_jobs';
	var STR_API_INTEREST         = BASE_URL + '/api/interest';
	var STR_API_GET_JOB          = BASE_URL + '/api/get_jobs';
	var STR_API_EDIT_AVATAR      = BASE_URL + '/api/edit_avatar';
	var STR_API_USER_PROFILE     = BASE_URL + '/api/user';
	var STR_API_FORGOT_PASSWORD  = BASE_URL + '/api/forgot_password';
	var STR_API_EDIT_JOB         = BASE_URL + '/api/edit_job';
	var STR_API_SEARCH_KEY_WORD  = BASE_URL + '/api/search_keyword';
	var STR_API_TOP_HASHTAG      = BASE_URL + '/api/top_hashtag';
	var STR_API_TOP_COMPANY      = BASE_URL + '/api/top_company';
	var STR_API_SEARCH_HASHTAG   = BASE_URL + '/api/search_tag';
	var STR_API_CHANGE_LOCATION  = BASE_URL + '/api/swing_current';
	var STR_API_SUGGEST_HASHTAG  = BASE_URL + '/api/suggest/hashtag';
	/*
	* SOCKET EVENT
	*/
	var CREATE_JOB_SOCKET_EVENT    = 'create_job';
	var APPLY_JOB_SOCKET_EVENT     = 'apply_job';
	var INTEREST_SOCKET_EVENT      = 'interest_app';
	var LIKE_PITCH_SOCKET_EVENT    = 'like_app';
	var LIKE_JOB_SOCKET_EVENT      = 'like_job';
	var LIKE_COMMENT_SOCKET_EVENT  = 'like_comment';
	var COMMENT_PITCH_SOCKET_EVENT = 'comment_apply';

	/*
	* SOCKET ACTION
	*/

	var SOCKET_ACTION = new Object();
		SOCKET_ACTION[CREATE_JOB_SOCKET_EVENT] = 'create new job';
		SOCKET_ACTION[APPLY_JOB_SOCKET_EVENT]  = 'pitch on a job';
		SOCKET_ACTION[INTEREST_SOCKET_EVENT]   = 'like your pitch';
		SOCKET_ACTION[LIKE_PITCH_SOCKET_EVENT] = 'like your pitch';
		SOCKET_ACTION[LIKE_JOB_SOCKET_EVENT]   = 'like your job';
		SOCKET_ACTION[COMMENT_PITCH_SOCKET_EVENT]   = 'comment on your pitch';
		
	/*
	* NOTIFICATION TYPE
	*/
	var NOTIFY_TYPE = new Object();
		NOTIFY_TYPE.CREATE_JOB        = 11;
		NOTIFY_TYPE.APPLY_JOB            = 12;
		NOTIFY_TYPE.LIKE_JOB          = 13;
		NOTIFY_TYPE.SHARE_JOB         = 14;
		NOTIFY_TYPE.CHANGE_JOB_STATUS = 15;

		NOTIFY_TYPE.INTEREST_PITCH    = 21;
		NOTIFY_TYPE.HIRE_PITCH        = 22;
		NOTIFY_TYPE.LIKE_PITCH        = 23;
		NOTIFY_TYPE.SHARE_PITCH       = 24;
		NOTIFY_TYPE.COMMENT_PITCH     = 25;
		
		NOTIFY_TYPE.LIKE_COMMENT      = 31;
		NOTIFY_TYPE.SHARE_COMMENT     = 32;
		NOTIFY_TYPE.COMMENT_COMMENT   = 33;
	/*
	* Broadcast event
	*/
	var RELOAD_INDEX = 'reload_index';

