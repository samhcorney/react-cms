import * as React from 'react';

import { AbstractContentType } from './AbstractContentType';

export class Text extends AbstractContentType {

    constructor( props : any ) {
        super( props );
    }

    render () {

        return (
            <div>
                <label htmlFor={ this.props.id }>{ this.props.content._name }</label>
                <input name={ this.props.id } id={ this.props.id } type="text" value={ this.props.content._content } onChange={ this.handleChange.bind( this ) } />
            </div>
        );
    }
}