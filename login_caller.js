//dropbox_login = require('dropbox_login.js');


var dbox = require('dbox'),
    phantom = require('phantom');

var APP_KEY = 'ht7wkxiaq9t3lm8',
    APP_SECRET = '0pwb5sy2aveu7sc';

var app = dbox.app({
    'app_key': APP_KEY,
    'app_secret': APP_SECRET
});

function login (email, password, storeToken) {
    app.requesttoken(function (status, requestToken) {
        // add event listener
        console.log(requestToken);
        console.log(status);
        phantom.create(function (ph) {
            ph.createPage(function (page) {
                page.open(requestToken.authorize_url, function (status) {
                    page.includeJs('http://code.jquery.com/jquery-1.10.1.min.js', function () {
                       page.evaluate((function (email, password, requestToken, storeToken) {
                            document.getElementById('login_email').value = email;
                            document.getElementById('login_password').value = password;
                            document.getElementById('login_submit').click();
                        }), function (result) {
                               storeToken(requestToken);
                            setTimeout(function () {
                                ph.exit();
                            }, 1000);
                        }, email, password, requestToken, storeToken);
                    });
                });
            });
        });
    });
}
var email = 'temp6969@yahoo.com',
    password = 'temp69691';
var storeToken = function(token) {
    console.log(token);
}
login(email, password, storeToken);
