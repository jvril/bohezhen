require(['jquery','service'],function($,service){

    $("input").placeholder();

    var _username = function(){
        return $("input[name='username']").val();
    };

    var _password = function(){
        return $("input[name='password']").val();
    };

    var doLogin = function(){

    };

});