var express = require('express');
var path = require('path');
var Loader = require('loader');
var config = require('./config');
//restful 路由配置
var routes = require('./routes');

//session cookie
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var _ = require('lodash');
var csurf = require('csurf');
//用户相关过滤中间件
var auth = require('./middlewares/auth');

var staticDir = path.join(__dirname,'public');

var logger = require('log4js');

var bodyParser = require('body-parser');
//代码压缩
var compress = require('compression');

var urlinfo = require('url').parse(config.host);
config.hostname = urlinfo.hostname || config.host;

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs-mate'));
app.locals._layoutFile = 'layout.html';

app.use(require('response-time')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
//restful add delete...
app.use(require('method-override')());
//cookie parser
app.use(require('cookie-parser')(config.session_secret));

app.use(compress());
app.use(session({
    secret: config.session_secret,
    key: 'sid',
    store: new MongoStore({
        db: config.db_name
    }),
    resave: true,
    saveUninitialized: true
}));
app.use(require('./controllers/sign').auth_user);
app.use(auth.blockUser());

app.use('/public',express.static(staticDir));

if(!config.debug){
    app.use(csurf());
    app.set('view cache',true);
}

_.extend(app.locals,{
    config:config,
    Loader:Loader
});


app.use(function (req, res, next) {
    res.locals.csrf = req.csrfToken ? req.csrfToken() : '';
    next();
});

routes(app);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(config.port,function(){
    console.log("minttown listening on port %d in %s mode",config.port,config.debug);
    console.log("get to be a literature youth");
    console.log("You can debug your app with http://" + config.hostname + ':' + config.port);
});


module.exports = app;
