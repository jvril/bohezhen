//var member = require('./controllers/member');
var sign = require('./controllers/sign');
var site = require('./controllers/site');
//var thing = require('./controllers/things');
//var comment = require('./controllers/comments');
//var rss = require('./controllers/rss');
//var story = require('./controllers/story');
//静态页面 about contact
//var assets = require('./controllers/static');

var config = require('./config');

module.exports = function(app){
    app.get('/',site.index);
    //app.get('/thing',site.index);

    /*if(config.allow_sign_up){
        //允许注册
        app.get('/register',sing.showRegister);
        app.post('/register',sign.register);
    }else{
        //不开放注册
    }*/

    app.get('/login',sign.showLogin);
    //app.post('/login',sign.login);
}