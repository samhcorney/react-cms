import * as React from 'react';

import { AbstractContentType } from './AbstractContentType';

export class Number extends AbstractContentType {

    constructor( props : any ) {
        super( props );
    }

    handleChange ( event ) {

        this.props.content._content = parseFloat( event.target.value );
        this.props.onContentChange( event );
    }

    render () {

        return (
            <input className={ this.props.className } type="number" value={ this.props.content._content } onChange={ this.handleChange.bind( this ) } />
        );
    }
}
