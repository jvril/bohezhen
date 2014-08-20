/**
 * config
 */

var path = require('path');
var pkg = require('./package.json');

var config = {
    debug : true,
    name : '薄荷镇',
    description:'薄荷镇是一个围绕地球上的事物为中心,描述你与这个世界上的事物发生的故事.',
    version:pkg.version,
    keywords:'清新,文艺,故事,事物,有故事的人',

    site_headers:[
        '<meta name="author" content="jvril@bohezhen&douban">'
    ],
    host:'localhost',

    bohezhen_logo:'',
    bohezhen_ico:'',
    side_bar_navs:[
        ['/home','首页'],
        ['/things','事物'],
        ['/storys','故事'],
        ['/about','关于']
    ],

    mini_assets: false,

    upload_dir:path.join(__dirname,'public','upload','images'),

    db:'mongodb://127.0.0.1/mt_dev',
    db_name:'mt_dev',
    session_secret:'mt',
    auth_cookie_name:'mt',
    port:3000,

    //每页显示数量
    list_count:20,

    rss:{
        title:'薄荷镇:充满故事的小镇',
        link:'http://bohezhen.com',
        language:'zh-cn',
        description:'薄荷镇:充满故事的小镇',

        max_rss_items:50
    },

    //广告 预留
    site_advs:[
        /*{
       'url': 'http://www.upyun.com/?utm_source=nodejs&utm_medium=link&utm_campaign=upyun&md=nodejs',
       'image': 'http://site-cnode.b0.upaiyun.com/images/upyun_logo.png',
       'text': ''
      },*/
    ],

    mail_opts:{
        host:'smtp.126.com',
        port:25,
        auth:{
            user:'jvril@126.com',
            pass:'nini20050814'
        }
    },

    allow_sign_up : true,

    //登录注册左侧 文字
    literary_text : '如果世界浑浊的不像话 , 请记得还有我们'

};

module.exports = config;
module.exports.config = config;