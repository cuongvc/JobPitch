var HashTag = require('./../../models/hashtags');

var cacheManager = require('cache-manager');
var memoryCache = cacheManager.caching({
    store: 'memory',
    max: 100,
    ttl: 10000 /*seconds*/
});
var ttl = 5;


module.exports = function(req, res) {

    var country_short_name = req.body.country_short_name;
    var skip               = req.body.skip;
    var limit              = req.body.limit;

    memoryCache.get('top_hashtag' + country_short_name, function(err, result) {
        console.log('result : ', result);
        if (err || !result || typeof(result) == 'undefined') {
            HashTag.find({}, 'name country.'+country_short_name+'.number',  function(err, hashtags) {
                console.log(hashtags);
                hashtags.sort(function(hashtags_1, hashtags_2) {
                   return hashtags_1.country[country_short_name].number < hashtags_2.country[country_short_name].number;
                });

                hashtags = hashtags.slice(skip, limit);

                res.write(JSON.stringify({
                    error_code: 0,
                    top_hashtag : hashtags
                }));
                res.status(200).end();

                memoryCache.set('top_hashtag' + country_short_name, hashtags, ttl, function(err) {
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
