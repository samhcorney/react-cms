import * as React from 'react';

import { AbstractContentType } from './AbstractContentType';
import { Icon } from '../Icon';

/*
 * Models
 */
import { DropdownItem } from "../../models/DropdownItem"

export class Dropdown extends AbstractContentType {

    constructor( props : any ) {
        super( props );
    }

    getActiveDropdownItem () {

        return this.props.content._items.filter( ( dropdownItem: DropdownItem ) => dropdownItem._active )[0];
    }

    handleOpenCloseClick () {
        this.props.content._isOpen = !this.props.content._isOpen;
        this.forceUpdate();
    }

    handleChange ( dropdownItemClicked: DropdownItem ) {

        this.props.content._items.forEach( ( dropdownItem: DropdownItem ) => dropdownItem._active = false );
        this.props.content._items.filter( ( dropdownItem: DropdownItem ) => dropdownItem._handle === dropdownItemClicked._handle )[0]._active = true;
        this.props.content._isOpen = false;
        this.forceUpdate();
        this.props.content._content = dropdownItemClicked._handle;
        this.props.onContentChange( event );
    }

    render() {

        let activeDropdownItem: DropdownItem = this.getActiveDropdownItem();
        let dropdownItems: DropdownItem[] = this.props.content._items;
        let dropdownItemsToAdd = [];

        for ( var key in dropdownItems ) {
            let dropdownItem: DropdownItem = dropdownItems[ key ];
            if ( dropdownItem._show ) {
                let dropdownItemClasses = 'dropdownItem';
                dropdownItemClasses = dropdownItem._active ? dropdownItemClasses.concat( ' dropdownItem--active' ) : dropdownItemClasses;
                dropdownItemsToAdd.push(
                    <li value={ dropdownItem._handle } key={ key } onClick={ this.handleChange.bind( this, dropdownItem ) } className={ dropdownItemClasses }>{ dropdownItem._content }</li>
                )
            }
        }

        let dropdownClasses = 'dropdown';
        dropdownClasses = this.props.content._isOpen ? dropdownClasses.concat( ' dropdown--open' ) : dropdownClasses;

        return (
            <div className={ dropdownClasses }>
                <div className="dropdown-button" onClick={ this.handleOpenCloseClick.bind( this ) }>
                    <p>{ activeDropdownItem ? activeDropdownItem._content : ( this.props.defaultText ? this.props.defaultText : 'Click to Select' ) }</p>
                    <Icon name="chevron-arrow-down" className="btn"/>
                </div>
                { this.props.content._isOpen ? <ul className="dropdown-menu dropdown-select">{ dropdownItemsToAdd }</ul> : null }
            </div>
        );
    }
}
