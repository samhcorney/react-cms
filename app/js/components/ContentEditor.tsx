import * as React from 'react';

export class ContentEditor extends React.Component<any, {}> {

    constructor( props : any ) {
        super( props );
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
            contentItems.push(
                <div>
                    <label for={ key }>{ key }</label>
                    <input key={ key } name={ key } id={ key } type="text" value={ themeContent[key] } onChange={ this.handleChange.bind( this ) } />
                </div>
            )
        }
        return (
            <p>{ contentItems }</p>
        );
    }
}
