"use strict"

class User {
    constructor(user_id, first_name, last_name, email, username, password, mobile_number, profile_pic, gender, address) {
        this.user_id = user_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.username = username;
        this.password = password;
        this.mobile_number = mobile_number;
        this.profile_pic = profile_pic;
        this.gender = gender;
        this.address = address;
    }
    getUser_id() {
        return this.user_id;
    }
    getFirst_name() {
        return this.first_name;
    }
    getLast_name() {
        return this.last_name;
    }
    getEmail() {
        return this.email;
    }
    getUsername() {
        return this.username;
    }
    getPassword() {
        return this.password;
    }
    getMobile_number() {
        return this.mobile_number;
    }
    getProfile_pic() {
        return this.profile_pic;
    }
    getGender() {
        return this.gender;
    }
    getAddress() {
        return this.address;
    }
}
module.exports = User;