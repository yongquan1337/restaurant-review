"use strict"

const reviewdb = require('../models/ReviewDB');

var reviewDBObject = new reviewdb();

function routeReview(app){
    
    app.route('/review').post(reviewDBObject.addReview);

    

    app.route('/review/:review_id').get(reviewDBObject.getReview);
    
    app.route('/editReview/:review_id').put(reviewDBObject.updateReview);

    app.route('/restaurant/review/:restaurant_id').get(reviewDBObject.getRestaurantReviews);

    app.route('/user/review/:user_id').get(reviewDBObject.getUserReviews);

    app.route('/review/:review_id').delete(reviewDBObject.deleteReview);
    
}
module.exports = {routeReview};