import * as React from 'react';

/*
 * Components
 */
import { ContentEditor } from './ContentEditor';
import { ThemeEditor } from './ThemeEditor';

/*
 * Models
 */
import { MenuItem } from "../models/MenuItem"

export class PrimaryContentContainer extends React.Component<any, {}> {

    constructor( props ) {
        super( props );
    }

    handleThemeContentChange () {
        this.props.onThemeContentChange( this.props.themeContent );
    }

    handleThemeThemeChange () {
        this.props.onThemeThemeChange( this.props.themeTheme );
    }

    render() {

        let activeMenuItem: MenuItem = this.props.menuItems.filter( ( menuItem: MenuItem ) => menuItem.active )[0];

        return (
            <div className="primaryContentContainer">
                <h2>{ activeMenuItem.title }</h2>
                { activeMenuItem.handle === 'contentEditor' ? <ContentEditor themeContent={ this.props.themeContent } onThemeContentChange={ this.handleThemeContentChange.bind( this ) } /> : null }
                { activeMenuItem.handle === 'themeEditor' ? <ThemeEditor themeTheme={ this.props.themeTheme } onThemeThemeChange={ this.handleThemeThemeChange.bind( this ) } /> : null }
            </div>
        );
    }
}
