import * as React from 'react';

import { Icon } from './Icon';

/*
 * Models
 */
import { MenuItem } from "../models/MenuItem"

export class Menu extends React.Component<any, {}> {

    constructor( props : any ) {
        super( props );
    }

    handleClick ( menuItemClicked: MenuItem ) {

        this.props.menuItems.forEach( ( menuItem: MenuItem ) => menuItem.active = false );
        this.props.menuItems.filter( ( menuItem: MenuItem ) => menuItem.handle === menuItemClicked.handle )[0].active = true;
        this.props.onMenuItemClick( this.props.menuItems );
    }

    saveTheme () {

        this.props.onSaveTheme();
    }

    render() {

        var menuItems = this.props.menuItems.map( ( menuItem: MenuItem ) => {
            return (
                <Icon key={ menuItem.handle } onClick={ this.handleClick.bind( this, menuItem ) } name={ menuItem.icon } className={ 'btn menu-btn' + ( menuItem.active ? ' active' : '' ) }/>
            );
        });

        return (
            <div className="menu">
                { menuItems }
                <Icon onClick={ this.saveTheme.bind( this ) } name="checkmark" className="saveThemeBtn"/>
            </div>
        );
    }
}
