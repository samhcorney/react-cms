import * as React from 'react';

import { AlertModal } from './AlertModal';
import { ContentCard } from './ContentCard';
import { AddContentModal } from './AddContentModal';
import { Icon } from './Icon';

export class ContentEditor extends React.Component<any, {}> {

    refs;
    over;
    contentItemSorting;

    addContentFormDataDefaults = {
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

    constructor( props : any ) {
        super( props );
    }

    handleChange () {

        this.props.onContentChange( this.props.content );
    }

    confirmRemoveContent ( contentIndex ) {

        this.refs.alertModal.open({
            title: "Remove content?",
            confirmText: "remove",
            callbackData: contentIndex
        });
    }

    openAddContentModal () {

        this.refs.addContentModal.open();
    }

    addNewContent ( addContentFormData ) {

        for ( var key in this.props.content ) {
            this.props.content[ key ]._rank++;
        }

        let newContent = {
            _type: addContentFormData.addContentType._content,
            _name: addContentFormData.addContentName._content,
            _rank: 0,
            _content: ""
        };
        this.props.content[ addContentFormData.addContentHandle._content ] = newContent;
        this.props.onContentChange( this.props.content );
    }

    removeContent ( contentHandle ) {

        let contentItemToRemove = this.props.content[ contentHandle ];
        delete this.props.content[ contentHandle ];
        for ( var key in this.props.content ) {
            let contentItem = this.props.content[ key ];
            if ( contentItem._rank > contentItemToRemove._rank  ) {
                contentItem._rank--;
            }
        }
        this.props.onContentChange( this.props.content );
    }

    dragStart ( contentItem ) {

        this.contentItemSorting = contentItem;
    }

    dragOver ( contentItem, event ) {

        if ( this.contentItemSorting ) {
            event.preventDefault();
            this.over = contentItem;

            if ( this.contentItemSorting._rank !== this.over._rank ) {
                let originalRank = this.contentItemSorting._rank;
                this.contentItemSorting._rank = this.over._rank;
                for ( var key in this.props.content ) {
                    let contentItem = this.props.content[ key ];
                    if ( contentItem !== this.contentItemSorting ) {
                        if ( this.over._rank < originalRank && contentItem._rank >= this.contentItemSorting._rank ) {
                            contentItem._rank++;
                        }
                        else if ( this.over._rank > originalRank && contentItem._rank <= this.contentItemSorting._rank ) {
                            contentItem._rank--;
                        }
                    }
                }
                this.props.onContentChange( this.props.content );
            }
            this.forceUpdate();
        }
    }

    dragEnd ( contentItemSorting, event ) {
        this.contentItemSorting = null;
        this.forceUpdate();
    }

    render () {

        let addContentFormData;

        addContentFormData = JSON.parse( JSON.stringify( this.addContentFormDataDefaults ) );
        if ( this.props.restrictContentTypes.length ) {
            addContentFormData.addContentType._items = [];
            for ( var i = 0; i < this.addContentFormDataDefaults.addContentType._items.length; i++ ) {
                if ( this.props.restrictContentTypes.indexOf( this.addContentFormDataDefaults.addContentType._items[ i ]._handle ) > -1 ) {
                    addContentFormData.addContentType._items.push( this.addContentFormDataDefaults.addContentType._items[ i ] );
                }
            }
        }

        let allContent = this.props.content;
        let contentItems = [];

        for ( var key in allContent ) {
            let contentItem = allContent[ key ];
            let style = '';
            if ( contentItem === this.contentItemSorting ) {
                style = 'placeholder';
            }
            contentItems.push (
                <ContentCard
                    key={ key }
                    customStyles={ style }
                    rank={ contentItem._rank }
                    contentItem={ contentItem }
                    contentHandle={ key }
                    removeContent={ this.confirmRemoveContent.bind( this ) }
                    handleChange={ this.handleChange.bind( this ) }
                    dragStart={ this.dragStart.bind( this ) }
                    dragOver={ this.dragOver.bind( this ) }
                    dragEnd={ this.dragEnd.bind( this ) } />
            )
        }
        contentItems.sort( ( contentItemA: any, contentItemB: any ) => contentItemA.props.rank - contentItemB.props.rank );

        return (
            <div className="contentEditor">
                <div className="btn addContentButton" onClick={ this.openAddContentModal.bind( this ) }>
                    <Icon name="plus" />
                </div>
                <ol>
                    { contentItems }
                </ol>
                <AddContentModal ref="addContentModal" content={ this.props.content } addContentFormData={ addContentFormData } onConfirm={ this.addNewContent.bind( this ) } />
                <AlertModal ref="alertModal" onConfirm={ this.removeContent.bind( this ) } />
            </div>
        );
    }
}
