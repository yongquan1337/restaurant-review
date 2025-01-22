"use strict"
var db = require('../db-connection');
const Favourite = require('../Models/Favourite');

class FavouriteDB{
    getFavourite(request, respond){
        var sql = "SELECT restaurant.* , favourite.*, AVG(review.overall_rate) FROM restaurant_review.favourite INNER JOIN restaurant_review.restaurant ON restaurant.restaurant_id = favourite.restaurant_id LEFT JOIN restaurant_review.review ON restaurant.restaurant_id = review.restaurant_id WHERE favourite.user_id = ? GROUP BY favourite_id;";
        var user_id = request.params.user_id;
        db.query(sql,user_id, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }

    favouriteCheck(request, respond){
        var sql = "SELECT EXISTS(SELECT 1 FROM restaurant_review.favourite WHERE user_id = ? AND restaurant_id = ?) AS favCheck;";
        var values = [request.body.user_id, request.body.restaurant_id];
        db.query(sql, values, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }

    
    favouriteRestaurant(request, respond){
        var favouriteObject = new Favourite(null, request.body.restaurant_id, request.body.user_id)
        var Values = [favouriteObject.getRestaurant_id(), favouriteObject.getUser_id()]
        var sql = "INSERT INTO restaurant_review.favourite (restaurant_id, user_id) VALUES (?,?);";
        

        db.query(sql,Values, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }

    unfavouriteRestaurant(request, respond){
        var favouriteObject = new Favourite(null, request.body.restaurant_id, request.body.user_id)
        var Values = [favouriteObject.getRestaurant_id(), favouriteObject.getUser_id()]
        var sql = "DELETE FROM restaurant_review.favourite WHERE restaurant_id = ? AND user_id = ?;";
        

        db.query(sql,Values, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }
    
}  

module.exports = FavouriteDB;