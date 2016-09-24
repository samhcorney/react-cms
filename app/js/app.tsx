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
            { title: 'Content', handle: 'contentEditor' },
            { title: 'Theme', handle: 'themeEditor' }
        ],
        themeTemplate: '',
        themeContent: '',
        themeTheme: ''
    };

    constructor( props : any ) {
        super( props );
        this.state.activeMenuItem = this.state.menuItems[0];
        this.handleMenuItemClick = this.handleMenuItemClick.bind( this );
        this.handleThemeContentChange = this.handleThemeContentChange.bind( this );
        this.handleThemeThemeChange = this.handleThemeThemeChange.bind( this );
        this.saveTheme = this.saveTheme.bind( this );
    }

    handleMenuItemClick ( menuItem: MenuItem ) {

        this.state.activeMenuItem = menuItem;
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

    handleThemeContentChange () {}

    handleThemeThemeChange () {}

    saveTheme () {

        Promise.all( [ $.post( "http://localhost:3001/saveContent", this.state.themeContent ).promise(), $.post( "http://localhost:3001/saveTheme", this.state.themeTheme ).promise() ] )
            .then( ( result: any ) => {} )
            .catch( ( error: any ) => {
                console.log( 'Failed when saving theme', error );
            });
    }

    render () {
        return (
            <div className="pageContainer">
                <button className="save-theme" onClick={ this.saveTheme }>Save</button>
                <SideMenu menuItems={ this.state.menuItems } onMenuItemClick={ this.handleMenuItemClick } />
                <PrimaryContentContainer
                    menuItem={ this.state.activeMenuItem }
                    themeTemplate={ this.state.themeTemplate }
                    themeContent={ this.state.themeContent }
                    themeTheme={ this.state.themeTheme }
                    onThemeContentChange={ this.handleThemeContentChange }
                    onThemeThemeChange={ this.handleThemeThemeChange } />
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
