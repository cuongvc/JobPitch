var Job = require('./../../models/jobs');

var cacheManager = require('cache-manager');
var memoryCache = cacheManager.caching({
    store: 'memory',
    max: 100 ,
    ttl: 5 /*seconds*/
});
var ttl = 100;
var limit = 10;

module.exports = function(req, res) {
    memoryCache.get('top_job', function(err, result) {
        if (err || !result || typeof(result) == 'undefined') {
        	  console.log('search top job');

            Job.find({}, 'title applications', function(err, jobs) {
                jobs.sort(function(job_1, job_2) {
                    return job_1.score < job_2.score;
                });

                jobs = jobs.slice(0, 10);
                res.write(JSON.stringify({
                    error_code: 0,
                    top_job: jobs
                }));
                res.status(200).end();

                memoryCache.set('top_job', jobs, ttl, function(err) {
                    if (err) {
                        console.log(err);
                    }
                });

            })
        } else {
            res.write(JSON.stringify({
                error_code: 0,
                top_job: result
            }));
            res.status(200).end();
        }
    });

}
