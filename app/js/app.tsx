import 'svgxuse';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

var $ = require( 'jquery' );

/*
 * Components
 */
import { Menu } from './components/Menu';
import { ContentEditor } from './components/ContentEditor';
import { Toast } from './components/Toast';

/*
 * Models
 */
import { State } from "./models/State"
import { MenuItem } from "./models/MenuItem"

export class MyApp extends React.Component<any, {}> {

    state: State = {
        menuItems : [
            { title: 'Content', handle: 'contentEditor', icon: 'pencil', active: true },
            { title: 'Theme', handle: 'themeEditor', icon: 'paint-format' }
        ],
        themeContent: {},
        themeTheme: {},
        themeSaved: true,
        themeSavedMessage: ''
    };

    constructor( props : any ) {
        super( props );
    }

    handleMenuItemClick ( activeMenuItem: MenuItem ) {

        this.setState( this.state );
    }

    componentWillMount () {

        Promise.all( [ $.get( "theme/content.json" ).promise(), $.get( "theme/theme.json" ).promise() ] )
            .then( ( result: any[] ) => {
                this.state.themeContent = result[0];
                this.state.themeTheme = result[1];
                this.setState( this.state );
            })
            .catch( ( error: any ) => {
                console.log( 'Failed when setting theme', error );
            });
    }

    handleThemeContentChange () {

        this.state.themeSavedMessage = '';
        this.state.themeSaved = false;
        this.setState( this.state );
    }

    handleThemeThemeChange () {

        this.state.themeSavedMessage = '';
        this.state.themeSaved = false;
        this.setState( this.state );
    }

    saveTheme () {

        if ( !this.state.themeSaved ) {
            Promise.all([
                    $.post( { url: "http://localhost:3005/saveContent", data: JSON.stringify( this.state.themeContent ), contentType: "application/json" } ).promise(),
                    $.post( { url: "http://localhost:3005/saveTheme", data: JSON.stringify( this.state.themeTheme ), contentType: "application/json" } ).promise()
                ])
                .then( ( result: any ) => {
                    this.state.themeSaved = true;
                    this.state.themeSavedMessage = 'Theme saved';
                    this.setState( this.state );
                })
                .catch( ( error: any ) => {
                    console.log( 'Failed when saving theme', error );
                });    
        }
    }


    addContentFormDefaults = {
        addContentName : {
            _type: 'text',
            _name: 'Name',
            _content: '',
            _placeholder: 'Content Name',
            _error: false
        },
        addContentHandle : {
            _type: 'text',
            _name: 'Handle',
            _content: '',
            _placeholder: 'Content Handle',
            _error: false
        },
        addContentType : {
            _type: 'dropdown',
            _name: 'Type',
            _content: '',
            _isOpen: false,
            _items: [
                {
                    _type: 'dropdownItem',
                    _handle: 'text',
                    _content: 'Text',
                    _active: true,
                    _show: true
                },
                {
                    _type: 'dropdownItem',
                    _handle: 'textarea',
                    _content: 'Text Area',
                    _show: true
                },
                {
                    _type: 'dropdownItem',
                    _handle: 'number',
                    _content: 'Number',
                    _show: true
                },
                {
                    _type: 'dropdownItem',
                    _handle: 'checkbox',
                    _content: 'Checkbox',
                    _show: true
                },
                {
                    _type: 'dropdownItem',
                    _handle: 'colour',
                    _content: 'Colour',
                    _show: true
                }
            ],
            _error: false
        }
    }






    render () {

        let pageClasses = 'pageContainer';
        pageClasses = this.state.themeSaved ? pageClasses.concat( ' theme--saved' ) : pageClasses.concat( ' theme--unsaved' );
        let content;
        let changeHandler;
        let addContentForm = this.addContentFormDefaults;
        addContentForm.addContentType._isOpen = false;
        for ( var key in addContentForm ) {
            addContentForm[key]._error = false;
        }

        switch( this.state.menuItems.filter( ( menuItem: MenuItem ) => menuItem.active )[0].handle ) {
            case 'contentEditor':
                content = this.state.themeContent;
                changeHandler = this.handleThemeContentChange.bind( this );
                addContentForm.addContentType._items.forEach( ( dropdownItem: any ) => {
                    if ( dropdownItem._handle === 'text' ) {
                        dropdownItem._active = true;
                    }
                    else {
                        dropdownItem._active = false;
                    }
                    dropdownItem._show = true;
                });
                break;
            case 'themeEditor':
                content = this.state.themeTheme;
                changeHandler = this.handleThemeThemeChange.bind( this );
                addContentForm.addContentType._items.forEach( ( dropdownItem: any ) => {
                    if ( dropdownItem._handle !== 'colour' ) {
                        dropdownItem._show = false;
                        dropdownItem._active = false;
                    }
                    else {
                        dropdownItem._active = true;
                    }
                });
                break;
            default:
                content = this.state.themeContent;
                changeHandler = this.handleThemeContentChange.bind( this );
        }

        let activeDropdownItem = addContentForm.addContentType._items.filter( ( dropdownItem: any ) => dropdownItem._active )[0];
        if ( activeDropdownItem ) {
            addContentForm.addContentType._content = activeDropdownItem._handle;
        }

        return (
            <div className={ pageClasses }>
                <Menu menuItems={ this.state.menuItems }
                    onMenuItemClick={ this.handleMenuItemClick.bind( this ) }
                    onSaveTheme={ this.saveTheme.bind( this ) } />
                <ContentEditor content={ content } addContentForm={ addContentForm } onContentChange={ changeHandler } />
                <Toast message={ this.state.themeSavedMessage } />
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
