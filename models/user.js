var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
    steam: {
        openId      : String,
        token       : String,
        steamId     : String,
        displayName : String
    }
});