'use strict';
module.exports = function(grunt){

    var sassfiles = [
        {
            src:['src/widget.scss'],
            dest:'widget.css'
        },
        {
            src:['lib/jquery.simplyscroll.css'],
            dest:'lib/jquery.simplyscroll.min.css'
        }
    ];
    var uglifyfiles = [
        {
            src:['src/widget.js'],
            dest:'widget.js'
        }
    ];
    
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-clean');

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
            }
        },
        clean:{
            production:{
                src:['*.map']
            }
        }
    });

    grunt.registerTask('default',['uglify:base','sass:base']);
    grunt.registerTask('produce',['clean:production','uglify:production','sass:production']);
    grunt.registerTask('production',['produce']);
}