# 基于Webpack和Gulp的H5小项目生成器
> H5 日益普及，为了方便日后开发的方便，特此写一个模板生成器为日后使用

## 使用yoeman创建模板
安装 yo

```
npm install -g yo

```
安装H5模板生成器

```

npm install -g generator-zyy-h5

```
新建一个项目目录并进入

```

mkdir my-new-h5 && cd $_

```
使用H5模板

```

yo zyy-h5

```

## 使用模板
开发

```
gulp dev

```

发布

```
gulp dist

```

## ISSUE

因为在安装`node-sass`的时候它把github Releases里的文件都托管在`s3.amazonaws.com`上面，而这个网址在国内总是网络不稳定，所以我们通过淘宝镜像去下载这个文件。

直接运行下面的命令即可

```

SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/ npm install node-sass

```

## License
MIT © [zanseven007](https://github.com/zanseven007)
