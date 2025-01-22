var restaurantJson = null;
var myLat = 0.0;
var myLon = 0.0;
var latitude = null;
var longitude = null;
var password = null;
var resid = null;
var dist = []

function register() {
    var request = new XMLHttpRequest();

    var userinfo = new Object();

    userinfo.first_name = document.getElementById("fname").value;
    userinfo.last_name = document.getElementById("lname").value;
    userinfo.email = document.getElementById("email").value;
    userinfo.username = document.getElementById("uname2").value;
    userinfo.password = document.getElementById("pwd2").value;
    userinfo.mobile_number = document.getElementById("mobile").value;
    userinfo.gender = document.getElementById("gender").value;
    userinfo.address = document.getElementById("address").value;

    request.open("POST", "/user", true);
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function () {
        result = JSON.parse(request.responseText);
        if (result.affectedRows == 1) {
            alert("User added");
        }
    };

    request.send(JSON.stringify(userinfo));
}

function ValidateEmail() {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(document.getElementById("email").value)) {
        return (true)
    }
    alert("You have entered an invalid email address!")
    return (false)
}

function registerCheck() {
    var request = new XMLHttpRequest();

    var userinfo = new Object();


    userinfo.first_name = document.getElementById("fname").value;
    userinfo.last_name = document.getElementById("lname").value;
    userinfo.email = document.getElementById("email").value;
    userinfo.username = document.getElementById("uname2").value;
    userinfo.password = document.getElementById("pwd2").value;
    cpassword = document.getElementById("cpwd").value;
    userinfo.mobile_number = document.getElementById("mobile").value;
    userinfo.gender = document.getElementById("gender").value;
    userinfo.address = document.getElementById("address").value;

    if (userinfo.first_name == "" || userinfo.last_name == "" || userinfo.email == "" || userinfo.username == "" || userinfo.password == "" || cpassword == "" || userinfo.mobile_number == "" || userinfo.gender == "" || userinfo.address == "") {
        alert("Missing Fields detected");
        return;
    }
    if (ValidateEmail() == false) {
        return;
    }
    else if (userinfo.password.length < 8) {
        alert("Password length must be atleast 8 characters")
        return;
    }
    else if (userinfo.password != cpassword) {
        alert("Confirm password incorrect");
        return;
    }


    request.open("POST", "/check", true);
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function () {
        result = JSON.parse(request.responseText);
        console.log(result);

        if (result.message == "invalid username") {
            alert("Invalid Username");
        }
        else if (result.message == "invalid Email") {
            alert("Invalid Email");
        }
        else {
            register();
            document.getElementById("cancelbtn").click();
            document.getElementById('id01').style.display = 'block'
        }
    };

    request.send(JSON.stringify(userinfo));
}

function login() {
    var request = new XMLHttpRequest();

    var userinfo = new Object();
    userinfo.username = document.getElementById("uname1").value;
    userinfo.password = document.getElementById("pwd1").value;

    request.open("POST", "/login", true);
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function () {
        result = JSON.parse(request.responseText);
        if (result.message == "SUCCESS!") {
            //sessionStorage.setItem("username", userinfo.username)
            sessionStorage.setItem("user_id", result.user_id)
            sessionStorage.setItem("username", result.username)
            sessionStorage.setItem("profile_pic", result.profile_pic)

            document.getElementById("loggedin").innerHTML = '<button class="btn btn-light badgepill">Favourite <img width="25px" src="images/filled-heart.png" alt=""></button>' +
                '<h4 id="user-name">Welcome ' + result.username + '!</h4>' +
                '<img id="profilepic" class="profile-pic" src="' + result.profile_pic + '" alt="">';
            // document.getElementById('id01').style.display='none'
            location.reload();
        }
        else {
            alert("Invalid Password");
        }
    };

    request.send(JSON.stringify(userinfo));
}

function deleteUser() {
    var r = confirm("Are you sure you want to delete your account?");
    if (r == true) {


        var request = new XMLHttpRequest();

        var userid = sessionStorage.getItem("user_id");

        request.open("DELETE", "/user/" + userid, true);
        request.setRequestHeader("Content-Type", "application/json");

        request.onload = function () {
            result = JSON.parse(request.responseText);

            if (result.affectedRows == 1) {
                alert("User deleted successfully");
                sessionStorage.clear();
                window.location.href = "/index.html";

            }
        };

        request.send();
    }
}

function closeLogin() {
    document.getElementById("loginClose").click();
}

function forgetPassword() {
    var request = new XMLHttpRequest();

    var userInfo = new Object();
    userInfo.email = document.getElementById("forget-email").value;

    request.open("POST", "/forgetUpdate", true);
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function () {
        result = JSON.parse(request.responseText);

        sendEmail(result.new_password);
        alert("Email has been sent. If email is not found, please check your junk folder");
    };

    request.send(JSON.stringify(userInfo));
}

function sendEmail(pwd) {
    var request = new XMLHttpRequest();

    var forget = new Object();
    forget.email = document.getElementById("forget-email").value;
    forget.content = "You have successfully resetted your password<br>Your new password is <strong>" + pwd + "</strong>";

    request.open("POST", "/forgetEmail", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {
        result = JSON.parse(request.responseText);
        alert("yes")
    }
    request.send(JSON.stringify(forget));
}

function validEmail() {
    var request = new XMLHttpRequest();

    var userinfo = new Object();

    userinfo.email = document.getElementById("forget-email").value;


    request.open("POST", "/validEmail", true);
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function () {
        result = JSON.parse(request.responseText);
        if (result[0].emailCheck == 1) {
            forgetPassword()
        }
        else if (result[0].emailCheck == 0) {
            alert("Invalid Email");
            return;
        }
    };

    request.send(JSON.stringify(userinfo));
}



function navbar() {
    var userid = sessionStorage.getItem("user_id");
    if (userid != null) {
        var username = sessionStorage.getItem("username");
        var profile_pic = sessionStorage.getItem("profile_pic");
        //document.getElementById("loggedin").innerHTML = '<button class="btn btn-light badgepill">Favourite <img width="25px" src="images/filled-heart.png" alt=""></button>'+
        //  '<h4 id="user-name">Welcome '+username+'!</h4>'+
        //'<img id="profilepic" class="profile-pic" src="'+profile_pic+'" alt="">';
        document.getElementById("loggedin").innerHTML = '<a href="favourite.html?user_id=' + userid + '"' +
            '<button style="margin-right: 100px" class="btn btn-light badgepill">Favourite <img width="25px" src="images/filled-heart.png" alt=""></button>' +
            '</a>' +
            '<div class="dropdown">' +
            '<h4 style="margin-right: 20px; margin-top: 10px" class=" dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
            'Welcome ' + username + '!' +
            '</h4>' +
            '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
            '<a class="dropdown-item" href="" onclick="logout()">logout</a>' +
            '<a class="dropdown-item" href="/user.html?user_id=' + userid + '">Manage Account</a>' +
            '</div>' +
            '</div>' +
            '<img style="" id="profilepic" class="profile-pic" src="' + profile_pic + '" alt="">';

        return;
    }
    else {
        return;
    }
}

function heart() {
    var userid = sessionStorage.getItem("user_id");
    if (userid != null) {
        document.getElementById("fav-btn").innerHTML = '<img id="favourite" src="images/empty-heart.png" alt="Tool Tip">'  
        document.getElementById("favourite").classList.add("empty-heart");
    }
}

function getUser() {

    var request = new XMLHttpRequest();


    var urlParams = new URLSearchParams(window.location.search);
    var userid = urlParams.get('user_id');
    var profile_pic = sessionStorage.getItem("profile_pic");

    request.open("GET", "/user/" + userid, true);
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function () {
        result = JSON.parse(request.responseText);
        document.getElementById("username").innerHTML = result[0].username;
        document.getElementById("email2").innerHTML = result[0].email;
        document.getElementById("fname2").value = result[0].first_name;
        document.getElementById("lname2").value = result[0].last_name;
        document.getElementById("address2").value = result[0].address;
        document.getElementById("mobile2").value = result[0].mobile_number;
        document.getElementById("gender2").value = result[0].gender;
        document.getElementById("pfp").src = profile_pic;
        password = result[0].password;
    }
    request.send();

}


function updateUser() {
    var request = new XMLHttpRequest();

    var urlParams = new URLSearchParams(window.location.search);
    var userid = urlParams.get('user_id');

    var userInfo = new Object()
    userInfo.first_name = document.getElementById("fname2").value;
    userInfo.last_name = document.getElementById("lname2").value;
    userInfo.mobile_number = document.getElementById("mobile2").value;
    userInfo.address = document.getElementById("address2").value;
    userInfo.gender = document.getElementById("gender2").value;
    userInfo.profile_pic = document.getElementById("pfp").src;
    if (userInfo.first_name == "" || userInfo.last_name == "" || userInfo.mobile_number == "" || userInfo.address == "") {
        alert("Missing fields");
        return
    }

    console.log(document.getElementById("pfp").src)
    if (document.getElementById("new_pwd").value != "" || document.getElementById("current_pwd").value != "" || document.getElementById("new_cpwd").value != "") {
        if (updateUserPwd()) {
            return
        }
    }

    request.open("PUT", "/user/" + userid, true);
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function () {
        result = JSON.parse(request.responseText);
        alert("Information Updated");
        sessionStorage.setItem("profile_pic", userInfo.profile_pic)
        location.reload();
    }
    request.send(JSON.stringify(userInfo));
}


function updateUserPwd() {
    var request = new XMLHttpRequest();

    var urlParams = new URLSearchParams(window.location.search);
    var userid = urlParams.get('user_id');

    var userInfo = new Object()
    userInfo.password = document.getElementById("new_pwd").value;
    currentPassword = document.getElementById("current_pwd").value;
    confirmPassword = document.getElementById("new_cpwd").value;
    if (currentPassword != password) {
        alert("Wrong current password");
        return true
    }
    if (userInfo.password == "") {
        alert("Password field is empty")
        return true;
    }
    if (userInfo.password != confirmPassword) {
        alert("Wrong Confirm password");
        return true
    }




    request.open("PUT", "/userPwd/" + userid, true);
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function () {
        result = JSON.parse(request.responseText);

    }
    request.send(JSON.stringify(userInfo));
    return false
}

function logout() {
    var r = confirm("Logout?");
    if (r == true) {
        sessionStorage.clear();
        location.reload();
    }
}

function loginCheck() {

    var userinfo = new Object();
    userinfo.username = document.getElementById("uname1").value;
    userinfo.password = document.getElementById("pwd1").value;

    if (userinfo.username == "") {
        alert("No username")
    }
    else {
        login()
    }
}



function getAllRestaurant() {
    var request = new XMLHttpRequest();

    request.open("GET", "/restaurant", true);
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function () {
        result = JSON.parse(request.responseText);

        html = ""

        for (var count = 0; count < result.length; count++) {
            html +=
                '<div class="card flex-row flex-wrap">' +
                '<a href="restaurant.html?restaurant_id=' + result[count].restaurant_id + '" class = "link"></a>' +

                '<img class= "home-thumbnail" src="' + result[count].thumbnail1 + '" alt="">' +

                '<div class="card-block px-2">' +
                '<h4 class="card-title title">' + result[count].name + '</h4>' +
                '<p class="card-text">' + result[count].detail + '</p>' +
                '<h5 class="rate">' + result[count].overall + '<img class="star"src="images/filled-star.png" alt=""></p>' +
                '</div>' +
                '<div class="w-100"></div>' +
                '</div>'
        }

        document.getElementById("restaurantList").innerHTML = html;
        restaurantJson = result;
    };

    request.send();
}



function repeatStringNumTimes(str, num) {
    newstr = "";
    for (i = 0; i < num; i++)
        newstr += str;
    console.log(newstr)
    return newstr
}


function getReviewRestaurant() {
    var request = new XMLHttpRequest();

    var urlParams = new URLSearchParams(window.location.search);
    var restaurant_id = urlParams.get('restaurant_id');

    request.open("GET", "/restaurant/review/" + restaurant_id, true);
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function () {
        result = JSON.parse(request.responseText);


        var userid = sessionStorage.getItem("user_id");
        html = ""

        for (var count = 0; count < result.length; count++) {
            console.log(JSON.stringify(result[count].review_img));

            edit = '<div style="width: fit-content; margin-left: auto;">' +
                '<div style="width: fit-content;" class="row">' +
                '<button type="button" id="edit" class="btn btn-dark">Edit</button>' +
                '<a id="edit" href="edit-review.html?restaurant_id=' + result[0].restaurant_id + '&review_id=' + result[count].review_id + '"class = "link"></a>' +
                '<button type="button" value="' + result[count].review_id + '" id="delete-review" class="btn btn-danger" onclick="deleteReview();">Delete</button>' +
                '</div>' +
                '</div>'

            if (result[count].modify_date == null) {
                date = '<pc>created<br>' + result[count].create_date + '</p>'
            }
            else {
                date = '<pc>Last Modified<br>' + result[count].modify_date + '</p>'
            }


            html +=
                '<div class="review-container">' +
                '<div class = "review-div row">' +
                '<div class="col-sm-2 user-review">' +
                '<img class="profile-pic" src="' + result[count].profile_pic + '" alt="">' +
                '<h5>' + result[count].username + '</h5>' +
                date +
                '</div>' +
                '<div class="review-rating">' +
                repeatStringNumTimes('<img width="25px" src="images/filled-star.png" alt="">', result[count].overall_rate);

            html += '<h4>' + result[count].review_title + '</h4>' +
                '<p>' + result[count].review + '</p>' +
                '</div>' +
                '<div class = "all-rating">' +
                '<div id = "ratings">' +
                '<div class="row">' +
                '<h4 class="rating-title">food</h4>' +
                '<h4 class="rating-num">' + result[count].food_rate + '<img class="star" src="images/filled-star.png" alt=""></h3>' +
                '</div>' +
                '<div class="row">' +
                '<h4 class="rating-title">Service</h4>' +
                '<h4 class="rating-num">' + result[count].service_rate + '<img class="star" src="images/filled-star.png" alt=""></h3>' +
                '</div>' +
                '<div class="row">' +
                '<h4 class="rating-title">Value</h4>' +
                '<h4 class="rating-num">' + result[count].cost_rate + '<img class="star" src="images/filled-star.png" alt=""></h3>' +
                '</div>' +
                '</div>'

            if (result[count].user_id == userid) {
                html += edit;
            }
            html += '</div>' +
                '</div>' +
                '</div><br>'
        }

        document.getElementById("review").innerHTML = html;
    };

    request.send();
}

function getReviewUser() {
    var request = new XMLHttpRequest();

    var urlParams = new URLSearchParams(window.location.search);
    var userid = urlParams.get('user_id');

    request.open("GET", "/user/review/" + userid, true);
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function () {
        result = JSON.parse(request.responseText);

        var userid = sessionStorage.getItem("user_id");
        html = ""
        if (result.length == 0) {
            html = "<h5>You have no reviews</h5>"
        }

        for (var count = 0; count < result.length; count++) {
            console.log(JSON.stringify(result[count].review_img));


            if (result[count].modify_date == null) {
                date = '<pc>created<br>' + result[count].create_date + '</p>'
            }
            else {
                date = '<pc>Last Modified<br>' + result[count].modify_date + '</p>'
            }
            edit = '<div style="width: fit-content; margin-left: 15px ">' +
            '<div style="width: fit-content;" class="row">' +
            '<button type="button" id="edit" class="btn btn-dark">Edit</button>' +
            '<a id="edit" href="edit-review.html?restaurant_id=' + result[count].restaurant_id + '&review_id=' + result[count].review_id + '"class = "link"></a>' +
            '<button type="button" value="' + result[count].review_id + '" id="delete-review" class="btn btn-danger" onclick="deleteReview();">Delete</button>' +
            '</div>' +
            '</div>'


            html +=
                '<div class="review-container">' +
                '<div class = "review-div row">' +
                '<div class=" user-review">' +
                '<img class="profile-pic" src="' + result[count].profile_pic + '" alt="">' +
                '<h5>' + result[count].username + '</h5>' +

                '</div>' +
                '<div class="review-rating">' +
                repeatStringNumTimes('<img width="25px" src="images/filled-star.png" alt="">', result[count].overall_rate);

            html += '<h4>' + result[count].name + '</h4>' +
                '<p>' + result[count].review + '</p>' +
                '</div>' +
                '<div class = "all-rating">' +
                '<div id = "ratings">' +
                '<div class="row">' +
                '<h4 class="rating-title">food</h4>' +
                '<h4 class="rating-num">' + result[count].food_rate + '<img class="star" src="images/filled-star.png" alt=""></h3>' +
                '</div>' +
                '<div class="row">' +
                '<h4 class="rating-title">Service</h4>' +
                '<h4 class="rating-num">' + result[count].service_rate + '<img class="star" src="images/filled-star.png" alt=""></h3>' +
                '</div>' +
                '<div class="row">' +
                '<h4 class="rating-title">Value</h4>' +
                '<h4 class="rating-num">' + result[count].cost_rate + '<img class="star" src="images/filled-star.png" alt=""></h3>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div style="margin-left: 15px">' +
                '<div class="row">'+
                date +
                edit +
                '</div>'+
                '</div>' +
                '</div><br>'
        }

        document.getElementById("user-review").innerHTML = html;
    };

    request.send();
}

function getOneRestaurant() {
    var request = new XMLHttpRequest();

    var urlParams = new URLSearchParams(window.location.search);
    var restaurant_id = urlParams.get('restaurant_id');
    request.open("GET", "/restaurant/" + restaurant_id, true);
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function () {
        result = JSON.parse(request.responseText);
        resid = result[0].restaurant_id;
        document.getElementById("num-review").innerHTML = "&emsp;" + result[0].numreviews + " reviews";
        document.getElementById("num-review2").innerHTML = " &nbsp;&emsp;Reviews &emsp; (" + result[0].numreviews + ")";
        document.getElementById("name").innerHTML = result[0].name;
        document.getElementById("additional-info").innerHTML = result[0].address; + result[0].mobile + result[0].website;
        if (result[0].overall == null) {
            document.getElementById("rating").innerHTML = "0 rating";
            document.getElementById("food").innerHTML = "0 rating";
            document.getElementById("service").innerHTML = "0 rating";
            document.getElementById("value").innerHTML = "0 rating";
        }
        else {
            document.getElementById("rating").innerHTML = result[0].overall;
            document.getElementById("food").innerHTML = result[0].food;
            document.getElementById("service").innerHTML = result[0].service;
            document.getElementById("value").innerHTML = result[0].cost;
        }

        document.getElementById("detail").innerHTML = result[0].detail;
        document.getElementById("cuisine").innerHTML = result[0].cuisine;

        document.getElementById("thumb1").src = result[0].thumbnail1;
        document.getElementById("thumb2").src = result[0].thumbnail2;
        document.getElementById("thumb3").src = result[0].thumbnail3;

        document.getElementById("website").innerHTML = result[0].website;
        document.getElementById("website").href = result[0].website;

        document.getElementById("hotline").innerHTML = "Hotline: " + result[0].hotline;

        document.getElementById("write-link").href = ("review.html?restaurant_id=" + result[0].restaurant_id);
        latitude = result[0].lat;
        longitude = result[0].lng;
        initMap(result[0].address, result[0].name);
        favouriteCheck();
    }
    request.send();
}



function initMap(address, name) {

    var storeLocation = new google.maps.LatLng(latitude, longitude);
    console.log("HI" + latitude);
    var popupContent = address;

    map = new google.maps.Map(
        document.getElementById("map"),
        {
            zoom: 18,
            center: storeLocation,
        }
    );
    marker = new google.maps.Marker({
        position: storeLocation,
        map,
        title: name,
    });

    infoWindow = new google.maps.InfoWindow({
        content: popupContent,
    });

    marker.addListener("click", () => {
        infoWindow.open(map, marker);
    });
}



function checkLoggedin() {
    if (sessionStorage.getItem("user_id") == null) {
        alert("Please login to continue");
        // window.history.back();
        window.location.href = "/index.html";
    }
}


function getOneRestaurant2() {
    var request = new XMLHttpRequest();

    var urlParams = new URLSearchParams(window.location.search);
    var restaurant_id = urlParams.get('restaurant_id');

    request.open("GET", "/restaurant/" + restaurant_id, true);
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function () {
        result = JSON.parse(request.responseText);
        console.log(result)
        var title = document.getElementById("restaurant-title");
        title.insertAdjacentHTML("afterbegin", result[0].name);

        var address = document.getElementById("review-address");
        address.insertAdjacentHTML("afterbegin", result[0].address);


        document.getElementById("restaurant-thumb").src = result[0].thumbnail1;
    };

    request.send();
}

function getOneReview() {
    var request = new XMLHttpRequest();

    var urlParams = new URLSearchParams(window.location.search);
    var revid = urlParams.get('review_id');

    request.open("GET", "/review/" + revid, true);
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function () {
        result = JSON.parse(request.responseText);
        console.log("hi", revid);
        document.getElementById("overall2").value = result[0].overall_rate;
        document.getElementById("value2").value = result[0].cost_rate;
        document.getElementById("review_title2").value = result[0].review_title;
        document.getElementById("review_body2").value = result[0].review;
        document.getElementById("service2").value = result[0].service_rate;
        document.getElementById("food2").value = result[0].food_rate;
    };

    request.send();
}

function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        console.log(reader.result);
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

function encodeImageFileAsURL(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        document.getElementById("pfp").src = reader.result;
    }
    reader.readAsDataURL(file);
}

function findSize(ele) {
    var fileInput = document.getElementById("pfp_input");
    if (fileInput.files[0].size > 70000) { // Size returned in bytes.
        alert("Image file size is too large")
        document.getElementById("pfp_input").value = "";
    }
    else {
        encodeImageFileAsURL(ele);
    }
}

function addReview() {
    var request = new XMLHttpRequest();

    var urlParams = new URLSearchParams(window.location.search);
    var resid = urlParams.get('restaurant_id');
    var userid = sessionStorage.getItem("user_id");

    var reviewInfo = new Object();
    reviewInfo.restaurant_id = resid;
    reviewInfo.user_id = userid;

    reviewInfo.overall_rate = document.getElementById("overall").value;
    reviewInfo.cost_rate = document.getElementById("value").value;
    reviewInfo.review_title = document.getElementById("review_title").value;
    reviewInfo.review = document.getElementById("review_body").value;
    reviewInfo.service_rate = document.getElementById("service").value;
    reviewInfo.food_rate = document.getElementById("food").value;
    if (reviewInfo.review_title == "" || reviewInfo.review == "") {
        alert("Empty fields detected")
        return
    }

    request.open("POST", "/review", true);
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function () {
        result = JSON.parse(request.responseText);
        if (result.affectedRows == 1) {
            alert("Review added");
            sessionStorage.setItem("review", document.getElementById("review_body").value)
            window.location.href = "/restaurant.html?restaurant_id=" + resid;
        }
    };

    request.send(JSON.stringify(reviewInfo));
}

function checkSubmitted(ele) {
    var urlParams = new URLSearchParams(window.location.search);
    var resid = urlParams.get('restaurant_id');
    var review = sessionStorage.getItem("review");

    if (review == document.getElementById("review_body" + ele).value) {
        document.getElementById('submithref').href = "/restaurant.html?restaurant_id=" + resid;
        document.getElementById('submitted').click();
        return
    }
}

function addReviewImg() {
    var request = new XMLHttpRequest();

    reviewInfo.review_img = new Blob([document.getElementById("post").value], { type: "text/plain" });
    console.log(reviewInfo.review_img);

    request.open("POST", "/review", true);
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function () {
        result = JSON.parse(request.responseText);

    };

    request.send(JSON.stringify(reviewInfo));
}



function updateReview() {
    var request = new XMLHttpRequest();

    var reviewInfo = new Object();
    reviewInfo.review_title = document.getElementById("review_title2").value;
    reviewInfo.review = document.getElementById("review_body2").value;
    reviewInfo.overall_rate = document.getElementById("overall2").value;
    reviewInfo.cost_rate = document.getElementById("value2").value;
    reviewInfo.service_rate = document.getElementById("service2").value;
    reviewInfo.food_rate = document.getElementById("food2").value;

    console.log(reviewInfo);

    var urlParams = new URLSearchParams(window.location.search);
    var revid = urlParams.get('review_id');
    var resid = urlParams.get('restaurant_id');

    request.open("PUT", "/editReview/" + revid, true);
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function () {
        result = JSON.parse(request.responseText);
        alert("updated");
        if (result.affectedRows == 1) {
            sessionStorage.setItem("review", document.getElementById("review_body2").value)
            window.location.href = "/restaurant.html?restaurant_id=" + resid;
        }
    };

    request.send(JSON.stringify(reviewInfo));
}

function deleteReview() {
    //var txt;
    var r = confirm("Delete Review?");
    if (r == true) {

        var request = new XMLHttpRequest();

        var revid = document.getElementById("delete-review").value;

        request.open("DELETE", "/review/" + revid, true);
        request.setRequestHeader("Content-Type", "application/json");

        request.onload = function () {
            result = JSON.parse(request.responseText);
            if (result.affectedRows == 1) {
                alert("updated");
                location.reload();
            }
        };

        request.send();
    }
}

function filter() {
    var request = new XMLHttpRequest();

    var filterInfo = new Object();
    if (document.getElementById("cuisine").value != "") {
        filterInfo.cuisine = document.getElementById("cuisine").value;
    }
    if (document.getElementById("region").value != "") {
        filterInfo.region = document.getElementById("region").value;
    }
    if (document.getElementById("search").value != "") {
        filterInfo.search = document.getElementById("search").value;
    }



    request.open("POST", "/filter", true);
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function () {
        result = JSON.parse(request.responseText);
        document.getElementById("restaurantList").innerHTML = "";
        html = ""
        console.log(result);

        if (document.getElementById('rating').value != "") {
            result = sortJSON(result, 'overall', document.getElementById('rating').value);
        }

        for (var count = 0; count < result.length; count++) {
            html +=
                '<div class="card flex-row flex-wrap">' +
                '<a href="restaurant.html?restaurant_id=' + result[count].restaurant_id + '" class = "link"></a>' +

                '<img class= "home-thumbnail" src="' + result[count].thumbnail1 + '" alt="">' +

                '<div class="card-block px-2">' +
                '<h4 class="card-title title">' + result[count].name + '</h4>' +
                '<p class="card-text">' + result[count].detail + '</p>' +
                '<h5 class="rate">' + result[count].overall + '<img class="star"src="images/filled-star.png" alt=""></p>' +
                '</div>' +
                '<div class="w-100"></div>' +
                '</div>'
        }

        document.getElementById("restaurantList").innerHTML = html;
    };

    request.send(JSON.stringify(filterInfo));
}

function getFavRestaurant() {
    var request = new XMLHttpRequest();

    var urlParams = new URLSearchParams(window.location.search);
    var userid = urlParams.get('user_id');
    request.open("GET", "/favourite/" + userid, true);
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function () {
        result = JSON.parse(request.responseText);

        html = ""

        if (result.length == 0) {
            html = "<h3 style = 'width: fit-content; margin: 0 auto;'>You Have no Favourites</h3>"
        }

        for (var count = 0; count < result.length; count++) {
            html +=
                '<div class="card flex-row flex-wrap">' +
                '<a href="restaurant.html?restaurant_id=' + result[count].restaurant_id + '" class = "link"></a>' +

                '<img class= "home-thumbnail" src="' + result[count].thumbnail1 + '" alt="">' +

                '<div class="card-block px-2">' +
                '<h4 class="card-title title">' + result[count].name + '</h4>' +
                '<p class="card-text">' + result[count].detail + '</p>' +
                '<h5 class="rate">' + result[count].overall + '<img class="star"src="images/filled-star.png" alt=""></p>' +
                '</div>' +
                '<div class="w-100"></div>' +
                '</div>'
        }

        document.getElementById("favouriteList").innerHTML = html;
        restaurantJson = result;

    };

    request.send();
}

function favourite() {
    var request = new XMLHttpRequest();

    var favouriteInfo = new Object();
    favouriteInfo.user_id = sessionStorage.getItem("user_id");
    favouriteInfo.restaurant_id = resid;

    request.open("POST", "/favourite", true);
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function () {
        result = JSON.parse(request.responseText);
        if (result.affectedRows == 1) {
            favouriteCheck();
        }
    };

    request.send(JSON.stringify(favouriteInfo));
}

function unFavourite() {
    var request = new XMLHttpRequest();

    var favouriteInfo = new Object();
    favouriteInfo.user_id = sessionStorage.getItem("user_id");
    favouriteInfo.restaurant_id = resid;

    request.open("DELETE", "/favourite", true);
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function () {
        result = JSON.parse(request.responseText);
        if (result.affectedRows == 1) {
            favouriteCheck();
        }
    };

    request.send(JSON.stringify(favouriteInfo));
}

function favouriteCheck() {
    var request = new XMLHttpRequest();

    var favouriteInfo = new Object();
    favouriteInfo.user_id = sessionStorage.getItem("user_id");
    favouriteInfo.restaurant_id = resid;

    request.open("POST", "/favouriteCheck", true);
    request.setRequestHeader("Content-Type", "application/json");
   

    request.onload = function () {
        result = JSON.parse(request.responseText);
        if (result[0].favCheck == 1) {
            document.getElementById("favourite").src = "images/filled-heart.png";
            document.getElementById("favourite").onclick = function () { unFavourite() };
            console.log("YES");
        }
        else {
            document.getElementById("favourite").src = "images/empty-heart.png";
            document.getElementById("favourite").onclick = function () { favourite() };
            console.log("NO");
        }
    };

    request.send(JSON.stringify(favouriteInfo));
}




function sortJSON(arr, key, way) {
    return arr.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        if (way === '123') { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
        if (way === '321') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
    });
}

function Comparator(a, b) {
    if (a[1] < b[1]) return -1;
    if (a[1] > b[1]) return 1;
    return 0;
}

function reload() {
    PerformanceNavigationTiming.type;
    if (String(window.performance.getEntriesByType("navigation")[0].type) === "back_forward") {
        window.location.reload()
    }
}

function distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") { dist = dist * 1.609344 }
        if (unit == "N") { dist = dist * 0.8684 }
        return dist;
    }
}

function nearMe() {
    const status = document.querySelector('#status');
    function success(position) {
        myLat = position.coords.latitude;
        myLon = position.coords.longitude;
        getNearMe()
        status.style.visibility = "hidden";
    }

    function error() {
        status.textContent = 'Unable to retrieve your location';
    }

    if (!navigator.geolocation) {
        status.textContent = 'Geolocation is not supported by your browser';
    } else {
        status.style.visibility = "visible";
        status.textContent = 'Locating…';
        navigator.geolocation.getCurrentPosition(success, error);
        
    }
}

function distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") { dist = dist * 1.609344 }
        if (unit == "N") { dist = dist * 0.8684 }
        return dist;
    }
}


function getNearMe() {
    var request = new XMLHttpRequest();

    request.open("GET", "/restaurant", true);
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function () {
        result = JSON.parse(request.responseText);
        html = ""
        htmlLst = []
        dist = []
        for (var count = 0; count < result.length; count++) {
            dist.push([count, Math.round(distance(myLat, myLon, result[count].lat, result[count].lng, "K") * 100) / 100]);

            html =
                '<div class="card flex-row flex-wrap">' +
                '<a href="restaurant.html?restaurant_id=' + result[count].restaurant_id + '" class = "link"></a>' +
                '<img class= "home-thumbnail" src="' + result[count].thumbnail1 + '" alt="">' +

                '<div class="card-block px-2">' +
                '<h4 class="card-title title">' + result[count].name + '</h4>' +
                '<p class="card-text">' + result[count].detail + '</p>' +
                '<h5 class="rate">' + result[count].overall + '<img class="star"src="images/filled-star.png" alt=""></p>' +
                '</div>' +
                '<h5 style="margin-left: auto">' + dist[count][1] + ' km away<br>' + result[count].region + '</h5>' +
                '<div class="w-100"></div>' +
                '</div>'

            htmlLst.push(html)
        }
        dist = dist.sort(Comparator);
        html = ""
        for (var i = 0; i < dist.length; i++) {
            console.log(i)
            html += htmlLst[dist[i][0]]
        }
        document.getElementById("nearMeList").innerHTML = html;
        restaurantJson = result;
    };

    request.send();
}



