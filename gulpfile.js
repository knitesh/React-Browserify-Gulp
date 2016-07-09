(function(require){
"use strict";

var gulp = require("gulp");
var connect = require("gulp-connect");
var open = require("gulp-open");

var browserify =require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

var concat = require('gulp-concat');
var eslint = require('gulp-eslint');

var config = {
	port: 3000,
	baseUrl: 'http://localhost',
	paths:{
		html: './src/*.html',
		js: './src/**/*.js',
		css: [
		'node_modules/bootstrap/dist/css/bootstrap.min.css',
		'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
		],
		dist: './release',
		mainjs: './src/main.js'
	}
};

//star a loca dev server
gulp.task('connect',function(){
	connect.server({
		root: ['release'],
		port: config.port,
		base: config.baseUrl,
		livereload: true
	});
});


gulp.task('open',['connect'],function(){
	gulp.src('release/index.html')
		.pipe(open({uri: config.baseUrl + ':' + config.port + '/'}));
});

gulp.task('html',function(){
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
});
gulp.task('css',function(){
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + '/css'))
		.pipe(connect.reload());
});

gulp.task('js', function() {
	browserify(config.paths.mainjs)
		.transform(reactify)
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload());
});



gulp.task('watch',function(){
	gulp.watch(config.paths.html,['html']);
	gulp.watch(config.paths.js,['js']);
	gulp.watch(config.paths.css,['css']);
});

gulp.task('default',['html','css','js','open','watch']);
})(require);