import * as React from 'react';

import { AlertModal } from './AlertModal';
import { ContentCard } from './ContentCard';
import { AddContentModal } from './AddContentModal';
import { Icon } from './Icon';

/*
 * Models
 */
import { DropdownItem } from "../models/DropdownItem"

export class ContentEditor extends React.Component<any, {}> {

    refs;

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

    removeContent ( contentIndex ) {

        this.props.content.splice( contentIndex, 1 );
        this.props.onContentChange( this.props.content );
    }

    render () {

        let allContent = this.props.content;
        let contentItems = [];

        for ( var i = 0; i < allContent.length; i++ ) {
            let contentItem = allContent[i];
            contentItems.push (
                <ContentCard key={ i } contentItem={ contentItem } contentIndex={ i } removeContent={ this.confirmRemoveContent.bind( this ) } handleChange={ this.handleChange.bind( this ) } />
            )
        }

        return (
            <div className="contentEditor">
                <div className="btn addContentButton" onClick={ this.openAddContentModal.bind( this ) }>
                    <Icon className="btn" name="plus" />
                </div>
                { contentItems }
                <AddContentModal ref="addContentModal" content={ this.props.content } addContentForm={ this.props.addContentForm } onConfirm={ this.handleChange.bind( this ) } />
                <AlertModal ref="alertModal" onConfirm={ this.removeContent.bind( this ) } />
            </div>
        );
    }
}
