import * as React from 'react';

export class ThemeEditor extends React.Component<any, {}> {

    constructor( props : any ) {
        super( props );
        this.handleChange = this.handleChange.bind( this );
    }

    handleChange ( event ) {

        this.props.templateTheme[event.target.name] = event.target.value;
        this.props.onTemplateThemeChange( this.props.templateTheme );
        this.setState( this.props.templateTheme );
    }

    render () {

        let templateTheme = this.props.templateTheme;
        let themeItems = [];
        for ( var key in templateTheme ) {
            themeItems.push( <input key={ key } name={ key } type="text" value={ templateTheme[key] } onChange={ this.handleChange } /> )
        }
        return (
            <p>{ themeItems }</p>
        );
    }
}
