module.exports = function (grunt) {
    var coffeeDir = 'coffee/';
    var jsDir = 'js/';
    var testDir = 'test/';
    var nodeDir = 'node_modules/';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        coffee: {
            oneByOne: {
                options: {
                    bare: true
                },
                files: [{
                    expand: true,
                    cwd: coffeeDir,
                    src: ['{,*/}*.coffee'],
                    dest: jsDir,
                    rename: function (dest, src) {
                        return dest + '/' + src.replace(/\.coffee$/, '.js');
                    }
                }]
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    require: [
                        nodeDir + 'coffee-script/register',
                        function () {
                            global.cc = require('./js/caro-console.js');
                        },
                        function () {
                            var chai = require('chai');
                            global.should = chai.should();
                        }
                    ]
                },
                src: [testDir + '*.coffee']
            }
        }
    });

    // coffee-script 轉 js
    grunt.loadNpmTasks('grunt-contrib-coffee');
    // unit test
    grunt.loadNpmTasks('grunt-mocha-test');

    // 套裝任務
    grunt.registerTask('default', ['coffee', 'mochaTest']);
};