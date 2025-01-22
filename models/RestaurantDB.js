"use strict"
var db = require('../db-connection');

class RestaurantDB{
    getAllRestaurant(request, respond){
        var sql = "SELECT restaurant.* , AVG(review.overall_rate) as overall FROM restaurant_review.restaurant LEFT JOIN restaurant_review.review ON restaurant.restaurant_id = review.restaurant_id GROUP BY restaurant_id;";
        db.query(sql, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }

    
    restaurantDetail(request, respond){
        var restaurant_id = request.params.restaurant_id;
        var sql = "SELECT restaurant.* , AVG(review.overall_rate) as overall, AVG(review.cost_rate) as cost, AVG(review.food_rate) as food, AVG(review.service_rate) as service, COUNT(review_id) as numreviews  FROM restaurant_review.restaurant INNER JOIN restaurant_review.review ON restaurant.restaurant_id = review.restaurant_id WHERE restaurant.restaurant_id = ?;";
        

        db.query(sql,restaurant_id, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }

    

    filterRestaurant(request, respond){
        var sql = "";
        var values = [];

        var cuisine = request.body.cuisine;
        console.log("cuisinee" + cuisine);
        var region = request.body.region;
        var search = request.body.search;
        

        if (cuisine != undefined && region != undefined && search != undefined){
            search = '%' + search + '%';
            values = [cuisine, region, search];
            sql = "SELECT restaurant.* , AVG(review.overall_rate) as overall FROM restaurant_review.restaurant LEFT JOIN restaurant_review.review ON restaurant.restaurant_id = review.restaurant_id WHERE cuisine = ? AND region = ? AND name LIKE ? GROUP BY restaurant_id;";
        }
        else if (cuisine != undefined && region != undefined){
            values = [cuisine, region];
            sql = "SELECT restaurant.* , AVG(review.overall_rate) as overall FROM restaurant_review.restaurant LEFT JOIN restaurant_review.review ON restaurant.restaurant_id = review.restaurant_id WHERE cuisine = ? AND region = ? GROUP BY restaurant_id;"
        }
        else if (cuisine != undefined && search != undefined){
            search = '%' + search + '%';
            values = [cuisine, search];
            sql = "SELECT restaurant.* , AVG(review.overall_rate) as overall FROM restaurant_review.restaurant LEFT JOIN restaurant_review.review ON restaurant.restaurant_id = review.restaurant_id WHERE cuisine = ? AND name LIKE ? GROUP BY restaurant_id;"
        }
        else if (region != undefined && search != undefined){
            search = '%' + search + '%';
            values = [region, search];
            sql = "SELECT restaurant.* , AVG(review.overall_rate) as overall FROM restaurant_review.restaurant LEFT JOIN restaurant_review.review ON restaurant.restaurant_id = review.restaurant_id WHERE region = ? AND name LIKE ? GROUP BY restaurant_id;"
        }
        else if (cuisine != undefined){
            values = [cuisine];
            sql = "SELECT restaurant.* , AVG(review.overall_rate) as overall FROM restaurant_review.restaurant LEFT JOIN restaurant_review.review ON restaurant.restaurant_id = review.restaurant_id WHERE cuisine = ? GROUP BY restaurant_id;"
        }
        else if (region != undefined){
            values = [region];
            sql = "SELECT restaurant.* , AVG(review.overall_rate) as overall FROM restaurant_review.restaurant LEFT JOIN restaurant_review.review ON restaurant.restaurant_id = review.restaurant_id WHERE region = ? GROUP BY restaurant_id;"
        }
        else if (search != undefined){
            search = '%' + search + '%';
            values = [search];
            sql = "SELECT restaurant.* , AVG(review.overall_rate) as overall FROM restaurant_review.restaurant LEFT JOIN restaurant_review.review ON restaurant.restaurant_id = review.restaurant_id WHERE name LIKE ? GROUP BY restaurant_id;"
        }
        else{
            search = '%%';
            values = [search];
            sql = "SELECT restaurant.* , AVG(review.overall_rate) as overall FROM restaurant_review.restaurant LEFT JOIN restaurant_review.review ON restaurant.restaurant_id = review.restaurant_id WHERE name LIKE ? GROUP BY restaurant_id;"
        }
    
        db.query(sql,values, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }
    
}

module.exports = RestaurantDB;