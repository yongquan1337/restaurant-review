"use strict"

const restaurantdb = require('../Models/RestaurantDB')
 
var restaurantDBObject = new restaurantdb();

function routeRestaurant(app){
    app.route('/restaurant').get(restaurantDBObject.getAllRestaurant);
    app.route('/restaurant/:restaurant_id').get(restaurantDBObject.restaurantDetail);
    app.route('/filter').post(restaurantDBObject.filterRestaurant);
}


module.exports = {routeRestaurant};