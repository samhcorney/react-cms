import * as React from 'react';

import { Modal } from './Modal';
import { Form } from './Form';

import { Icon } from './Icon';

export class AddContentModal extends Modal {

    refs;
    addContentFormDefaults = {
        addContentName : {
            _type: 'text',
            _name: 'Name',
            _content: '',
            _placeholder: 'Content Name',
            _error: false
        },
        addContentHandle : {
            _type: 'text',
            _name: 'Handle',
            _content: '',
            _placeholder: 'Content Handle',
            _error: false
        },
        addContentType : {
            _type: 'dropdown',
            _name: 'Type',
            _content: '',
            _isOpen: false,
            _defaultText: 'Select content type',
            _items: [
                {
                    _type: 'dropdownItem',
                    _handle: 'text',
                    _content: 'Text'
                },
                {
                    _type: 'dropdownItem',
                    _handle: 'textarea',
                    _content: 'Text Area'
                },
                {
                    _type: 'dropdownItem',
                    _handle: 'number',
                    _content: 'Number'
                },
                {
                    _type: 'dropdownItem',
                    _handle: 'checkbox',
                    _content: 'Checkbox'
                },
                {
                    _type: 'dropdownItem',
                    _handle: 'colour',
                    _content: 'Colour'
                }
            ],
            _error: false
        }
    };
    addContentForm;

    customOptions = {
        title: 'Add new content',
        confirmText: 'add'
    };

    constructor( props : any ) {
        super( props );
        this.setOptions( this.customOptions );
        this.componentWillReceiveProps( this.props );
    }

    componentWillReceiveProps ( nextProps ) {

        this.addContentForm = JSON.parse( JSON.stringify( this.addContentFormDefaults ) );
        if ( nextProps.restrictContentTypes.length ) {
            this.addContentForm.addContentType._items = [];
            for ( var i = 0; i < this.addContentFormDefaults.addContentType._items.length; i++ ) {
                if ( nextProps.restrictContentTypes.indexOf( this.addContentFormDefaults.addContentType._items[ i ]._handle ) > -1 ) {
                    this.addContentForm.addContentType._items.push( this.addContentFormDefaults.addContentType._items[ i ] );
                }
            }
        }
    }

    handleConfirmClick () {

        this.refs.addContentForm.submitForm();
    }

    addContent () {

        let newContent = {
            _type: this.addContentForm.addContentType._content,
            _name: this.addContentForm.addContentName._content,
            _content: ""
        };
        this.props.content[ this.addContentForm.addContentHandle._content ] = newContent;
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
                        <Form ref="addContentForm" formItems={ this.addContentForm } content={ this.props.content } onSubmitSuccess={ this.addContent.bind( this ) } />
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
