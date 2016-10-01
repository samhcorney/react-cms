import * as React from 'react';

import { ContentTypeRenderer } from './contenttypes/ContentTypeRenderer';
import { Toast } from './Toast';
import { Icon } from './Icon';

export class Form extends React.Component<any, {}> {

    refs;

    constructor( props : any ) {
        super( props );
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
                this.props.formItems[key]._error = true;
            }
            else {
                this.props.formItems[key]._error = false;
            }
        }

        if ( error ) {
            this.forceUpdate();
            this.refs.toast.open( 'The highlighted item' + ( errorCount > 1 ? 's' : '' ) + ' need to be filled out' );
        }
        else {
            this.props.onSubmitSuccess( this.props.formItems );

            for( var key in this.props.formItems ) {
                this.props.formItems[key]._content = '';
            }
        }
    }

    render () {

        let addContentFormItems = [];

        for ( var key in this.props.formItems ) {
            let formItem = this.props.formItems[ key ];
            addContentFormItems.push (
                <div className={ 'formItem' + ( formItem._error ? ' formItem--error' : '' ) } key={ key }>
                    <ContentTypeRenderer content={ formItem } onContentChange={ this.handleChange.bind( this ) } />
                </div>
            )
        }

        return (
            <div className={ 'form' + ( this.props.className ?  ' ' + this.props.className : '' ) }>
                { addContentFormItems }
                <Icon onClick={ this.submitForm.bind( this ) } name="plus" className="btn"/>
                <Toast ref="toast" />
            </div>
        );
    }
}
