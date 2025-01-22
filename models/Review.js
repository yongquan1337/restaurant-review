"use strict";
class Review {
    constructor(review_id, restaurant_id, user_id, review_title, review, create_date, modify_date, overall_rate, cost_rate, service_rate, food_rate, review_img) {
        this.review_id = review_id;
        this.restaurant_id = restaurant_id;
        this.user_id = user_id;
        this.review_title = review_title;
        this.review = review;
        this.create_date = create_date;
        this.modify_date = modify_date;
        this.overall_rate = overall_rate;
        this.cost_rate = cost_rate;
        this.service_rate = service_rate;
        this.food_rate = food_rate;
    }
    //add the set and get methods here
    getReview_id() {
        return this.review_id;
    }
    getRestaurant_id() {
        return this.restaurant_id;
    }
    getUser_id() {
        return this.user_id;
    }
    getReview_title() {
        return this.review_title;
    }
    getReview() {
        return this.review;
    }
    getCreate_date() {
        return this.create_date;
    }
    getModify_date() {
        return this.modify_date;
    }
    getOverall_rate() {
        return this.overall_rate;
    }
    getCost_rate(){
        return this.cost_rate;
    }
    getService_rate(){
        return this.service_rate;
    }
    getFood_rate(){
        return this.food_rate;
    }
   

    setRestaurant_id(restaurant_id) {
        this.restaurant_id = restaurant_id;
    }
    setUser_id(user_id) {
        this.user_id = user_id;
    }
    setReview(review) {
        this.review = review;
    }
    setCreate_date(create_date) {
        this.create_date = create_date;
    }
    setModify_date(modify_date) {
        this.modify_date = modify_date;
    }
    setOverall_rate(overall_rate) {
        this.overall_rate = overall_rate;
    }
    setCost_rate(cost_rate){
        this.cost_rate = cost_rate;
    }
    setService_rate(service_rate){
        this.service_rate = service_rate;
    }
    setFood_rate(food_rate){
        this.food_rate = food_rate;
    }
}
module.exports = Review;
