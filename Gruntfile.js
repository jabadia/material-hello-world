module.exports = function(grunt) {

    require('time-grunt')(grunt);
    require('jit-grunt')(grunt, {
        bower: 'grunt-bower-task',
    });

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            build: [
                'build/js',
                'build/css',
                'build/*.html'
            ],
            tmp: [
                'tmp',
            ]
        },

        copy: {
            html: {
                files: [{
                    src: 'src/index.html',
                    dest: 'build/',
                    flatten: true,
                    expand: true,
                }]
            }
        },

        ngAnnotate: {
            app: {                
                options: {
                    // no options
                },
                files: {
                    'tmp/js/ng-app-ann.js' : ['src/js/ng-app.js'],
                },
            }
        },

        jshint: {
            all: ['Gruntfile.js', 'src/js/**/*.js', '*.js'],
            app: ['src/js/**/*.js'],
            node: ['*.js', 'test/*.js'],
            options: {                
                jshintrc: true,
            },
        },

        concat: {
            options: {
                // separator: ';',
                // sourceMap: true,
            },
            vendor: {
                // first underscore.js, jquery.js and angular.js and then all other .js files
                src: [
                    'bower_components/underscore/underscore-min.js',
                    'bower_components/angular/angular.min.js',
                    'bower_components/angular-animate/angular-animate.min.js',
                    'bower_components/angular-aria/angular-aria.min.js',
                    'bower_components/angular-material/angular-material.min.js',
                    // 'bower_components/d3/d3.v3.min.js',
                    // 'bower_components/topojson/topojson.js',
                    // 'bower_components/leaflet1.0b/leaflet.js',
                    // 'bower_components/leaflet/dist/leaflet.js',
                ],
                dest: 'build/js/vendor.min.js',
            },
            vendor_css: {
                src: [
                    'bower_components/angular-material/angular-material.min.css',
                    // 'bower_components/leaflet1.0b/leaflet.css',
                    // 'bower_components/leaflet/dist/leaflet.css',
                ],
                dest: 'build/css/vendor.css',
            },
            app: {
                src: [
                    // 'src/js/mapa.js',
                    'tmp/js/ng-app-ann.js'],          // and them the rest of .js files
                dest: 'build/js/app.js',
            }
        },

        // Javascript minification.
        uglify: {
            app: {
                options: {
                    compress: true,
                    verbose: true
                },
                files: [{
                    src: 'build/js/app.js',
                    dest: 'build/js/app.js',
                }]
            }
        },

        less: {
            transpile: {
                options: {
                    compress: true,
                    sourceMap: true,
                    sourceMapURL: 'style.css.map',
                    outputSourceFiles: true,
                },
                files: {
                    'build/css/style.css': [
                        'src/less/style.less', // includes the other files
                    ]
                }
            }
        },

        watch: {
            less: {
                files: ['src/**/*.less'],
                tasks: ['less:transpile']
            },
            app: {
                files: ['src/js/**/*.js'],
                tasks: ['jshint','ngAnnotate', 'concat:app' /*,'uglify'*/],
            },
            html: {
                files: ['src/*.html'],
                tasks: ['copy:html'],
            }
        },

    });

    grunt.registerTask('build',[
        'clean',
        'copy',
        'less',
        'jshint',
        'ngAnnotate',
        'concat',
        // 'uglify'
    ]);

    grunt.registerTask('default',[
        'build',
        'watch']
    );
};
