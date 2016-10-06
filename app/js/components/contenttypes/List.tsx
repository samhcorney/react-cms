import * as React from 'react';

import { AbstractContentType } from './AbstractContentType';
import { AlertModal } from '../AlertModal';
import { ContentCard } from '../ContentCard';
import { AddContentModal } from '../AddContentModal';
import { Icon } from '../Icon';

export class List extends AbstractContentType {

    refs;

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

        this.state.isOpen = false;
        this.setState( this.state );
        this.props.onContentChange( event );
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

    dragStart(){}
    dragOver(){}
    dragEnd(){}

    render() {

        var listItems = this.props.content._content.map( ( listItem: any, index: number ) => {
            return (
                <ContentCard
                    key={ index }
                    contentItem={ listItem }
                    contentHandle={ index }
                    removeContent={ this.confirmRemoveContent.bind( this ) }
                    handleChange={ this.handleChange.bind( this ) }
                    dragStart={ this.dragStart.bind( this ) }
                    dragOver={ this.dragOver.bind( this ) }
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
                <AddContentModal ref="addContentModal" content={ this.props.content } restrictContentTypes={ [] } onConfirm={ this.handleChange.bind( this ) } />
                <AlertModal ref="alertModal" onConfirm={ this.removeContent.bind( this ) } />
            </div>
        );
    }
}
