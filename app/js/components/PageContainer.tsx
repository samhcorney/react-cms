import * as React from 'react';

/*
 * Components
 */
import { SideMenu } from './SideMenu';
import { PrimaryContentContainer } from './PrimaryContentContainer';

/*
 * Models
 */
import { MenuItem } from "../models/MenuItem"

export class PageContainer extends React.Component<any, {}> {

    menuItems: MenuItem[] = [
        { title: 'Site Editor', handle: 'siteEditor' },
        { title: 'Content Editor', handle: 'contentEditor' }
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

    render() {
        return (
            <div className="pageContainer">
                <SideMenu menuItems={ this.menuItems } onMenuItemClick={ this.handleMenuItemClick } />
                <PrimaryContentContainer menuItem={ this.activeMenuItem } />
            </div>
        );
    }
}
