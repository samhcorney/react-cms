import * as React from 'react';

import { AbstractContentType } from './AbstractContentType';

export class Text extends AbstractContentType {

    constructor( props : any ) {
        super( props );
    }

    render () {

        return (
            <input className={ this.props.className } placeholder={ this.props.content._placeholder ? this.props.content._placeholder : '' } type="text" value={ this.props.content._content } onChange={ this.handleChange.bind( this ) } />
        );
    }
}
