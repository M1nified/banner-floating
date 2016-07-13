'use strict';
module.exports = function(grunt){
    
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sass');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify:{
            options:{
                beatify:false
            },
            base:{
                files:[
                    {
                        src:['src/widget.js'],
                        dest:'widget.js'
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
                files:[
                    {
                        src:['src/widget.scss'],
                        dest:'widget.css'
                    },
                    {
                        src:['lib/jquery.simplyscroll.css'],
                        dest:'lib/jquery.simplyscroll.min.css'
                    }
                ]
            }
        }
    });

    grunt.registerTask('default',['uglify:base','sass:base']);
}