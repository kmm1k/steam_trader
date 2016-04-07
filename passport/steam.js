var SteamStrategy = require('passport-steam').Strategy;
var User = require('../models/user');
var secrets = require('./secrets');


module.exports = function (passport) {
    passport.use('steam', new SteamStrategy({
            returnURL: secrets.steam.returnURL,
            realm: secrets.steam.realm,
            apiKey: secrets.steam.key
        },
        function (identifier, profile, done) {
            User.findOne({'steam.openId': profile.id}, function (err, user) {
                if (err) {
                    console.log('found an error');
                    return done(err);
                }
                //if user with id does not exist in db, make new user
                if (!user) {
                    console.log('Making user: ' + JSON.stringify(profile, null, 4));
                    var newUser = new User();

                    // set the user's local credentials
                    newUser.steam.displayName = profile.displayName;
                    newUser.steam.openId = profile.id;

                    // save the user
                    newUser.save(function (err) {
                        if (err) {
                            console.log('Error in Saving user: ' + err);
                            throw err;
                        }
                        console.log('User Registration successfully');
                        return done(null, newUser);
                    });
                } else {
                    return done(null, user);
                }
            });
        }));
}