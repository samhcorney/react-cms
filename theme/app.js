/*------------------------------------*\
    THIS IS TEMPORARY AND USED FOR TESTING
    DO NOT USE THIS FILE IN A PROD ENV
\*------------------------------------*/

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

// HANDLEBARS
var Handlebars = require( 'handlebars' );

// JSON TO SASS
var jsonSass = require( 'json-sass' );
var rename = require( 'gulp-rename' );
var fs = require( 'fs' );

// JS
var source = require( 'vinyl-source-stream' );
var sourcemaps = require( 'gulp-sourcemaps' );

// GULP
var gulp = require( 'gulp' );

// SCSS
var sass = require( 'gulp-sass' );
var bourbon = require( 'node-bourbon' );
var neat = require( 'node-neat' );
var autoprefixer = require( 'gulp-autoprefixer' );

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

/*------------------------------------*\
    SAVE CONTENT
\*------------------------------------*/
app.post('/saveContent', function(req, res, next) {

    fs.readFile( '../theme/template.html', function ( err, template ) {
       fs.writeFile( '../theme/content.json', JSON.stringify( req.body ) );
       fs.writeFile( '../theme/index.html', Handlebars.compile( template.toString() )( removeMetadata( req.body ) ) );
   });
   res.send('done');
});

function removeMetadata ( data ) {
    var result = {};

    if ( Object.prototype.toString.apply( data ) === '[object Object]' || Array.isArray( data ) ) {
        result = data;
        for ( var i in data ) {
            result[i] = data[i]._content !== undefined ? removeMetadata( data[i]._content ) : data[i];
        }
    }
    else {
        result = data;
    }
    return result;
}

function removeMetadataAlt ( data ) {

    var result = {};
    if ( Object.prototype.toString.apply( data ) === '[object Object]' || Array.isArray( data ) ) {
        for ( var i in data ) {
            result[data[i]._handle] = data[i]._content !== undefined ? removeMetadata( data[i]._content ) : data[i];
        }
    }
    else {
        result = data;
    }
    return result;
}




/*------------------------------------*\
    SAVE THEME
\*------------------------------------*/
app.post('/saveTheme', function(req, res, next) {

    fs.writeFile( '../theme/theme.json', JSON.stringify( req.body ), function(){
        fs.writeFile( '../theme/temporaryhackdeleteme.json', JSON.stringify( removeMetadata( req.body ) ), function () {
            jsonToScss();
            themeScss();
        });
    });
    res.send('done');
});

app.listen( 3005 );





























/*------------------------------------*\
    SASS
\*------------------------------------*/
var sassOptionsTheme = {
    src: '../theme/scss/app.scss',
    dest: '../theme/build',
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

function themeScss() {
    return gulp.src( sassOptionsTheme.src )
        .pipe( sourcemaps.init() )
        .pipe( sass( sassOptionsTheme.sass ) )
        .on( 'error', sassOptionsTheme.onError )
        .pipe( autoprefixer( sassOptionsTheme.autoprefixer) )
        .pipe( sourcemaps.write() )
        .pipe( rename( 'theme.css' ) )
        .pipe( gulp.dest( sassOptionsTheme.dest ) );
}




/*------------------------------------*\
    JSON TO SASS
\*------------------------------------*/
function jsonToScss () {
    return fs.createReadStream( '../theme/temporaryhackdeleteme.json' )
        .pipe( jsonSass({
            prefix: '$theme: ',
        }))
        .pipe( source( 'theme.json' ) )
        .pipe( rename( '_theme.scss' ) )
        .pipe( gulp.dest( '../theme/scss/modules/variables' ) );
}












testData = {
    "body":{
        "_type":"object",
        "_content":{
            "title":{
                "_type":"text",
                "_content":"Body title"
            },
            "bodyText":{
                "_type":"object",
                "_content":{
                    "bodyTextTitle": {
                        "_type" : "text",
                        "_content" : "Body text title"
                    },
                    "bodyTextContent": {
                        "_type":"list",
                        "_content":[
                            {
                                "_type":"text",
                                "_content":[
                                    {
                                        "one":1
                                    },
                                    {
                                        "two":2
                                    }
                                ]
                            },
                            {
                                "_type":"text",
                                "_content":"Second para"
                            }
                        ]
                    }
                }
            },

            "bodyFooter":{
                "_type":"list",
                "_content":[
                    {
                        "_type":"text",
                        "_content":"First para footer"
                    },
                    {
                        "_type":"text",
                        "_content":"Second para footer"
                    }
                ]
            }
        }
    },
    "footer":{
        "_type":"text",
        "_content":"Footer Text"
    },
    "more":{
        "_type":"text",
        "_content":true
    },
    "number":{
        "_type":"text",
        "_content":1234
    },
    "nully":{
        "_type":"text",
        "_content":null
    },
    "zero":{
        "_type":"text",
        "_content":0
    },
    "negative":{
        "_type":"text",
        "_content":-15
    }
};
