import * as React from 'react';

import { AlertModal } from './AlertModal';
import { ContentCard } from './ContentCard';
import { AddContentModal } from './AddContentModal';
import { Icon } from './Icon';

/*
 * Models
 */
import { DropdownItem } from "../models/DropdownItem";
import { ContentItem } from "../models/ContentItem";

export class ContentEditor extends React.Component<any, {}> {

    refs;
    over;

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

        delete this.props.content[ contentHandle ];
        this.props.onContentChange( this.props.content );
    }

    dragEnd ( contentItemMoved, event ) {

        if ( contentItemMoved._rank !== this.over._rank ) {
            let originalRank = contentItemMoved._rank;
            contentItemMoved._rank = this.over._rank;
            for ( var key in this.props.content ) {
                let contentItem = this.props.content[ key ];
                if ( contentItem !== contentItemMoved ) {
                    if ( this.over._rank < originalRank && contentItem._rank >= contentItemMoved._rank ) {
                        contentItem._rank++;
                    }
                    else if ( this.over._rank > originalRank && contentItem._rank <= contentItemMoved._rank ) {
                        contentItem._rank--;
                    }
                }
            }
            this.props.onContentChange( this.props.content );
        }
        this.forceUpdate();
    }

    dragOver ( contentItem, event ) {

        event.preventDefault();
        this.over = contentItem;
    }

    render () {

        let allContent = this.props.content;
        let contentItems = [];

        for ( var key in allContent ) {
            let contentItem = allContent[ key ];
            contentItems.push (
                <ContentCard
                    key={ contentItem._rank }
                    contentItem={ contentItem }
                    contentHandle={ key }
                    removeContent={ this.confirmRemoveContent.bind( this ) }
                    handleChange={ this.handleChange.bind( this ) }
                    dragOver={ this.dragOver.bind( this ) }
                    dragEnd={ this.dragEnd.bind( this ) } />
            )
        }
        contentItems.sort( ( contentItemA: any, contentItemB: any ) => contentItemA.key - contentItemB.key );

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
