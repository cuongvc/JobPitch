var User = require('./../../models/users');

var cacheManager = require('cache-manager');
var memoryCache = cacheManager.caching({
    store: 'memory',
    max: 100,
    ttl: 5 /*seconds*/
});
var ttl = 5;


module.exports = function(req, res) {

    var country_short_name = req.body.country_short_name;
    var skip               = req.body.skip;
    var limit              = req.body.limit;

    memoryCache.get('top_company' + country_short_name, function(err, result) {
        if (err || !result || typeof(result) == 'undefined') {
            User.find({$and : [{isUser : 2}, {'position.country.short_name' : country_short_name}]}, 
                      'userName score tagname',  function(err, companys) {
                
                companys.sort(function(company_1, company_2) {
                   return company_1.score < company_2.score;
                });

                companys = companys.slice(skip, limit);

                res.write(JSON.stringify({
                    error_code: 0,
                    top_company : companys
                }));
                res.status(200).end();

                memoryCache.set('top_company' + country_short_name, companys, ttl, function(err) {
                    if (err) {
                        console.log(err);
                    }
                });

            })
        } else {
            res.write(JSON.stringify({
                error_code: 0,
                top_company: result
            }));
            res.status(200).end();
        }
    });

}
