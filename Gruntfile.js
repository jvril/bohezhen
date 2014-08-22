module.exports = function(grunt){
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        bower: {
            install: {
                options: {
                    targetDir: './public/static/js/lib',
                    layout: 'byComponent',
                    install: true,
                    verbose: false,
                    cleanTargetDir: false,
                    cleanBowerDir: false,
                    bowerOptions: {}
                }
            }
        },
        concat:{
            options:{
                stripBanners :true,
                banner:'/*! <%= pkg.name %> - v<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'//添加banner
            },
            basic:{
                files:{
                    'public/static/css/style.css':['public/static/css/mt/*.css']
                }
            }
        },

        uglify:{
            options:{
                banner:'/*! <%= pkg.name %> - v<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            app_task:{
                files:{
                    'public/static/js/web.min.js':['public/static/js/lib/**/*.js','public/static/js/mt/*.js']
                }
            }
        },

        watch:{
            css:{
                files: ['public/static/css/mt/*.css'],
                tasks:['concat']
            },
            scripts:{
                files:['public/static/js/lib/*.js','public/static/js/mt/*.js'],
                tasks:['uglify']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.registerTask('build', 'require demo', function (channel, project, branch) {

        var path = './public/static/js';
        grunt.log.debug('path: ' + path);

        //第一步，读取配置信息
        var cfg = grunt.file.readJSON('./gruntCfg.json');
        cfg = cfg.requirejs;

        grunt.config.set('config', {
            srcDir: path+'/',
            destDir: path
        });


        grunt.config.set('requirejs', { main: cfg });

        //第二步，设置参数
        grunt.log.debug('param: ' + JSON.stringify(grunt.config()));

        //第三步跑任务
        grunt.task.run(['requirejs']);

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-task');

    grunt.registerTask('default', ['concat', 'uglify','bower','build']);
}