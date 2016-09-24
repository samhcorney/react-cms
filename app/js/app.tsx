import 'svgxuse';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

var $ = require( 'jquery' );

/*
 * Components
 */
import { SideMenu } from './components/SideMenu';
import { PrimaryContentContainer } from './components/PrimaryContentContainer';

/*
 * Models
 */
import { MenuItem } from "./models/MenuItem"

export class MyApp extends React.Component<any, {}> {

    state: any = {
        menuItems : [
            { title: 'Content', handle: 'contentEditor', active: true },
            { title: 'Theme', handle: 'themeEditor' }
        ],
        themeTemplate: '',
        themeContent: '',
        themeTheme: '',
        themeSaved: true
    };

    constructor( props : any ) {
        super( props );
    }

    handleMenuItemClick ( activeMenuItem: MenuItem ) {

        this.state.menuItems.forEach( ( menuItem: MenuItem ) => menuItem.active = false );
        this.state.menuItems.filter( ( menuItem: MenuItem ) => menuItem.handle === activeMenuItem.handle )[0].active = true;
        this.setState( this.state );
    }

    componentWillMount () {

        Promise.all( [ $.get( "theme/template.html" ).promise(), $.get( "theme/content.json" ).promise(), $.get( "theme/theme.json" ).promise() ] )
            .then( ( result: any[] ) => {
                this.state.themeTemplate = result[0];
                this.state.themeContent = result[1];
                this.state.themeTheme = result[2];
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

        Promise.all( [ $.post( "http://localhost:3001/saveContent", this.state.themeContent ).promise(), $.post( "http://localhost:3001/saveTheme", this.state.themeTheme ).promise() ] )
            .then( ( result: any ) => {
                this.state.themeSaved = true;
                this.setState( this.state );
            })
            .catch( ( error: any ) => {
                console.log( 'Failed when saving theme', error );
            });
    }

    render () {

        let pageClasses = 'pageContainer';
        pageClasses = this.state.themeSaved ? pageClasses.concat( ' theme--saved' ) : pageClasses.concat( ' theme--unsaved' );

        return (
            <div className={ pageClasses }>
                <SideMenu
                    menuItems={ this.state.menuItems }
                    onMenuItemClick={ this.handleMenuItemClick.bind( this ) }
                    onSaveTheme={ this.saveTheme.bind( this ) } />
                <PrimaryContentContainer
                    menuItems={ this.state.menuItems }
                    themeTemplate={ this.state.themeTemplate }
                    themeContent={ this.state.themeContent }
                    themeTheme={ this.state.themeTheme }
                    onThemeContentChange={ this.handleThemeContentChange.bind( this ) }
                    onThemeThemeChange={ this.handleThemeThemeChange.bind( this ) } />
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
