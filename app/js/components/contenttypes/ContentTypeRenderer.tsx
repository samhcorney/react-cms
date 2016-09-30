import * as React from 'react';

import { Text } from './Text';
import { TextArea } from './TextArea';
import { Number } from './Number';
import { Checkbox } from './Checkbox';
import { Dropdown } from './Dropdown';

export class ContentTypeRenderer extends React.Component<any, {}> {

    constructor( props : any ) {
        super( props );
    }

    handleChange ( event ) {

        this.props.onContentChange( event );
    }

    render () {

        let content;

        switch( this.props.content._type ) {
            case 'text':
                content = <Text content={ this.props.content } onContentChange={ this.handleChange.bind( this ) } />;
                break;
            case 'textarea':
                content = <TextArea content={ this.props.content } onContentChange={ this.handleChange.bind( this ) } />;
                break;
            case 'number':
                content = <Number content={ this.props.content } onContentChange={ this.handleChange.bind( this ) } />;
                break;
            case 'checkbox':
                content = <Checkbox content={ this.props.content } onContentChange={ this.handleChange.bind( this ) } />;
                break;
            case 'colour':
                content = <Text content={ this.props.content } onContentChange={ this.handleChange.bind( this ) } />;
                break;
            case 'dropdown':
                content = <Dropdown content={ this.props.content } onContentChange={ this.handleChange.bind( this ) } />;
                break;
            default:
                content = <Text content={ this.props.content } onContentChange={ this.handleChange.bind( this ) } />;
        }

        return (
            content
        );
    }
}
