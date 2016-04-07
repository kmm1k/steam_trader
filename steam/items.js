// === FOR node-steam-user ===
var SteamUser = require('steam-user');
var client = new SteamUser();
// === END FOR node-steam-user ===
var TradeOfferManager = require('steam-tradeoffer-manager');
var secrets = require('../passport/secrets');



var items = function() {


    items.getItems = function(steamid, callback) {
        var manager = new TradeOfferManager({
            "steam": client,
            "language": "en"
        });
        manager.loadUserInventory(steamid, 730, 2, 1, function (err, inventory) {
            if (err) {
                console.log(err);
            } else {

                console.log("items.js", inventory)
                callback(inventory)
            }
        });
    }

}



module.exports = items




