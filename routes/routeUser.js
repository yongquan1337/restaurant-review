"use strict"

const userdb = require('../models/UserDB');

var usersDBObject = new userdb();


function routeUser(app){
	app.route('/login').post(usersDBObject.getLoginCredentials);

	app.route('/user/:user_id').get(usersDBObject.getUserInfo);
	
	app.route('/user').post(usersDBObject.addUser);

	app.route('/check').post(usersDBObject.checkUsers);
	
	app.route('/user/:user_id').delete(usersDBObject.deleteUser);
	app.route('/user/:user_id').put(usersDBObject.updateUser);
	app.route('/userPwd/:user_id').put(usersDBObject.updateUserPassword);

	app.route('/forgetEmail').post(usersDBObject.sendEmail);
	app.route('/forgetUpdate').post(usersDBObject.forgetUpdate);
	app.route('/validEmail').post(usersDBObject.emailValid);
}

module.exports = {routeUser};