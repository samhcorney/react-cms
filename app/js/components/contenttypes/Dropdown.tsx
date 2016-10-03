import * as React from 'react';

import { AbstractContentType } from './AbstractContentType';
import { Icon } from '../Icon';

/*
 * Models
 */
import { DropdownItem } from "../../models/DropdownItem"

export class Dropdown extends AbstractContentType {

    state = {
        isOpen: false
    }

    constructor( props : any ) {
        super( props );
    }

    getActiveDropdownItem () {

        return this.props.content._items.filter( ( dropdownItem: DropdownItem ) => dropdownItem._handle === this.props.content._content )[0];
    }

    handleOpenCloseClick () {
        this.state.isOpen = !this.state.isOpen;
        this.setState( this.state );
    }

    handleChange ( dropdownItemClicked: DropdownItem ) {

        this.state.isOpen = false;
        this.setState( this.state );
        this.props.content._content = dropdownItemClicked._handle;
        this.props.onContentChange( event );
    }

    render() {

        let activeDropdownItem: DropdownItem = this.getActiveDropdownItem();
        let dropdownItems: DropdownItem[] = this.props.content._items;
        let dropdownItemsToAdd = [];

        for ( var key in dropdownItems ) {
            let dropdownItem: DropdownItem = dropdownItems[ key ];
            dropdownItemsToAdd.push(
                <li value={ dropdownItem._handle } key={ key } onClick={ this.handleChange.bind( this, dropdownItem ) } className={ 'dropdownItem' + ( activeDropdownItem && dropdownItem._handle === activeDropdownItem._handle ? ' dropdownItem--active' : '' ) }>{ dropdownItem._content }</li>
            )
        }

        return (
            <div className={ 'dropdown' + ( this.state.isOpen ? ' dropdown--open' : '' ) + ( this.props.className ? ' ' + this.props.className : '' ) }>
                <div className="dropdown-button" onClick={ this.handleOpenCloseClick.bind( this ) }>
                    <p>{ activeDropdownItem ? activeDropdownItem._content : ( this.props.content._defaultText ? this.props.content._defaultText : 'Click to Select' ) }</p>
                    <Icon name="chevron-arrow-down" className="btn"/>
                </div>
                <ul className="dropdown-menu dropdown-select">{ dropdownItemsToAdd }</ul>
            </div>
        );
    }
}
