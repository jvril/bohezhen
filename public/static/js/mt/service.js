//封装ajax
define('service',['$'],function($){
    /*
     * options
     * type : post,get
     *
     * */
    var ajax = function(options){
        defaults = {
            type:'get',
            url:''
        };
        options = $.extend({},defaults,options);
        $.ajax({
            type: "get",
            url: options.url,
            data:options.data,
            beforeSend: function(XMLHttpRequest){
                if(options.beforeAjax!=undefined && typeof options.beforeAjax === 'function'){
                    options.beforeAjax();
                }
            },
            success: function(data, textStatus){
                data = eval('('+data+')');
                if(data.status=='success'){
                    options.success(data);
                }else if(data.status=='error'){
                    options.fail(data);
                }
            },
            complete: function(XMLHttpRequest, textStatus){
            },
            error: function(){
                alert('执行操作失败,请重试!');
            }
        });
    };

    return {
        ajax:ajax
    };
});