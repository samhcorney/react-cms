import * as React from 'react';

import { ContentTypeRenderer } from './contenttypes/ContentTypeRenderer';
import { Form } from './Form';

/*
 * Models
 */
import { DropdownItem } from "../models/DropdownItem"

export class ContentEditor extends React.Component<any, {}> {

    constructor( props : any ) {
        super( props );
    }

    handleChange () {

        this.props.onContentChange( this.props.content );
    }

    removeContent ( event ) {

        delete this.props.content[ event.target.id ];
        this.props.onContentChange( this.props.content );
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

    render () {

        let allContent = this.props.content;
        let contentItems = [];

        for ( var key in allContent ) {

            let contentItem = allContent[key];

            contentItems.push (
                <div className="contentCard" key={ key }>
                    <div className="contentCard-container">
                        <h4 className="contentCard-label">{ contentItem._name } ( { key } )</h4>
                        <div className="contentCard-content">
                            <ContentTypeRenderer content={ contentItem } onContentChange={ this.handleChange.bind( this ) } />
                        </div>
                        <h4 className="contentCard-remove" id={ key } onClick={ this.removeContent.bind( this ) }>Remove</h4>
                    </div>
                </div>
            )
        }

        return (
            <div className="contentEditor">
                { contentItems }
                <div className="contentCard">
                    <Form formItems={ this.props.addContentForm } onSubmitSuccess={ this.addContent.bind( this ) }/>
                </div>
            </div>
        );
    }
}
