'use strict';

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        watch:{
            files:['./app/**/*'],
            tasks:'server'
        }

    });


    grunt.registerTask('server', 'start the server', function() {
        require('./app/server.js');
    });

    grunt.registerTask('run', function () {
        
        grunt.task.run([
            'server',
            'watch'
        ]);
    });

    grunt.registerTask('default', [
        'run'
    ]);
};
