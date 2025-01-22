"use strict"

const favouritedb = require('../models/FavouriteDB');

var favouriteDBObject = new favouritedb();


function routeFavourite(app){
	app.route('/favourite/:user_id').get(favouriteDBObject.getFavourite);
	app.route('/favourite').post(favouriteDBObject.favouriteRestaurant);
	app.route('/favourite/').delete(favouriteDBObject.unfavouriteRestaurant);
	app.route('/favouriteCheck').post(favouriteDBObject.favouriteCheck);
}

module.exports = {routeFavourite};