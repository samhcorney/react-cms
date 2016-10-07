import * as React from 'react';

import { AbstractContentType } from './AbstractContentType';
import { AlertModal } from '../AlertModal';
import { ContentCard } from '../ContentCard';
import { AddContentModal } from '../AddContentModal';
import { Icon } from '../Icon';

export class List extends AbstractContentType {

    refs;
    listItemSorting;
    listItemSortingIndex;
    addContentFormDataDefaults = {
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

    state = {
        isOpen: false
    }

    constructor( props : any ) {
        super( props );
    }

    handleOpenCloseClick () {
        this.state.isOpen = !this.state.isOpen;
        this.setState( this.state );
    }

    handleChange () {

        this.props.onContentChange();
    }

    confirmRemoveContent ( contentIndex ) {

        this.refs.alertModal.open({
            title: "Remove content?",
            confirmText: "remove",
            callbackData: contentIndex
        });
    }

    removeContent ( contentIndex ) {

        this.props.content._content.splice( contentIndex, 1 );
        this.props.onContentChange( this.props.content );
    }

    openAddContentModal () {

        this.refs.addContentModal.open();
    }

    addNewContent ( addContentFormData ) {

        let newContent = {
            _type: addContentFormData.addContentType._content,
            _content: ""
        };
        this.props.content._content.push( newContent );
        this.props.onContentChange();
    }

    dragStart ( index, listItemSorting ) {

        this.listItemSortingIndex = index;
        this.listItemSorting = listItemSorting;
    }

    dragOver ( index, listItemOver ) {

        if ( this.listItemSorting ) {
            event.preventDefault();

            if ( this.listItemSortingIndex !== index ) {
                this.props.content._content.splice( this.listItemSortingIndex, 1 );
                this.props.content._content.splice( index, 0, this.listItemSorting );
                this.listItemSortingIndex = index;
                this.props.onContentChange( this.props.content );
                this.forceUpdate();
            }
        }
    }

    dragEnd ( contentItemSorting, event ) {

        this.listItemSorting = null;
        this.forceUpdate();
    }
    render() {

        var listItems = this.props.content._content.map( ( listItem: any, index: number ) => {
            let style;
            if ( listItem === this.listItemSorting ) {
                style = 'placeholder';
            }
            return (
                <ContentCard
                    key={ index }
                    contentItem={ listItem }
                    customStyles={ style }
                    contentHandle={ index }
                    removeContent={ this.confirmRemoveContent.bind( this ) }
                    handleChange={ this.handleChange.bind( this ) }
                    dragStart={ this.dragStart.bind( this, index ) }
                    dragOver={ this.dragOver.bind( this, index ) }
                    dragEnd={ this.dragEnd.bind( this ) } />
            );
        });

        return (
            <div className="contentEditor">
                <div className="btn addContentButton" onClick={ this.openAddContentModal.bind( this ) }>
                    <Icon name="plus" />
                </div>
                <ol>
                    { listItems }
                </ol>
                <AddContentModal ref="addContentModal" content={ this.props.content } addContentFormData={ this.addContentFormDataDefaults } onConfirm={ this.addNewContent.bind( this ) } />
                <AlertModal ref="alertModal" onConfirm={ this.removeContent.bind( this ) } />
            </div>
        );
    }
}
