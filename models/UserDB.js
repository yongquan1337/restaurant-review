"use strict";
const { request } = require('express');
var db = require('../db-connection');
const sgMail = require('@sendgrid/mail')

const User = require('../Models/User');

class userDB {

    getLoginCredentials(request, respond) {
        var username = request.body.username;
        var password = request.body.password;
        var msg = "";

        var sql = "SELECT user_id, profile_pic, username, password FROM restaurant_review.user WHERE username = ?;";

        db.query(sql, [username], function (error, result) {
            if (error) {
                throw error;
            }
            else {
                if (result.length > 0) {
                    if (password == result[0].password) {
                        msg = "SUCCESS!";
                        console.log(msg);
                    }
                    else {
                        msg = "FAIL!";
                        console.log(msg);
                    }
                }
                else {
                    msg = "USER NOT FOUND!";
                    console.log(msg);
                }
                result[0].profile_pic = Buffer.from(result[0].profile_pic).toString('ascii');
                respond.json(prepareMessage(msg, result[0].user_id, result[0].profile_pic, result[0].username));
            }
        });
    }

    getUserInfo(request, respond) {
        var sql = "SELECT * FROM restaurant_review.user WHERE user_id = ?;";
        var user_id = request.params.user_id;


        db.query(sql, user_id, function (error, result) {
            if (error) {
                throw error;
            }
            else {

                respond.json(result);
            }
        });
    }

    checkUsers(request, respond) {
        var validUser = null;
        var validEmail = null;
        var sqlUser = "SELECT EXISTS(SELECT 1 FROM restaurant_review.user WHERE username = ?) AS userCheck;";
        var sqlEmail = "SELECT EXISTS(SELECT 1 FROM restaurant_review.user WHERE email = ?) AS emailCheck;";
        db.query(sqlUser, request.body.username, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                validUser = (result[0].userCheck);
                console.log(validUser);
                if (validUser == 1) {
                    var msg = "invalid username";
                    respond.json(prepareMessage(msg));
                }
                else {
                    db.query(sqlEmail, request.body.email, function (error, result) {
                        if (error) {
                            throw error;
                        }
                        else {
                            validEmail = (result[0].emailCheck);
                            console.log(validEmail);
                            if (validEmail == 1) {
                                var msg = "invalid Email";
                                respond.json(prepareMessage(msg));
                            }
                            else {
                                msg = "valid";
                                respond.json(prepareMessage(msg));
                            }
                        }
                    });
                }
            }
        });


    }


    addUser(request, respond) {
        var userObject = new User(null, request.body.first_name, request.body.last_name, request.body.email, request.body.username, request.body.password,
            request.body.mobile_number, null, request.body.gender, request.body.address);
        var sql = "INSERT INTO restaurant_review.user (first_name, last_name, email, username, password, mobile_number, gender, address) VALUES(?,?,?,?,?,?,?,?);";

        var values = [userObject.getFirst_name(), userObject.getLast_name(), userObject.getEmail(), userObject.getUsername(),
        userObject.getPassword(), userObject.getMobile_number(), userObject.getGender(), userObject.getAddress()];

        db.query(sql, values, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }

    deleteUser(request, respond) {
        var user_id = request.params.user_id;
        var sql = "DELETE FROM restaurant_review.user WHERE user_id = ?;";
        db.query(sql, user_id, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }

    updateUser(request, respond) {

        var userObject = new User(request.params.user_id, request.body.first_name, request.body.last_name, null, null, null,
            request.body.mobile_number, request.body.profile_pic, request.body.gender, request.body.address);

        var sql = "UPDATE restaurant_review.user SET first_name = ?, last_name = ?, mobile_number = ?, profile_pic = ?, gender = ?, address = ? WHERE user_id = ?;";
        var values = [userObject.getFirst_name(), userObject.getLast_name(), userObject.getMobile_number(), userObject.getProfile_pic(),
        userObject.getGender(), userObject.getAddress(), userObject.getUser_id()];

        db.query(sql, values, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });

    }
    updateUserPassword(request, respond) {

        var sql = "UPDATE restaurant_review.user SET password = ? WHERE user_id = ?;";
        var values = [request.body.password, request.params.user_id]

        db.query(sql, values, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }

    forgetUpdate(request, respond) {
        var length = 8,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        var sql = "UPDATE restaurant_review.user SET password = ? WHERE email = ?;";
        var values = [retVal, request.body.email]

        db.query(sql, values, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json({ "new_password": retVal });
            }
        });
    }

    emailValid(request, respond){
        var sql = "SELECT EXISTS(SELECT 1 FROM restaurant_review.user WHERE email = ?) AS emailCheck;"
        var values = [request.body.email]

        db.query(sql, values, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }


    sendEmail(request, respond) {
        var email = request.body.email;
        var content = request.body.content;
        sgMail.setApiKey("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")
        const msg = {
            to: email, // Change to your recipient
            from: 'crumbreview@outlook.com', // Change to your verified sender
            subject: 'Sending with SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: content ,
        }
        sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent')
                respond.json({ result: "success" });
            })
            .catch((error) => {
                console.error(error)
                respond.json({ result: "fail" });
            })
    }

}





function prepareMessage(msg, user_id, profile_pic, username) {
    var obj = { "message": msg, "user_id": user_id, "profile_pic": profile_pic, "username": username };
    return obj;
}

module.exports = userDB;