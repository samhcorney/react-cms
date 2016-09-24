import * as React from 'react';

/*
 * Components
 */
import { ContentEditor } from './ContentEditor';
import { ThemeEditor } from './ThemeEditor';

export class PrimaryContentContainer extends React.Component<any, {}> {

    constructor( props ) {
        super( props );
        this.handleThemeContentChange = this.handleThemeContentChange.bind( this );
        this.handleThemeThemeChange = this.handleThemeThemeChange.bind( this );
    }

    handleThemeContentChange () {
        this.props.onThemeContentChange( this.props.themeContent );
    }

    handleThemeThemeChange () {
        this.props.onThemeThemeChange( this.props.themeTheme );
    }

    render() {
        return (
            <div className="primaryContentContainer">
                <h2>{ this.props.menuItem.title }</h2>
                { this.props.menuItem.handle === 'contentEditor' ? <ContentEditor themeContent={ this.props.themeContent } onThemeContentChange={ this.handleThemeContentChange } /> : null }
                { this.props.menuItem.handle === 'themeEditor' ? <ThemeEditor themeTheme={ this.props.themeTheme } onThemeThemeChange={ this.handleThemeThemeChange } /> : null }
            </div>
        );
    }
}
