import * as React from 'react';

export class ContentEditor extends React.Component<any, {}> {

    constructor( props : any ) {
        super( props );
        this.handleChange = this.handleChange.bind( this );
    }

    handleChange ( event ) {

        this.props.templateData[event.target.name] = event.target.value;
        this.props.onTemplateDataChange( this.props.templateData );
        this.setState( this.props.templateData );
    }

    render () {

        let templateData = this.props.templateData;
        let dataItems = [];
        for ( var key in templateData ) {
            dataItems.push( <input key={ key } name={ key } type="text" value={ templateData[key] } onChange={ this.handleChange } /> )
        }
        return (
            <p>{ dataItems }</p>
        );
    }
}
