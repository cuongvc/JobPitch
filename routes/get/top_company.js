var User = require('./../../models/users');

var cacheManager = require('cache-manager');
var memoryCache = cacheManager.caching({
    store: 'memory',
    max: 100,
    ttl: 10000 /*seconds*/
});
var ttl = 5;
var limit = 10;


module.exports = function(req, res) {
    memoryCache.get('top_company', function(err, result) {
        console.log(result);
        if (err || !result || typeof(result) == 'undefined') {
            console.log('search top company');
            User.find({isUser : 2}, 'userName followMes',  function(err, companys) {
                
                companys.sort(function(company_1, company_2) {
                    console.log(company_1 , company_2 );
                    return company_1.followMes.length < company_2.followMes.length;
                });

                companys = companys.slice(0, 10);

                res.write(JSON.stringify({
                    error_code: 0,
                    top_company : companys
                }));
                res.status(200).end();

                memoryCache.set('top_company', companys, ttl, function(err) {
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
