import * as React from 'react';

import { AbstractContentType } from './AbstractContentType';

export class TextArea extends AbstractContentType {

    constructor( props : any ) {
        super( props );
    }

    render () {

        return (
            <textarea className={ this.props.className } value={ this.props.content._content } onChange={ this.handleChange.bind( this ) } />
        );
    }
}
