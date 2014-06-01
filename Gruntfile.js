module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*!\n * <%= script %>.js\n' +
            ' * Author:<%= pkg.author %>\n' +
            ' * Summary:<%= pkg.description %>\n' +
            ' * License:<%= pkg.license %>\n' +
            ' * Version: <%= pkg.version %>\n' +
            ' *\n * URL:\n * <%= pkg.homepage %>\n' +
            ' * <%= pkg.homepage %>/blob/master/LICENSE\n *\n */\n',

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
            dist: {
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
                    {expand: true, flatten: true, src: ['src/demo.html'], dest: 'dist/'},
                    {expand: true, flatten: true, src: ['src/js/<%= pkg.main %>'], dest: 'dist/js/'}
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['uglify:clean', 'sass:dist', 'uglify:build']);

};