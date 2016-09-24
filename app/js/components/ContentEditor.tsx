import * as React from 'react';

export class ContentEditor extends React.Component<any, {}> {

    constructor( props : any ) {
        super( props );
        this.handleChange = this.handleChange.bind( this );
    }

    handleChange ( event ) {

        this.props.themeContent[event.target.name] = event.target.value;
        this.props.onThemeContentChange( this.props.themeContent );
        this.setState( this.props.themeContent );
    }

    render () {

        let themeContent = this.props.themeContent;
        let contentItems = [];
        for ( var key in themeContent ) {
            contentItems.push( <input key={ key } name={ key } type="text" value={ themeContent[key] } onChange={ this.handleChange } /> )
        }
        return (
            <p>{ contentItems }</p>
        );
    }
}
