module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        script:'workflowProgress.js',
        banner: '/*!\n * <%= script %>\n' +
            ' * Author:<%= pkg.author %>\n' +
            ' * Summary:<%= pkg.description %>\n' +
            ' * License:<%= pkg.license %>\n' +
            ' * Version: <%= pkg.version %>\n' +
            ' *\n * URL:\n * <%= pkg.homepage %>\n' +
            ' * <%= pkg.homepage %>/blob/master/LICENSE\n *\n */\n',

        sass: {
            build: {
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
                banner: '<%= banner %>',
                compress: {
                    drop_console: true
                }
            },
            clean: {
                options: {
                    beautify: {
                        width: 50,
                        beautify: true
                    },
                    mangle: {
                        except: ['workflowProgress']
                    }
                },
                src: 'src/js/workflowProgress.js',
                dest: 'dist/js/workflowProgress.js'
            },
            build: {
                files: {
                    'dist/js/workflowprogress.min.js': ['dist/js/workflowprogress.js']
                }
            }
        },
        replace: {
            build: {
                options: {
                    patterns: [
                        {
                            match: 'name',
                            replacement: '<%= pkg.name %>'
                        },
                        {
                            match: 'repo',
                            replacement: '<%= pkg.repository.url %>'
                        }
                    ]
                },
                files: [
                    {expand: true, flatten: true, src: ['src/demo.html'], dest: 'dist/'}
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['uglify:clean', 'sass:build', 'uglify:build','replace:build']);

};