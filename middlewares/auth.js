exports.blockUser = function(){
    return function(req,res,next){
        if(req.session.user && req.session.is_block){
            return res.send('您被屏蔽了');
        }
        next();
    };
}