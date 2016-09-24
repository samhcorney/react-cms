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

    saveTheme () {

        this.props.onSaveTheme();
    }

    render() {

        var menuItems = this.props.menuItems.map( ( menuItem: MenuItem ) => {
            return (
                <li key={ menuItem.handle } className={ menuItem.active ? 'active' : '' } onClick={ this.handleClick.bind( this, menuItem ) }>{ menuItem.title }</li>
            );
        });

        return (
            <div className="sideMenu">
                <button className="btn saveThemeBtn" onClick={ this.saveTheme.bind( this ) }>Save</button>
                <nav className ="sideMenu-nav">
                    <ol>
                        { menuItems }
                    </ol>
                </nav>
            </div>
        );
    }
}
