import * as React from 'react';

import { Text } from './contenttypes/Text';
import { TextArea } from './contenttypes/TextArea';
import { Checkbox } from './contenttypes/Checkbox';

export class ContentEditor extends React.Component<any, {}> {

    constructor( props : any ) {
        super( props );
    }

    handleChange ( event ) {

        this.props.onThemeContentChange( this.props.themeContent );
        this.setState( this.props.themeContent );
    }

    render () {

        let themeContent = this.props.themeContent;
        let contentItems = [];
        for ( var key in themeContent ) {

            let content;

            switch( themeContent[key]._type ) {

                case 'text':
                    content = <Text content={ themeContent[key] } id={ key } onThemeContentChange={ this.handleChange.bind( this ) } />;
                    break;
                case 'textarea':
                    content = <TextArea content={ themeContent[key] } id={ key } onThemeContentChange={ this.handleChange.bind( this ) } />;
                    break;
                case 'checkbox':
                    content = <Checkbox content={ themeContent[key] } id={ key } onThemeContentChange={ this.handleChange.bind( this ) } />;
                    break;
                default:
                    content = <Text content={ themeContent[key] } id={ key } onThemeContentChange={ this.handleChange.bind( this ) } />;
            }

            contentItems.push (
                <div key={ key }>
                    { content }
                </div>
            )
        }
        return (
            <div>{ contentItems }</div>
        );
    }
}
