
由于最近H5做的比较多，所以还是整理了一下手上项目，综合了一下，做了一个H5脚手架来告别复制粘贴, 可能还需要根据项目情况做调整。

安装依赖包：
`npm install`

开发：
`gulp dev`

发布：
`gulp dist`

### ISSUE

**node-sass安装失败解决办法**：因为在安装`node-sass`的时候它把github Releases里的文件都托管在`s3.amazonaws.com`上面，而这个网址在国内总是网络不稳定，所以我们通过淘宝镜像去下载这个文件。

直接运行下面的命令即可

```

SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/ npm install node-sass

```