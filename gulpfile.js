"use strict";

var _, watchify, browserify, babelify,
    gulp, source, buffer, gutil, sourcemaps,
    watch, sass, uglify, webserver,

    customOptions, options, bundler;

_ = require("lodash");

watchify = require("watchify");
browserify = require("browserify");
babelify = require("babelify");

gulp = require("gulp");
webserver = require("gulp-webserver");
uglify = require("gulp-uglify");
gutil = require("gulp-util");
watch = require("gulp-watch");
sass = require("gulp-sass");
sourcemaps = require("gulp-sourcemaps");

source = require("vinyl-source-stream");
buffer = require("vinyl-buffer");

customOptions = {
  entries: ["./index.js"],
  debug: true
};

options = _.assign({
  fullPaths: false,
  extensions: [".js", ".jsx"]
}, watchify.args, customOptions);

bundler = watchify(browserify(options));

// Add transformations here.
bundler.transform(babelify);

gulp.task("watch", ["fonts", "css", "html", "sfx", "images"], function() {
  bundle();

  gulp.watch("./src/styles/**/*.scss", ["css"]);
  gulp.watch("./src/images/**/*.*", ["images"]);
  gulp.watch("./src/fonts/**/*.*", ["fonts"]);
  gulp.watch("./src/sfx/**/*.*", ["sfx"]);
  gulp.watch("./src/html/**/*.*", ["html"]);
});

gulp.task("css", css);
gulp.task("html", html);
gulp.task("images", images);
gulp.task("fonts", fonts);
gulp.task("sfx", sfx);
gulp.task("runserver", runserver);

bundler.on("update", bundle);
bundler.on("log", gutil.log);

function runserver () {
  gulp.src("./dist")
      .pipe(webserver({
        fallback: "index.html",
        host: "0.0.0.0",
        port: 8008,
        livereload: true
      }));
}

function html () {
  return gulp.src("./src/html/**/*.*")
    .on("log", gutil.log)
    .pipe(gulp.dest("./dist"));
}

function fonts () {
  return gulp.src("./src/fonts/**/*.*")
    .on("log", gutil.log)
    .pipe(gulp.dest("./dist/fonts"));
}

function sfx () {
  return gulp.src("./src/sfx/**/*.*")
    .on("log", gutil.log)
    .pipe(gulp.dest("./dist/sfx"));
}

function images () {
  return gulp.src("./src/images/**/*.*")
    .on("log", gutil.log)
    .pipe(gulp.dest("./dist/images"));
}

function css () {
  return gulp.src("./src/styles/index.scss")
    .on("log", gutil.log)
    .on("error", gutil.log.bind(gutil, "CSS Error"))
    .pipe(sass())
    .pipe(gulp.dest("./dist/css"));
}

function bundle () {
  return bundler.bundle()
    .on("error", gutil.log.bind(gutil, "Browserify Error"))
    .pipe(source("build.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))

    // Add transformation tasks to the pipeline here.
    //.pipe(uglify())

    .pipe(sourcemaps.write("./", { debug: true }))
    .pipe(gulp.dest("./dist/js"));
}