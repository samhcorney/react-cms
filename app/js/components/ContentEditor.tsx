import * as React from 'react';

export class ContentEditor extends React.Component<any, {}> {

    constructor( props : any ) {
        super( props );
        this.handleChange = this.handleChange.bind( this );
    }

    handleChange ( event ) {

        this.props.templateContent[event.target.name] = event.target.value;
        this.props.onTemplateContentChange( this.props.templateContent );
        this.setState( this.props.templateContent );
    }

    render () {

        let templateContent = this.props.templateContent;
        let contentItems = [];
        for ( var key in templateContent ) {
            contentItems.push( <input key={ key } name={ key } type="text" value={ templateContent[key] } onChange={ this.handleChange } /> )
        }
        return (
            <p>{ contentItems }</p>
        );
    }
}
