const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const del = require('del');
const CleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const gcmq = require('gulp-group-css-media-queries');
const preproc = require('gulp-less');

const config = {
	src: './src',
	css: {
		watch: '/less/**/*.less',
		src: '/less/style.less',
		dest: './build/css'
	},
	html: '/index.html'
};
function css() {
	return gulp.src(config.src + config.css.src)
			.pipe(sourcemaps.init())
			.pipe(preproc())
			.pipe(gcmq())
			.pipe(autoprefixer({
					browsers: ['last 3 versions'],
					cascade: false
				}))
			.pipe(CleanCSS({
				level: 2
			}))
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest(config.css.dest))
			.pipe(browserSync.stream());;
}

function clean() {
	return del(['build/css']);
}

function watch() {
	browserSync.init({
        server: {
            baseDir: "./"
		}
    });
	gulp.watch(config.src + config.css.watch, css);
	gulp.watch("./*.html").on('change', browserSync.reload);
}
gulp.task('watch', watch);

gulp.task('build', gulp.series(clean,   
					gulp.parallel(css)
					));

gulp.task('dev', gulp.series('build', 'watch'));
