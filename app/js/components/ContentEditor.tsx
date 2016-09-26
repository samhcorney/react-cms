import * as React from 'react';

import { Text } from './contenttypes/Text';
import { TextArea } from './contenttypes/TextArea';
import { Number } from './contenttypes/Number';
import { Checkbox } from './contenttypes/Checkbox';

export class ContentEditor extends React.Component<any, {}> {

    constructor( props : any ) {
        super( props );
    }

    handleChange () {

        this.props.onContentChange( this.props.content );
    }

    render () {

        let allContent = this.props.content;
        let contentItems = [];

        for ( var key in allContent ) {

            let content;

            switch( allContent[key]._type ) {
                case 'text':
                    content = <Text content={ allContent[key] } id={ key } onContentChange={ this.handleChange.bind( this ) } />;
                    break;
                case 'textarea':
                    content = <TextArea content={ allContent[key] } id={ key } onContentChange={ this.handleChange.bind( this ) } />;
                    break;
                case 'number':
                    content = <Number content={ allContent[key] } id={ key } onContentChange={ this.handleChange.bind( this ) } />;
                    break;
                case 'checkbox':
                    content = <Checkbox content={ allContent[key] } id={ key } onContentChange={ this.handleChange.bind( this ) } />;
                    break;
                case 'colour':
                    content = <Text content={ allContent[key] } id={ key } onContentChange={ this.handleChange.bind( this ) } />;
                    break;
                default:
                    content = <Text content={ allContent[key] } id={ key } onContentChange={ this.handleChange.bind( this ) } />;
            }

            contentItems.push (
                <div className="contentCard" key={ key }>
                    <div className="contentCard-container">
                        <h4 className="contentCard-label">{ allContent[key]._name }</h4>
                        <div className="contentCard-content">
                            { content }
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className="contentEditor">{ contentItems }</div>
        );
    }
}
