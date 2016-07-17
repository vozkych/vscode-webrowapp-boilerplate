var gulp = require("gulp");
var sass = require("gulp-sass");
var ts = require("gulp-typescript");
var sourcemaps = require("gulp-sourcemaps");

var tsSources = "app/src/js/**/*.ts";
var sassSources = "app/src/css/**/*.scss";
var tsProject = ts.createProject("tsconfig.json");
 
gulp.task("scripts", function() {
	var tsResult = gulp.src(["typings/*.d.ts", tsSources])
		.pipe(sourcemaps.init())
		.pipe(ts(tsProject));

	return tsResult.js.pipe(sourcemaps.write(".")).pipe(gulp.dest("app/build/js"));
});
gulp.task("sass", function() {
	var sassResult = gulp.src(sassSources).pipe(sass());

	return sassResult.pipe(gulp.dest("app/build/css"));
});
gulp.task("build-persistent", ["scripts"], function() {
	gulp.watch(tsSources, ["scripts"]);
	gulp.watch(sassSources, ["sass"]);
});