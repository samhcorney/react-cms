import * as React from 'react';

import { Modal } from './Modal';
import { Form } from './Form';

import { Icon } from './Icon';

export class AddContentModal extends Modal {

    refs;

    customOptions = {
        title: 'Add new content',
        confirmText: 'add'
    };

    constructor( props : any ) {
        super( props );
        this.setOptions( this.customOptions );
    }

    handleConfirmClick () {

        this.refs.addContentForm.submitForm();
    }

    addContent () {

        this.state.options.callbackData =  JSON.parse( JSON.stringify( this.props.addContentFormData ) );
        this.refs.addContentForm.reset();
        super.handleConfirmClick();
    }

    close () {

        this.refs.addContentForm.reset();
        super.close();
    }

    render () {

        return (
            this.state.isOpen ?
            <div className="modal" onClick={ this.close.bind( this ) }>
                <div className="modal-inner" onClick={ this.stopPropagation.bind( this ) }>
                    <div className="modal-header">
                        <h4>{ this.state.options.title }</h4>
                        <Icon onClick={ this.close.bind( this ) } name="cross" className="btn"/>
                    </div>
                    <div className="modal-content">
                        <Form ref="addContentForm" formItems={ this.props.addContentFormData } content={ this.props.content } onSubmitSuccess={ this.addContent.bind( this ) } />
                    </div>
                    <div className="modal-footer">
                        <button onClick={ this.close.bind( this ) }>{ this.state.options.cancelText }</button>
                        <button onClick={ this.handleConfirmClick.bind( this ) }>{ this.state.options.confirmText }</button>
                    </div>
                </div>
            </div>
            : null
        );
    }
}
