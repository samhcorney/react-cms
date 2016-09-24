import * as React from 'react';

export class ThemeEditor extends React.Component<any, {}> {

    constructor( props : any ) {
        super( props );
        this.handleChange = this.handleChange.bind( this );
    }

    handleChange ( event ) {

        this.props.themeTheme[event.target.name] = event.target.value;
        this.props.onThemeThemeChange( this.props.themeTheme );
        this.setState( this.props.themeTheme );
    }

    render () {

        let themeTheme = this.props.themeTheme;
        let themeItems = [];
        for ( var key in themeTheme ) {
            themeItems.push( <input key={ key } name={ key } type="text" value={ themeTheme[key] } onChange={ this.handleChange } /> )
        }
        return (
            <p>{ themeItems }</p>
        );
    }
}
