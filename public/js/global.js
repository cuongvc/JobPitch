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
	/*
	* SOCKET EVENT
	*/
	var CREATE_JOB_SOCKET_EVENT   = 'create_job';
	var APPLY_JOB_SOCKET_EVENT    = 'apply_job';
	var INTEREST_SOCKET_EVENT     = 'interest_app';
	var LIKE_PITCH_SOCKET_EVENT   = 'like_app';
	var LIKE_COMMENT_SOCKET_EVENT = 'like_comment';

	/*
	* SOCKET ACTION
	*/

	var SOCKET_ACTION = new Object();
		SOCKET_ACTION[CREATE_JOB_SOCKET_EVENT] = 'create a job';
		SOCKET_ACTION[APPLY_JOB_SOCKET_EVENT] = 'pitch on a job';
		