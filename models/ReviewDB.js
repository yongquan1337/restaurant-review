"use strict"

var db = require('../db-connection');
const Review = require('../Models/Review');

class ReviewDB {
    
    addReview(request, respond) {
        var now = new Date();
        var reviewObject = new Review(null, request.body.restaurant_id, request.body.user_id, request.body.review_title, request.body.review, now.toString(), null,
             request.body.overall_rate, request.body.cost_rate, request.body.service_rate, request.body.food_rate);
        var sql = "INSERT INTO restaurant_review.review (restaurant_id, user_id, review_title, review, create_date, overall_rate, cost_rate, service_rate, food_rate) VALUES(?,?,?,?,?,?,?,?,?);";

        var values = [reviewObject.getRestaurant_id(), reviewObject.getUser_id(), reviewObject.getReview_title(), reviewObject.getReview(), reviewObject.getCreate_date(), reviewObject.getOverall_rate(), 
        reviewObject.getCost_rate(), reviewObject.getService_rate(), reviewObject.getFood_rate()];
        console.log(sql,values)
        db.query(sql, values, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }

    updateReview(request, respond){
        var now = new Date();
            
        var reviewObject = new Review(request.params.review_id, null, null,request.body.review_title, request.body.review, null, now.toString(),
        request.body.overall_rate, request.body.cost_rate, request.body.service_rate, request.body.food_rate);
    
        var sql = "UPDATE restaurant_review.review SET review_title = ?, review = ?, modify_date = ?, overall_rate = ?, cost_rate = ?, service_rate = ?, food_rate = ?  WHERE review_id = ?;";
        var values = [reviewObject.getReview_title(), reviewObject.getReview(), reviewObject.getModify_date(), reviewObject.getOverall_rate(), reviewObject.getCost_rate(), reviewObject.getService_rate(), reviewObject.getFood_rate(),
        reviewObject.getReview_id()];
        
        db.query(sql, values, function (error, result) {
                if(error){
                    throw error;
                }
                else{
                    respond.json(result);
                }
              });
        }

        getReview(request, respond) {
            var review_id = request.params.review_id;
            var sql = "SELECT review.* , user.username FROM restaurant_review.review INNER JOIN restaurant_review.user ON review.user_id = user.user_id WHERE review_id = ?;";
            db.query(sql, review_id, function (error, result) {
                if (error) {
                    throw error;
                }
                else {
                    respond.json(result);
                }
            });
        }

        getRestaurantReviews(request, respond) {
            var restaurant_id = request.params.restaurant_id;
            var sql = "SELECT review.* , user.username, user.profile_pic FROM restaurant_review.review INNER JOIN restaurant_review.user ON review.user_id = user.user_id WHERE restaurant_id = ?;";
            db.query(sql, restaurant_id, function (error, result) {
                if (error) {
                    throw error;
                }
                else {
                    for (var i = 0; i< result.length; i++){
                        result[i].profile_pic = Buffer.from(result[i].profile_pic).toString('ascii');
                        
                    }
                    respond.json(result);
                }
                    
            });
        }

        getUserReviews(request, respond) {
            var user_id = request.params.user_id;
            var sql = "SELECT review.* , user.username, user.profile_pic, restaurant.name FROM restaurant_review.review INNER JOIN restaurant_review.user ON review.user_id = user.user_id INNER JOIN restaurant_review.restaurant ON review.restaurant_id = restaurant.restaurant_id WHERE user.user_id = ?;";
            db.query(sql, user_id, function (error, result) {
                if (error) {
                    throw error;
                }
                else {
                    for (var i = 0; i< result.length; i++){
                        result[i].profile_pic = Buffer.from(result[i].profile_pic).toString('ascii');
                        
                    }
                    respond.json(result);
                }
            });
        }

        deleteReview(request, respond){
            var reviewID = request.params.review_id;
            var sql = "DELETE FROM restaurant_review.review WHERE review_id = ?;";
            db.query(sql, reviewID, function (error, result) {
                if(error){
                    throw error;
                }
                else{
                    respond.json(result);
                }
              });
            }
}

module.exports = ReviewDB;