import * as React from 'react';

import { Text } from './contenttypes/Text';
import { TextArea } from './contenttypes/TextArea';
import { Number } from './contenttypes/Number';
import { Checkbox } from './contenttypes/Checkbox';

const contentTypes = [
    { name: 'Text', handle: 'text' },
    { name: 'Text Area', handle: 'textarea' },
    { name: 'Number', handle: 'number' },
    { name: 'Checkbox', handle: 'checkbox' },
    { name: 'Colour', handle: 'colour' }
 ];

export class ContentEditor extends React.Component<any, {}> {

    state: any = { addContentHandle: '', addContentType: contentTypes[0].handle, addContentName: "" };

    constructor( props : any ) {
        super( props );
    }

    componentWillMount () {

        this.setState( this.state );
    }

    handleChange () {

        this.props.onContentChange( this.props.content );
    }

    removeContent ( event ) {

        delete this.props.content[ event.target.id ];
        this.props.onContentChange( this.props.content );
    }

    handleAddContentNameChange ( event ) {

        this.setState( { addContentName: event.target.value } );
    }

    handleAddContentTypeChange ( event ) {

        this.setState( { addContentType: event.target.value } );
    }

    handleAddContentHandleChange ( event ) {

        this.setState( { addContentHandle: event.target.value } );
    }

    addContent ( event ) {

        let newContent = {
            _type: this.state.addContentType,
            _name: this.state.addContentName,
            _content: ""
        };
        this.props.content[ this.state.addContentHandle ] = newContent;
        this.setState( { addContentHandle: '', addContentType: contentTypes[0].handle, addContentName: "" } );
        this.props.onContentChange( this.props.content );
    }

    render () {

        let allContent = this.props.content;
        let contentItems = [];

        for ( var key in allContent ) {

            let content;

            switch( allContent[key]._type ) {
                case 'text':
                    content = <Text content={ allContent[key] } onContentChange={ this.handleChange.bind( this ) } />;
                    break;
                case 'textarea':
                    content = <TextArea content={ allContent[key] } onContentChange={ this.handleChange.bind( this ) } />;
                    break;
                case 'number':
                    content = <Number content={ allContent[key] } onContentChange={ this.handleChange.bind( this ) } />;
                    break;
                case 'checkbox':
                    content = <Checkbox content={ allContent[key] } onContentChange={ this.handleChange.bind( this ) } />;
                    break;
                case 'colour':
                    content = <Text content={ allContent[key] } onContentChange={ this.handleChange.bind( this ) } />;
                    break;
                default:
                    content = <Text content={ allContent[key] } onContentChange={ this.handleChange.bind( this ) } />;
            }

            contentItems.push (
                <div className="contentCard" key={ key }>
                    <div className="contentCard-container">
                        <h4 className="contentCard-label">{ allContent[key]._name } ( { key } )</h4>
                        <div className="contentCard-content">
                            { content }
                        </div>
                        <h4 className="contentCard-remove" id={ key } onClick={ this.removeContent.bind( this ) }>Remove</h4>
                    </div>
                </div>
            )
        }

        let contentTypeOptions = [];

        for ( var key in contentTypes ) {
            contentTypeOptions.push(
                <option value={ contentTypes[ key ].handle } key={ key }>{ contentTypes[ key ].name }</option>
            )
        }

        return (
            <div className="contentEditor">
                { contentItems }
                <div className="contentCard">
                    <h4>Name</h4>
                    <input type="text" value={ this.state.addContentName } onChange={ this.handleAddContentNameChange.bind( this ) } />

                    <h4>Handle</h4>
                    <input type="text" value={ this.state.addContentHandle } onChange={ this.handleAddContentHandleChange.bind( this ) } />

                    <h4>Type</h4>
                    <select value={ this.state.addContentType } onChange={ this.handleAddContentTypeChange.bind( this ) }>
                        { contentTypeOptions }
                    </select>
                    <button onClick={ this.addContent.bind( this ) }>Add</button>
                </div>
            </div>
        );
    }
}
