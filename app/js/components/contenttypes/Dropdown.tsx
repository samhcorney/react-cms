import * as React from 'react';

import { AbstractContentType } from './AbstractContentType';

/*
 * Models
 */
import { DropdownItem } from "../../models/DropdownItem"

export class Dropdown extends AbstractContentType {

    constructor( props : any ) {
        super( props );
    }

    componentWillMount () {

        let activeDropdownItem: DropdownItem = this.getActiveDropdownItem();
        if ( activeDropdownItem ) {
            this.props.content._content = activeDropdownItem._handle;
            this.props.onContentChange( activeDropdownItem._handle );
        }
    }

    getActiveDropdownItem () {

        return this.props.content._items.filter( ( dropdownItem: DropdownItem ) => dropdownItem._active )[0];
    }

    handleOpenCloseClick () {
        this.props.content._isOpen = !this.props.content._isOpen;
        this.setState( this.state );
    }

    handleChange ( dropdownItemClicked: DropdownItem ) {

        this.props.content._items.forEach( ( dropdownItem: DropdownItem ) => dropdownItem._active = false );
        this.props.content._items.filter( ( dropdownItem: DropdownItem ) => dropdownItem._handle === dropdownItemClicked._handle )[0]._active = true;
        this.props.content._isOpen = false;
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
                <p className="dropdown-button" onClick={ this.handleOpenCloseClick.bind( this ) }>{ activeDropdownItem ? activeDropdownItem._content : ( this.props.defaultText ? this.props.defaultText : 'Click to Select' ) }</p>
                { this.props.content._isOpen ? <ul className="dropdown-menu dropdown-select">{ dropdownItemsToAdd }</ul> : null }
            </div>
        );
    }
}