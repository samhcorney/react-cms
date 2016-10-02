import * as React from 'react';

import { AbstractContentType } from './AbstractContentType';

export class Colour extends AbstractContentType {

    constructor( props : any ) {
        super( props );
    }

    render () {

        return (
            <input className={ this.props.className } type="text" value={ this.props.content._content } onChange={ this.handleChange.bind( this ) } />
        );
    }
}
