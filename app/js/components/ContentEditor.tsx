import * as React from 'react';

import { AlertModal } from './AlertModal';
import { ContentCard } from './ContentCard';
import { AddContentModal } from './AddContentModal';
import { Icon } from './Icon';

export class ContentEditor extends React.Component<any, {}> {

    refs;
    over;
    contentItemSorting;

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

    dragStart ( contentItem, event ) {

        this.contentItemSorting = contentItem;
    }

    dragOver ( contentItem, event ) {

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

    dragEnd ( contentItemSorting, event ) {
        this.contentItemSorting = null;
        this.forceUpdate();
    }

    render () {

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
                <AddContentModal ref="addContentModal" content={ this.props.content } restrictContentTypes={ this.props.restrictContentTypes } onConfirm={ this.handleChange.bind( this ) } />
                <AlertModal ref="alertModal" onConfirm={ this.removeContent.bind( this ) } />
            </div>
        );
    }
}
