/**
 * Created by maxprais on 17/04/2016.
 */
// User auths, and gets a response token or something
'use strict';

var userSession = {};

(function (userSession) {


    userSession.sendEmail = function () {

        if (localStorage.sentMail === false){
            $.ajax({
                url: '/email',
                type: "post",
                success: function (res) {
                    console.log(res);
                    if (res === 'success') {
                        localStorage.setItem("sentMail", true);
                        console.log(localStorage);
                    } else {
                        // Handle case of email failed
                    }
                }
            });
        }

    };

     userSession.loggedIn = (function () {
        if (localStorage.sentMail === 'true'){
            console.log(localStorage.sentMail);
        }
        else {
            localStorage.setItem("sentMail", false);
            userSession.sendEmail();

        }
    })();

    userSession.saveUserName = (function () {

        if (typeof localStorage.username !== 'string'){
            $.ajax({
                url: '/name',
                type: 'get',
                success: function (name) {
                    console.log(name);
                    localStorage.setItem('username', name);
                    userSession.sendEmail();
                }
            })

        }

    })();

    userSession.sendUserName = (function () {
        console.log(localStorage.username);
        if (localStorage.username){
            $.ajax({
                url: '/getname',
                type: 'post',
                data: JSON.stringify({username: localStorage.username}),
                success: function () {
                    $('.username').text('You are logged in as ' + localStorage.username);
                    console.log('done');
                }
            })
        }


    })();
})(userSession);


