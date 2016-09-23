import 'svgxuse';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

/*
 * Components
 */
import { SideMenu } from './components/SideMenu';
import { PrimaryContentContainer } from './components/PrimaryContentContainer';

/*
 * Models
 */
import { MenuItem } from "./models/MenuItem"

export class MyApp extends React.Component<any, {}> {

    menuItems: MenuItem[] = [
        { title: 'Site Editor', handle: 'siteEditor' },
        { title: 'Content Editor', handle: 'contentEditor' },
        { title: 'Palette', handle: 'palette' }
    ];
    activeMenuItem: MenuItem = this.menuItems[0];

    constructor( props : any ) {
        super( props );
        this.handleMenuItemClick = this.handleMenuItemClick.bind( this );
    }

    handleMenuItemClick ( menuItem: MenuItem ) {
        this.activeMenuItem = menuItem;
        this.setState( this.activeMenuItem );
    }

    render () {
        return (
            <div className="pageContainer">
                <SideMenu menuItems={ this.menuItems } onMenuItemClick={ this.handleMenuItemClick } />
                <PrimaryContentContainer menuItem={ this.activeMenuItem } />
            </div>
        );
    }
}




/*
 * Render the application to the DOM using react
 */
ReactDOM.render(
    <MyApp />,
    document.getElementById( 'content' )
);
