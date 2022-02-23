const { src, dest, parallel, series, watch } = require('gulp');
const browserSync  = require('browser-sync').create();
const del          = require('del');
const concat       = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleancss     = require('gulp-clean-css');
const imagemin     = require('gulp-imagemin');
const hash_src     = require('gulp-hash-src');

const sources = 'src';
const destination = 'build';

function browsersync() {
  browserSync.init({
    server: { baseDir: destination },
    notify: false,
    online: true,
  });
};

async function clean() {
  return await del(destination, { force: true })
    .then(res => {
      // https://simplernerd.com/js-console-colors/
      console.log("\x1b[38;2;0;128;0m%s\x1b[0m", "Successfully cleaned directory " + res)
    });
};

function buildJs() {
  return src(`${sources}/js/**/*.js`)
    .pipe(dest(`${destination}/js`))
    .pipe(browserSync.stream())
};

function buildStyles() {
  return src(`${sources}/css/**/*.css`)
    .pipe(concat('app.min.css'))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 versions'],
      grid: true
    }))
    .pipe(cleancss({
      level: {
        1: {
          all: 1,
          normalizeUrls: 0,
          specialComments: 0
        }
      },
    }))
    .pipe(dest(`${destination}/css`))
    .pipe(browserSync.stream())
};

function buildHtml() {
  return src(`${sources}/html/**/*.html`)
    .pipe(hash_src({
      build_dir: `${destination}`,
      src_path: `${sources}`,
      exts: ['.css', '.js']
    }))
    .pipe(dest(destination))
    .pipe(browserSync.stream())
};

function buildImages() {
  return src(`${sources}/images/**/*`)
    .pipe(imagemin())
    .pipe(dest(`${destination}/img`))
};

function startWatch() {
  watch(`${sources}/js/**/*.js`, buildJs);
  watch(`${sources}/css/**/*.css`, buildStyles);
  watch(`${sources}/html/**/*.html`, buildHtml);
  watch(`${sources}/images/**/*`, buildImages);
};

exports.watch = parallel(browsersync, startWatch);
exports.build = series(clean, buildStyles, buildJs, buildHtml, buildImages);
exports.default = series(exports.build, exports.watch);
