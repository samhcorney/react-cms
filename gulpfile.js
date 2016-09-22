// GULP
var gulp = require( 'gulp' );

// JS
var watchify = require( 'watchify' );
var browserify = require( 'browserify' );
var source = require( 'vinyl-source-stream' );
var buffer = require( 'vinyl-buffer' );
var gutil = require( 'gulp-util' );
var sourcemaps = require( 'gulp-sourcemaps' );
var assign = require( 'lodash.assign' );
var tsify = require( 'tsify' );
var babelify = require( 'babelify' );

// SCSS
var sass = require( 'gulp-sass' );
var bourbon = require( 'node-bourbon' );
var neat = require( 'node-neat' );
var autoprefixer = require( 'gulp-autoprefixer' );

// SVG
var svgo = require( 'gulp-svgo' );
var cheerio = require( 'gulp-cheerio' );
var svgSymbols = require( 'gulp-svg-symbols' );

// BROWSER SYNC
var browserSync = require( 'browser-sync' ).create();




/*------------------------------------*\
    JS
\*------------------------------------*/
var customOpts = {
  entries: [ './app/js/app.tsx' ],
  debug: true
};
var opts = assign( {}, watchify.args, customOpts );
// var b = watchify ( browserify( opts ).plugin( tsify, { target: 'es6' } )
//     .transform( babelify, { extensions: [ '.tsx', '.ts' ] } ) );
var b = watchify ( browserify( opts ).plugin( tsify ) ).transform( babelify, { extensions: [ '.tsx', '.ts' ], presets: [ "react" ] } );

gulp.task( 'js', bundle );
b.on( 'update', bundle );
b.on( 'log', gutil.log );

function bundle() {
    return b.bundle()
        .on( 'error', gutil.log.bind( gutil, 'Browserify Error' ) )
        .pipe( source( 'app.bundle.js' ) )
        .pipe( buffer() )
        .pipe( sourcemaps.init( { loadMaps: true} ) )
        .pipe( sourcemaps.write( './' ) )
        .pipe( gulp.dest( 'build/js' ) );
}




/*------------------------------------*\
    SCSS
\*------------------------------------*/
var sassOptions = {
    src: 'app/scss/**/*.scss',
    dest: 'build/css',
    sass: {
        includePaths: bourbon.includePaths.concat( neat.includePaths )
    },
    onError: function( error ) {
        console.error( error.message );
        this.emit( 'end' );
    },
    autoprefixer: {
        browsers: [ 'last 2 versions' ],
        cascade: false
    }
};

gulp.task( "scss", function () {
    return gulp.src( sassOptions.src )
        .pipe( sourcemaps.init() )
        .pipe( sass( sassOptions.sass ) )
        .on( 'error', sassOptions.onError )
        .pipe( autoprefixer( sassOptions.autoprefixer) )
        .pipe( sourcemaps.write() )
        .pipe( gulp.dest( sassOptions.dest ) );
});




/*------------------------------------*\
    SVG
\*------------------------------------*/
gulp.task( 'svg', function () {
    return gulp.src( 'app/fonts/svg/*.svg' )
        .pipe( svgo() )
        .pipe( cheerio({
            run: function ( $ ) {
                $( '[fill]' ).removeAttr( 'fill' );
            },
            parserOptions: { xmlMode: true }
        }))
        .pipe( svgSymbols({
            fill: false,
            className: '.icon-%f',
            templates: [ './app/fonts/svg/templates/svg-symbols.svg', './app/fonts/svg/templates/svg-symbols.css' ]
        }))
        .pipe( gulp.dest( 'build/fonts' ) );
});




/*------------------------------------*\
    DEFAULT
\*------------------------------------*/
gulp.task( 'default', [ 'js', 'scss', 'svg' ], function () {
    browserSync.init( [ 'build/css/*.css', 'build/js/*.js' ], {
        server: "./"
    });
    gulp.watch( [ 'app/**/*.scss' ], [ 'scss' ] );
    gulp.watch( [ 'app/fonts/svg/**/*.svg' ], [ 'svg' ] );
    gulp.watch( [ '*.html', 'build/fonts/*.css' ], function () {
        browserSync.reload();
    });
});
