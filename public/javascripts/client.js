/**
 * Created by maxprais on 17/04/2016.
 */
// User auths, and gets a response token or something
'use strict';

var userSession = {};

(function (userSession) {
    userSession.loggedIn = (function () {
        if (localStorage.sentMail){
            console.log(localStorage.sentMail);
        }
        else {
            localStorage.setItem("sentMail", false);
            var request = $.ajax({
                url: '/email',
                type: "post",
                success: function (res) {
                    console.log(res);
                    if (res === 'success') {
                        localStorage.setItem("sentMail", true);
                        console.log(localStorage);
                        userSession.saveUserName();
                    } else {
                        // Handle case of email failed
                    }
                }
            });
        }
    })();
    
    userSession.saveUserName = function () {
        $.ajax({
            url: '/name',
            type: 'post',
            success: function (name) {
                console.log(name);
                localStorage.setItem('username', name)
            }
        })
    };
    
    userSession.sendUserName = (function () {
        console.log(localStorage.username);
        if (localStorage.username){
            console.log('is');
            $.ajax({
                url: '/getname',
                type: 'post',
                data: JSON.stringify({username: localStorage.username}),
                success: function () {
                    console.log('done');
                }
            })
        }
        
        
    })();
})(userSession);


