exports.auth_user = function(req,res,next){
  if(req.session.user){
      //暂时忽略管理员

      //路口未建立目前next
      next();
  }
  next();
};

exports.showLogin = function(req,res,next){
    //req.session._loginReferer = req.headers.referer;
    //记住backurl 或者
    req.session._loginReferer = req.header('Referer');
    res.render('sign/login');
};