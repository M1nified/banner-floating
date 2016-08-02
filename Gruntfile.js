'use strict';
module.exports = function(grunt){

    var sassfiles = [
        {
            src:['_src/widget.scss'],
            dest:'widget.css'
        }
    ];
    var uglifyfiles = [
        {
            src:['_src/widget.js'],
            dest:'widget.js'
        }
    ];
    
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify:{
            options:{
                beautify:false
            },
            base:{
                options:{
                    sourceMap:true
                },
                files:uglifyfiles
            },
            production:{
                files:uglifyfiles
            },
            wp:{
                files:[
                    {
                        expand:true,
                        cwd:'_src',
                        src:['widget.js'],
                        dest:'_wp_production'
                    }
                ]
            }
        },
        sass:{
            base:{
                options:{
                    sourceMap:true,
                    outputStyle:'compressed'
                },
                files:sassfiles
            },
            production:{
                options:{
                    sourceMap:false,
                    outputStyle:'compressed'
                },
                files:sassfiles
            },
            wp:{
                options:{
                    sourceMap:false,
                    outputStyle:'compressed'
                },
                files:[
                    {
                        expand:true,
                        cwd:'_src',
                        src:['widget.scss'],
                        dest:'_wp_production'
                    }
                ]
            }
        },
        clean:{
            production:{
                src:['*.map']
            }
        },
        copy:{
            wp:{
                files:[
                    {
                        expand:true,
                        // cwd:'.',
                        src:['*.php'],
                        dest:'_wp_production'
                    }
                ]
            }
        }
    });

    grunt.registerTask('default',['uglify:base','sass:base']);
    grunt.registerTask('produce',['clean:production','uglify:production','sass:production']);
    grunt.registerTask('production',['produce']);
    grunt.registerTask('wp',['uglify:wp','sass:wp','copy:wp']);
}