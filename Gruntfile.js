module.exports = function(grunt){
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
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
                    'public/static/js/web.min.js':['public/static/js/lib/*.js','public/static/js/mt/*.js']
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

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['concat', 'uglify']);
}