import * as React from 'react';

import { AbstractContentType } from './AbstractContentType';

export class Checkbox extends AbstractContentType {

    constructor( props : any ) {
        super( props );
    }

    handleChange ( event ) {

        this.props.content._content = event.target.checked;
        this.props.onContentChange( event );
    }

    render () {

        return (
            <input type="checkbox" checked={ this.props.content._content } value={ this.props.content._content } onChange={ this.handleChange.bind( this ) } />
        );
    }
}
