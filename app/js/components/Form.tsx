import * as React from 'react';

import { ContentTypeRenderer } from './contenttypes/ContentTypeRenderer';
import { Toast } from './Toast';

export class Form extends React.Component<any, {}> {

    state = {
        formErrorMessage: ''
    };

    constructor( props : any ) {
        super( props );
    }

    handleChange ( event ) {

        this.state.formErrorMessage = '';
        this.forceUpdate();
    }

    submitForm () {

        this.state.formErrorMessage = '';

        for( var key in this.props.formItems ) {
            let formItem = this.props.formItems[key];
            if ( !formItem._content ) {
                this.props.formItems[key]._error = true;
                this.state.formErrorMessage = 'The items highlighted in red need to be filled out';
            }
            else {
                this.props.formItems[key]._error = false;
            }
        }

        if ( this.state.formErrorMessage ) {
            this.setState( this.state );
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
            let formItemClasses = 'formItem';
            formItemClasses = formItem._error ? formItemClasses.concat( ' formItem--error' ) : formItemClasses;
            addContentFormItems.push (
                <div className={ formItemClasses } key={ key }>
                    <h4>{ formItem._name }</h4>
                    <ContentTypeRenderer content={ formItem } onContentChange={ this.handleChange.bind( this ) } />
                </div>
            )
        }

        return (
            <div className="form">
                { addContentFormItems }
                <button onClick={ this.submitForm.bind( this ) }>Add</button>
                <Toast message={ this.state.formErrorMessage } />
            </div>
        );
    }
}
