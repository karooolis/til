# CSS and JS injection Bower and Gulp

Today I learnt how to manage CSS and JavaScript dependencies via Bower and automatically inject them into appropriate HTML file. The setup can be seen below in a `gulpfile.js` file.

The task `inject` reads all Bower dependencies declared in `options` variable. The key here is `./bower.json` file declaration that contains all our JavaScript and CSS dependencies. `wiredep` takes care of the rest.

To inject our own CSS and JavaScript files which are not downloaded via Bower, we use `gulp-inject` where we declare where our files are set up in `injectSrc` variable. That's it, pretty straightforward.

The `serve` task is not needed here but it runs our server and automatically re-injects any dependencies, or reloads the server in case anything changes in the watched files.

```javascript
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('inject', function () {
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');

    var injectSrc = gulp.src(['./public/css/*.css', './public/js/*.js'], {
        read: false
    });

    var injectOptions = {
        ignorePath: '/public'
    };

    var options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../../public'
    };

    return gulp.src('./src/views/*.html')
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./src/views'));
});

gulp.task('serve', ['inject'], function () {
    var options = {
        script: 'app.js',
        delayTime: 1,
        env: {
            'PORT': 3000
        },
        watch: jsFiles
    };

    return nodemon(options)
        .on('restart', function (ev) {
            console.log('Restarting...');
        });
});
```

An example of `bower.json` file can be seen below. It doesn't have to be like this, any `bower.json` file created with `bower init` will do. The only caveat here is that we need to override some default options because by default Bootstrap only provides `less` files, so we need to declare where the actual CSS file can be found as well using `overrides` attribute.

```javascript
{
    "name": "express-sandbox",
    "description": "",
    "main": "app.js",
    "authors": [
    "Karolis Ramanauskas <karolisr@live.com>"
  ],
    "license": "ISC",
    "homepage": "",
    "ignore": [
    "**/.*",
    "node_modules",
    "bower_components",
    "test",
    "tests"
  ],
    "dependencies": {
        "bootstrap": "^3.3.6",
        "font-awesome": "^4.6.1"
    },
    "overrides": {
        "bootstrap": {
            "main": [
                "dist/js/bootstrap.js",
                "dist/css/bootstrap.css",
                "less/bootstrap.less"
            ]
        },
        "font-awesome": {
            "main": [
                "less/font-awesome.less",
                "css/font-awesome.min.css",
                "scss/font-awesome.scss"
            ]
        }
    }
}
```

Finally, to inject the files during Gulp task, we declare the appropriate comments in our HTML files. The comments go as such `<!-- bower:css --><!-- endbower -->` for Bower files, and `<!-- inject:css --><!-- endinject -->` for files declared by us.

Below is an example of how a `<head>` would look of such HTML file. After running `gulp inject`, inside the comments we got our Bower dependencies and our own declared files as expected.

```html
<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <title>Storystrap Template</title>
    <meta name="generator" content="Bootply" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    
    <!-- bower:css -->
    <link rel="stylesheet" href="/lib/bootstrap/dist/css/bootstrap.css" />
    <link rel="stylesheet" href="/lib/font-awesome/css/font-awesome.min.css" />
    <!-- endbower -->

    <!-- bower:js -->
    <script src="/lib/jquery/dist/jquery.js"></script>
    <script src="/lib/bootstrap/dist/js/bootstrap.js"></script>
    <!-- endbower -->

    <!-- inject:css -->
    <link rel="stylesheet" href="/css/styles.css">
    <!-- endinject -->

    <!-- inject:js -->
    <script src="/js/app.js"></script>
    <!-- endinject -->

    <!--[if lt IE 9]>
		<script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
</head>
```

## Why?

One question, why do we need this at all? For really small projects there is no real need for such complex JavaScript and CSS dependency management. Where it really shines is when you have a large project with a number of files. Then each time you create a new file or edit existing one, it will become automatically available.

Also, in case you want to make the project more maintainable in the future, Bower is great because it makes updating packages a lot more convenient by removing the need for manual copy/pasting. It also manages the dependencies for whatever JavaScript and CSS files you require and thus, lessens the probability of new updates breaking your build.

## Resources

- [Building Web Applications with Node.js and Express 4.0](https://www.pluralsight.com/courses/nodejs-express-web-applications)
- [Bower.io](http://bower.io/)
- [Gulp](http://gulpjs.com/)
- [gulp-inject](https://www.npmjs.com/package/gulp-inject)
- [wiredep](https://www.npmjs.com/package/wiredep)