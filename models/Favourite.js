"use strict"

class Favourite {
    constructor(favourite_id, restaurant_id, user_id) {
        this.favourite_id = favourite_id;
        this.restaurant_id = restaurant_id;
        this.user_id = user_id;
    }
    //add the get methods here
    
    getFavourite_id() {
        return this.name;
    }
    getRestaurant_id() {
        return this.restaurant_id;
    }
    getUser_id(){
        return this.user_id;
    }
}
module.exports = Favourite;