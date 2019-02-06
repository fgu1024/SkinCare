module.exports = function (grunt) {
    grunt.initConfig({
        watch: {
            pug: {
                files: ['views/**'],
                options: {
                    livereload: true //文件改动后，重新启动服务
                }
            },
            js: {
                files: ['public/js/**', 'model/**/*.js', 'schemas/**/*.js'],
                //tasks: ['jshint'], //语法检查
                options: {
                    livereload: true
                }
            }
        },
        nodemon: {
            dev: {
                options: {
                    file: 'app.js', //入口文件
                    args: [],
                    ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
                    watchedExtensions: ['js'],
                    watchedFolders: ['app','config'],
                    debug: true,
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },
        concurrent: { //即下面grunt.registerTask中的第二个参数
            tasks: ['watch','nodemon'],
            options: {
                logConcurrentOutput: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch'); //文件发生更新时，重新执行写好的任务
    grunt.loadNpmTasks('grunt-nodemon'); //监听app.js文件，如果有改动，自动重启
    grunt.loadNpmTasks('grunt-concurrent'); //优化慢任务（如：sass的编译）的构建时间

    grunt.option('force', true); //避免由于warning或者error，中断grunt的整个服务
    grunt.registerTask('default', ['concurrent'])
};