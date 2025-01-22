"use strict"

class Restaurant {
    constructor(restaurant_id, name, lat, lng, address, availability, hotline, website, detail, cuisine, region, thumbnail1, thumbnail2, thumbnail3) {
        this.restaurant_id = restaurant_id;
        this.name = name;
        this.lat = lat;
        this.lng = lng;
        this.address = address;
        this.availability = availability;
        this.hotline = hotline;
        this.website = website;
        this.detail = detail;
        this.cuisine = cuisine;
        this.region = region;
        this.thumbnail1 = thumbnail1;
        this.thumbnail2 = thumbnail2;
        this.thumbnail3 = thumbnail3;
    }
    //add the get methods here
    getRestaurant_id() {
        return this.restaurant_id;
    }
    getName() {
        return this.name;
    }
    getLat(){
        return this.lat;
    }
    getLng(){
        return this.lng;
    }
    getAddress() {
        return this.address;
    }
    getAvailability(){
        return this.availability;
    }
    getHotline(){
        return this.hotline;
    }
    getWebsite(){
        return this.website;
    }
    getDetail(){
        return this.detail;
    }
    getCuisine(){
        return this.cuisine;
    }
    getRegion(){
        return this.region;
    }
    getThumbnail1(){
        return this.thumbnail1;
    }
    getThumbnail2(){
        return this.thumbnail2;
    }
    getThumbnail3(){
        return this.thumbnail3;
    }
}
module.exports = Restaurant;