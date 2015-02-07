var Permalink = require('./../../models/permalinks');

module.exports = function(permalink, callback) {
    console.log(Permalink);
    Permalink.findOne({  permalink: permalink }, function(err, permalink_exist) {
        if (err) {
            console.log(err);
            callback(1);
        } else

        if (!permalink_exist) {
            callback(0);

        } else
            callback(1);
    })
}
