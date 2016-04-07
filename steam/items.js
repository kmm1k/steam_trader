// example on how to make a module 1
var steam = require('steam-web');
var secrets = require('../passport/secrets');



var items = function() {
    var s = new steam({
        apiKey: secrets.steam.key,
        format: 'json'
    });


    items.getItems = function(steamid, callback) {
        console.log(steamid)
        s.getPlayerItems({
            gameid: 730,
            steamid: steamid,
            callback: function(err, data) {
                if (err) {
                    console.log(err)
                }
                callback(data);
            }
        })
    }

    items.get

}



module.exports = items




