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

        let error = false;
        let errorCount = 0;

        for( var key in this.props.formItems ) {
            let formItem = this.props.formItems[key];
            if ( !formItem._content ) {
                errorCount ++;
                error = true;
                formItem._error = true;
            }
            else {
                formItem._error = false;
            }
        }

        if ( error ) {
            this.forceUpdate();
            this.refs.toast.open( 'The highlighted item' + ( errorCount > 1 ? 's' : '' ) + ' need' + ( errorCount === 1 ? 's' : '' ) + ' to be filled out' );
        }
        else {
            this.props.onSubmitSuccess( this.props.formItems );
            this.reset();
        }
    }

    render () {

        let addContentFormItems = [];

        for ( var key in this.props.formItems ) {
            let formItem = this.props.formItems[ key ];
            addContentFormItems.push (
                <ContentTypeRenderer className={ 'formItem' + ( formItem._error ? ' formItem--error' : '' ) } key={ key } content={ formItem } onContentChange={ this.handleChange.bind( this ) } />
            )
        }

        return (
            <div className={ 'formContainer' + ( this.props.className ?  ' ' + this.props.className : '' ) }>
                <div className="form">
                    { addContentFormItems }
                </div>
                <Toast ref="toast" />
            </div>
        );
    }
}
