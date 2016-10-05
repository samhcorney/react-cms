import 'svgxuse';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

var $ = require( 'jquery' );

/*
 * Components
 */
import { Menu } from './components/Menu';
import { ContentEditor } from './components/ContentEditor';
import { LivePreview } from './components/LivePreview';
import { Toast } from './components/Toast';

/*
 * Models
 */
import { MenuItem } from "./models/MenuItem"

export class MyApp extends React.Component<any, {}> {

    refs;
    state = {
        menuItems : [
            { title: 'Content', handle: 'contentEditor', icon: 'pencil', active: true },
            { title: 'Theme', handle: 'themeEditor', icon: 'paint-format' },
            { title: 'Live Preview', handle: 'livePreview', icon: 'play3' }
        ],
        themeContent: {},
        themeTheme: {},
        themeTemplate: '',
        themeSaved: true
    };

    constructor( props : any ) {
        super( props );
    }

    handleMenuItemClick ( activeMenuItem: MenuItem ) {

        this.setState( this.state );
    }

    componentWillMount () {

        Promise.all( [ $.get( "theme/content.json" ).promise(), $.get( "theme/theme.json" ).promise(), $.get( "theme/templatetest.html" ).promise() ] )
            .then( ( result: any[] ) => {
                this.state.themeContent = result[0];
                this.state.themeTheme = result[1];
                this.state.themeTemplate = result[2];
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

        if ( !this.state.themeSaved ) {
            Promise.all([
                    $.post( { url: "http://localhost:3005/saveContent", data: JSON.stringify( this.state.themeContent ), contentType: "application/json" } ).promise(),
                    $.post( { url: "http://localhost:3005/saveTheme", data: JSON.stringify(  this.state.themeTheme  ), contentType: "application/json" } ).promise()
                ])
                .then( ( result: any ) => {
                    this.state.themeSaved = true;
                    this.setState( this.state );
                    this.refs.toast.open( 'Theme saved' );
                })
                .catch( ( error: any ) => {
                    console.log( 'Failed when saving theme', error );
                });
        }
    }

    render () {

        let content;
        let changeHandler;
        let showEditor = false;
        let restrictContentTypes = [];

        let activeMenuItem = this.state.menuItems.filter( ( menuItem: MenuItem ) => menuItem.active )[0];

        switch( activeMenuItem.handle ) {
            case 'contentEditor':
            showEditor = true;
                content = this.state.themeContent;
                changeHandler = this.handleThemeContentChange.bind( this );
                break;
            case 'themeEditor':
                showEditor = true;
                content = this.state.themeTheme;
                changeHandler = this.handleThemeThemeChange.bind( this );
                restrictContentTypes = [ 'colour' ];
                break;
            default:
                content = this.state.themeContent;
                changeHandler = this.handleThemeContentChange.bind( this );
        }

        return (
            <div className={ 'siteContainer' + ( this.state.themeSaved ? ' theme--saved' : ' theme--unsaved' ) }>
                <div className={ 'editorContainer' }>
                    <Menu menuItems={ this.state.menuItems }
                        onMenuItemClick={ this.handleMenuItemClick.bind( this ) }
                        onSaveTheme={ this.saveTheme.bind( this ) } />
                    { showEditor && Object.keys( content ).length ? <ContentEditor content={ content } restrictContentTypes={ restrictContentTypes } onContentChange={ changeHandler } /> : null }
                    { activeMenuItem.handle === 'livePreview' ? <LivePreview themeContent={ this.state.themeContent } themeTemplate={ this.state.themeTemplate } /> : null }
                    <Toast ref="toast" />
                </div>
                <LivePreview themeContent={ this.state.themeContent } themeTemplate={ this.state.themeTemplate } />
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
