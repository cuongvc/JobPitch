var HashTag = require('./../../models/tags');

var cacheManager = require('cache-manager');
var memoryCache = cacheManager.caching({
    store: 'memory',
    max: 100,
    ttl: 10000 /*seconds*/
});
var ttl = 5;
var limit = 10;


module.exports = function(req, res) {
    memoryCache.get('top_hashtag', function(err, result) {
        console.log(result);
        if (err || !result || typeof(result) == 'undefined') {
            HashTag.find({}, 'name number',  function(err, hashtags) {
                
                hashtags.sort(function(hashtags_1, hashtags_2) {
                   return hashtags_1.number < hashtags_2.number;
                });

                hashtags = hashtags.slice(0, 10);

                res.write(JSON.stringify({
                    error_code: 0,
                    top_hashtag : hashtags
                }));
                res.status(200).end();

                memoryCache.set('top_hashtag', hashtags, ttl, function(err) {
                    if (err) {
                        console.log(err);
                    }
                });

            })
        } else {
            res.write(JSON.stringify({
                error_code: 0,
                top_hashtag: result
            }));
            res.status(200).end();
        }
    });

}
