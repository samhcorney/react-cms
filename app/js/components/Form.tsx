import * as React from 'react';

import { ContentTypeRenderer } from './contenttypes/ContentTypeRenderer';
import { Toast } from './Toast';
import { Icon } from './Icon';

export class Form extends React.Component<any, {}> {

    refs;

    constructor( props : any ) {
        super( props );
    }

    reset () {

        for( var key in this.props.formItems ) {
            let formItem = this.props.formItems[key];
            formItem._error = false;
            formItem._content = '';
        }
    }

    handleChange ( event ) {

        this.forceUpdate();
    }

    submitForm () {

        let error = '';
        let emptyFieldErrorCount = 0;

        // Form items cannot be empty
        for( var key in this.props.formItems ) {
            let formItem = this.props.formItems[key];

            if ( !formItem._content ) {
                formItem._error = true;
                emptyFieldErrorCount ++;
                error = 'The highlighted item' + ( emptyFieldErrorCount > 1 ? 's' : '' ) + ' need' + ( emptyFieldErrorCount === 1 ? 's' : '' ) + ' to be filled out'
            }
            else {
                formItem._error = false;
            }
        }

        // Handles must be unique
        if ( !error ) {
            for( var key in this.props.formItems ) {
                let formItem = this.props.formItems[key];
                if ( key === 'addContentHandle' ) {
                    for ( var i = 0; i < this.props.content.length; i++ ) {
                        console.log( formItem._content, this.props.content[ i ]._handle );
                        if( formItem._content === this.props.content[ i ]._handle ) {
                            formItem._error = true;
                            error = 'Handles must be unique';
                        }
                    }

                    // Handles cannot start with an underscore
                    if ( !error ) {
                        if ( formItem._content.charAt(0) === '_' ) {
                            formItem._error = true;
                            error = 'Handles cannot start with an underscore';
                        }
                    }
                }
            }
        }

        if ( error ) {
            this.forceUpdate();
            this.refs.toast.open( error );
        }
        else {
            this.props.onSubmitSuccess( this.props.formItems );
            this.reset();
        }
    }

    render () {

        let formItems = [];

        for ( var key in this.props.formItems ) {
            let formItem = this.props.formItems[ key ];
            formItems.push (
                <ContentTypeRenderer className={ 'formItem' + ( formItem._error ? ' formItem--error' : '' ) } key={ key } content={ formItem } onContentChange={ this.handleChange.bind( this ) } />
            )
        }

        return (
            <div className={ 'formContainer' + ( this.props.className ?  ' ' + this.props.className : '' ) }>
                <div className="form">
                    { formItems }
                </div>
                <Toast ref="toast" />
            </div>
        );
    }
}
