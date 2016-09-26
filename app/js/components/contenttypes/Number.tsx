import * as React from 'react';

import { AbstractContentType } from './AbstractContentType';

export class Number extends AbstractContentType {

    constructor( props : any ) {
        super( props );
    }

    handleChange ( event ) {

        this.props.content._content = parseFloat( event.target.value );
        this.props.onThemeContentChange( event );
    }

    render () {

        return (
            <div>
                <label htmlFor={ this.props.id }>{ this.props.content._name }</label>
                <input name={ this.props.id } id={ this.props.id } type="number" value={ this.props.content._content } onChange={ this.handleChange.bind( this ) } />
            </div>
        );
    }
}
