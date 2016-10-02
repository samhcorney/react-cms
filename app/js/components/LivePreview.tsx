import * as React from 'react';

var Handlebars = require( 'handlebars' );

export class LivePreview extends React.Component<any, {}> {

    constructor( props : any ) {
        super( props );
    }

    removeMetadata ( data ) {

        let result = {};
        if ( Object.prototype.toString.apply( data ) === '[object Object]' || Array.isArray( data ) ) {
            for ( var i in data ) {
                result[data[i]._handle] = data[i]._content !== undefined ? this.removeMetadata( data[i]._content ) : data[i];
            }
        }
        else {
            result = data;
        }
        return result;
    }

    render() {

        return (
            <div dangerouslySetInnerHTML={ { '__html' : Handlebars.compile( this.props.themeTemplate )( this.removeMetadata( JSON.parse( JSON.stringify( this.props.themeContent ) ) ) ) } } />
        );
    }
}
