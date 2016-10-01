import * as React from 'react';

import { ContentTypeRenderer } from './contenttypes/ContentTypeRenderer';
import { Form } from './Form';
import { Icon } from './Icon';
import { Alert } from './Alert';

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

            let contentItem = allContent[key];

            contentItems.push (
                <div className="contentCard" key={ key }>
                    <div className="contentCard-header">
                        <h4 className="contentCard-label">{ contentItem._name } ( { key } )</h4>
                        <Icon onClick={ this.removeContent.bind( this, key ) } name="cross" className="btn"/>
                    </div>
                    <div className="contentCard-body">
                        <ContentTypeRenderer content={ contentItem } onContentChange={ this.handleChange.bind( this ) } />
                    </div>
                </div>
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
