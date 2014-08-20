exports.index = function(req,res,next){
    //next();

    res.writeHeader(200, {'Content-Type':'text/javascript;charset=UTF-8'});
    //res.write(JSON.stringify({a:123}));
    res.end();
};