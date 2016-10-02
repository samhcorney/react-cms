import * as React from 'react';

import { Modal } from './Modal';
import { Form } from './Form';

export class AddContentModal extends Modal {

    refs;
    customOptions = {
        title: 'Add new content',
        confirmText: 'add'
    };
    modalContent = <Form ref="addContentForm" formItems={ this.props.addContentForm } onSubmitSuccess={ this.addContent.bind( this ) } />;

    constructor( props : any ) {
        super( props );
        this.setOptions( this.customOptions );
    }

    handleConfirmClick () {

        this.refs.addContentForm.submitForm();
    }

    addContent () {

        let newContent = {
            _handle: this.props.addContentForm.addContentHandle._content,
            _type: this.props.addContentForm.addContentType._content,
            _name: this.props.addContentForm.addContentName._content,
            _content: ""
        };
        this.props.content.unshift( newContent );
        this.refs.addContentForm.reset();
        super.handleConfirmClick();
    }

    close () {

        this.refs.addContentForm.reset();
        super.close();
    }
}
