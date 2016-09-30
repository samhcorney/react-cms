import 'svgxuse';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

var $ = require( 'jquery' );

/*
 * Components
 */
import { SideMenu } from './components/SideMenu';
import { ContentEditor } from './components/ContentEditor';

/*
 * Models
 */
import { State } from "./models/State"
import { MenuItem } from "./models/MenuItem"

export class MyApp extends React.Component<any, {}> {

    state: State = {
        menuItems : [
            { title: 'Content', handle: 'contentEditor', active: true },
            { title: 'Theme', handle: 'themeEditor' }
        ],
        themeContent: {},
        themeTheme: {},
        themeSaved: true
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

        this.state.themeSaved = false;
        this.setState( this.state );
    }

    handleThemeThemeChange () {

        this.state.themeSaved = false;
        this.setState( this.state );
    }

    saveTheme () {

        Promise.all([
                $.post( { url: "http://localhost:3005/saveContent", data: JSON.stringify( this.state.themeContent ), contentType: "application/json" } ).promise(),
                $.post( { url: "http://localhost:3005/saveTheme", data: JSON.stringify( this.state.themeTheme ), contentType: "application/json" } ).promise()
            ])
            .then( ( result: any ) => {
                this.state.themeSaved = true;
                this.setState( this.state );
            })
            .catch( ( error: any ) => {
                console.log( 'Failed when saving theme', error );
            });
    }


    addContentFormDefaults = {
        addContentName : {
            _type: 'text',
            _name: 'Name',
            _content: '',
            _error: false
        },
        addContentHandle : {
            _type: 'text',
            _name: 'Handle',
            _content: '',
            _error: false
        },
        addContentType : {
            _type: 'dropdown',
            _name: 'Type',
            _content: '',
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

        return (
            <div className={ pageClasses }>
                <SideMenu menuItems={ this.state.menuItems }
                    onMenuItemClick={ this.handleMenuItemClick.bind( this ) }
                    onSaveTheme={ this.saveTheme.bind( this ) } />
                <ContentEditor content={ content } addContentForm={ addContentForm } onContentChange={ changeHandler } />
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
