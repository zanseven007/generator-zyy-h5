# H5 Small Project Generator Based on Webpack and Gulp

> - H5 is increasingly popular, in order to facilitate the development of future convenience, hereby write a template generator for future use
> - The use of @@ include in HTML supports the introduction of an .inc file
> - In the CSS file can be used to scss
> - Js in the use of webpack merge the public module, you can have any entry file
> - Development can automatically start the Chrome browser, and open the local 3000 port to debug

## USAGE
install yo

```
npm install -g yo
```
install H5 template

```
npm install -g generator-zyy-h5
```
Create a new project directory and enter

```
mkdir my-new-h5 && cd $_
```
Use the H5 template

```
yo zyy-h5
```

Development

```
gulp dev
```
Release (will compress the css and js, and increase md5)
```
gulp dist
```

## ISSUE

**node-sass installation failed Solution**: because the installation of `node-sass` when it github Releases are hosted in the file `s3.amazonaws.com` above, and this site is always in the country network is not Stable, so we Taobao mirror to download this file.

Directly run the following command

```
SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/ npm install node-sass && npm install gulp-sass
```

## License
MIT © [zanseven007](https://github.com/zanseven007)
