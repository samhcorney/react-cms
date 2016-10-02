import * as React from 'react';

import { Form } from './Form';
import { Alert } from './Alert';
import { ContentCard } from './ContentCard';

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

    removeContent ( contentKey ) {

        this.refs.alert.open({
            title: "Remove content?",
            okText: "remove",
            callbackData: contentKey
        });
    }

    addContent ( event ) {

        let newContent = {
            _type: this.props.addContentForm.addContentType._content,
            _name: this.props.addContentForm.addContentName._content,
            _content: ""
        };
        this.props.content[ this.props.addContentForm.addContentHandle._content ] = newContent;
        this.props.onContentChange( this.props.content );
    }


    confirm ( contentKey ) {

        delete this.props.content[ contentKey ];
        this.props.onContentChange( this.props.content );
    }

    render () {

        let allContent = this.props.content;
        let contentItems = [];

        for ( var key in allContent ) {
            contentItems.push (
                <ContentCard key={ key } contentItem={ allContent[key] } contentHandle={ key } removeContent={ this.removeContent.bind( this ) } handleChange={ this.handleChange.bind( this ) } />
            )
        }

        return (
            <div className="contentEditor">
                <div className="contentCard">
                    <Form className="contentCard-header" formItems={ this.props.addContentForm } onSubmitSuccess={ this.addContent.bind( this ) }/>
                </div>
                { contentItems }
                <Alert ref="alert" onConfirm={ this.confirm.bind( this ) } />
            </div>
        );
    }
}
