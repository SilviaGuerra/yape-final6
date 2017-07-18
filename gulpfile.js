var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var obfuscate = require("gulp-obfuscate");
var sass = require("gulp-sass");

var config = {
  source: "./src/",
  dist: "./public/"
};

var paths = {
  html: "**/*.html",
  sass: "assets/scss/**/*.scss",
  mainSass: "assets/scss/main.scss",
  js: "assets/js/**/*.js",
  mainJS: "assets/js/app.js"
};

var sources = {
  html: config.source + paths.html,
  sass: config.source + paths.sass,
  rootSass: config.source + paths.mainSass,
  rootJS: config.source + paths.js,
  rootJS: config.source + paths.mainJS
};

gulp.task("html", () =>{
  gulp.src(sources.html).pipe(gulp.dest(config.dist));
});

gulp.task("sass", () => {
  gulp.src(sources.rootSass)
  .pipe(sass({outputStyle: "compresed"}).on("error", sass.logError))
  .pipe(gulp.dest(config.dist + "/assets/css"));
});

gulp.task("js", () => {
  gulp.src(sources.rootJS)
  .pipe(concat("todo.js"))
  .pipe(uglify())
  .pipe(obfuscate)
  .pipe(gulp.dest(config.dist + "/assets/js"));
});

gulp.task("sass-watch", ["sass"], () => {
  browserSync.reload();
  done();
});

gulp.task("html-watch", ["html"], () => {
  browserSync.reload();
  done();
});

gulp.task("default", function(){
  browserSync.init({
    server:{
      baseDir: "./public"
    }
  });
  gulp.watch("./src/assets/scss/*.scss", ["sass-watch"]);
  gulp.watch("./src/*.html", ["html-watch"]);
});
