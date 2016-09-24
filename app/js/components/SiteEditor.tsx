import * as React from 'react';

var Handlebars = require( 'handlebars' );

export class SiteEditor extends React.Component<any, {}> {

    html: {} = { __html: '' };

    constructor( props : any ) {
        super( props );
    }

    render() {
        this.html = { __html: Handlebars.compile( this.props.themeTemplate )( this.props.themeContent ) }
        return (
            <div dangerouslySetInnerHTML={ this.html } />
        );
    }
}
