/**
 * Created by karl on 29.03.2016.
 */

var SteamUser = require('steam-user');
var Steamcommunity = require('steamcommunity');
var SteamTotp = require('steam-totp');
var TradeOfferManager = require('steam-tradeoffer-manager');
var fs = require('fs');

var client = new SteamUser();