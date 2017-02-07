var path = require('path');
var chalk = require('chalk');    //不同颜色的info
var util = require('util');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');    //yeoman弹出框
var path = require('path');
var Reactpackage = yeoman.Base.extend({
    info: function() {
        this.log(chalk.green(
            'I am going to build your H5 templates!'
        ));
    },
    generateBasic: function() {  //按照自己的templates目录自定义
        this.directory('src', 'src');    //拷贝目录
        this.directory('dist', 'dist');
        this.copy('package.json', 'package.json');   //拷贝文件
        this.copy('README.md', 'README.md');
        this.copy('webpack.config.dev.js', 'webpack.config.dev.js');
        this.copy('webpack.config.pro.js', 'webpack.config.pro.js');
        this.copy('gulpfile.js', 'gulpfile.js');
    },
    generateClient: function() {
        this.sourceRoot(path.join(__dirname, 'templates'));
        this.destinationPath('./');
    },
    install: function() {      //安装依赖
        this.installDependencies({
            skipInstall: this.options['skip-install']
        });
    },
    end: function() {
        this.log(yosay(
            'Your H5 templates has been created successfully!'
        ));
    }
});
module.exports = Reactpackage;