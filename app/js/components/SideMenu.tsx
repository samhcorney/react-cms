import * as React from 'react';

/*
 * Models
 */
import { MenuItem } from "../models/MenuItem"

export class SideMenu extends React.Component<any, {}> {

    constructor( props : any ) {
        super( props );
    }

    handleClick ( menuItem: MenuItem ) {

        this.props.onMenuItemClick( menuItem );
    }

    render() {

        var menuItems = this.props.menuItems.map( ( menuItem: MenuItem ) => {
            return (
                <li key={ menuItem.handle } onClick={ this.handleClick.bind( this, menuItem ) }>{ menuItem.title }</li>
            );
        });

        return (
            <nav className ="sideMenu">
                <ol>
                    { menuItems }
                </ol>
            </nav>
        );
    }
}
