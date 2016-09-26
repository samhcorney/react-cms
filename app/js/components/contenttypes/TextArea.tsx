import * as React from 'react';

import { AbstractContentType } from './AbstractContentType';

export class TextArea extends AbstractContentType {

    constructor( props : any ) {
        super( props );
    }

    render () {

        return (
            <textarea value={ this.props.content._content } onChange={ this.handleChange.bind( this ) } />
        );
    }
}
