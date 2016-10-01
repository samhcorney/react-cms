import * as React from 'react';

import { AbstractContentType } from './AbstractContentType';
import { Icon } from '../Icon';

export class Checkbox extends AbstractContentType {

    constructor( props : any ) {
        super( props );
    }

    handleChange ( event ) {

        this.props.content._content = !this.props.content._content;
        this.props.onContentChange( event );
    }

    render () {

        return (
            <Icon className={ 'checkbox' + ( this.props.content._content ? ' checkbox-checked' : ' checkbox-not-checked' ) } onClick={ this.handleChange.bind( this ) } name="checkmark"/>
        );
    }
}
