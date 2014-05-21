var mainBanner='/*!\n * <%= pkg.name %>.js\n'+
      ' * Author:<%= pkg.author %>\n'+
      ' * Summary:<%= pkg.description %>\n'+
      ' * License:<%= pkg.license %>\n'+
      ' * Version: <%= pkg.version %>\n'+
      ' *\n * URL:\n * <%= pkg.homepage %>\n'+
      ' * <%= pkg.homepage %>/blob/master/LICENSE\n *\n */\n';
module.exports = function(grunt) {
  var path = require('path');
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        // options: {                       // Target options
        // style: 'expanded'
        // },
        files: {
          'dist/css/reset.css': 'src/scss/reset.scss',
          'dist/css/style.css': 'src/scss/style.scss'
        }
      }
    },   
    uglify: {
      options: {
      
        banner: mainBanner
      },
      /*prepare:{
        options:{
          beautify: {
          width: 40,
          beautify: true
         }
        },
        files:{
          'src/js/beautify.js':['dist/js/workflowprogress.js']
        }
      
      },*/
      build: {
        files:{
          'dist/js/workflowprogress.min.js':['dist/js/workflowprogress.js']
        }
      }
    },
    replace: {
      dist: {
        options: {
          patterns: [
            {
              match: 'name',
              replacement: '<%= pkg.name %>'
            },{
              match: 'repo',
              replacement: '<%= pkg.repository.url %>'
            },{
              match:'banner',
              replacement:mainBanner
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['src/demo.html'], dest: 'dist/'},
          {expand: true, flatten: true, src: ['src/js/<%= pkg.main %>'], dest: 'dist/js/'}
        ]
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['replace:dist','sass:dist','uglify:build']);

};