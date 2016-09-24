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
            { title: 'Site', handle: 'siteEditor' },
            { title: 'Content', handle: 'contentEditor' },
            { title: 'Theme', handle: 'themeEditor' }
        ],
        templateHtml: '',
        templateContent: '',
        templateTheme: ''
    };

    constructor( props : any ) {
        super( props );
        this.state.activeMenuItem = this.state.menuItems[2];
        this.handleMenuItemClick = this.handleMenuItemClick.bind( this );
    }

    handleMenuItemClick ( menuItem: MenuItem ) {

        this.state.activeMenuItem = menuItem;
        this.setState( this.state );
    }

    componentWillMount () {

        Promise.all( [ $.get( "template/template.html" ).promise(), $.get( "template/content.json" ).promise(), $.get( "template/theme.json" ).promise() ] )
            .then( ( result: any[] ) => {
                this.state.templateHtml = result[0];
                this.state.templateContent = result[1];
                this.state.templateTheme = result[2];
                this.setState( this.state );
            })
            .catch( ( error: any ) => {
                console.log( 'Failed when setting site content ', error );
            });
    }

    handleTemplateContentChange () {

    }

    handleTemplateThemeChange () {

    }

    render () {
        return (
            <div className="pageContainer">
                <SideMenu menuItems={ this.state.menuItems } onMenuItemClick={ this.handleMenuItemClick } />
                <PrimaryContentContainer
                    menuItem={ this.state.activeMenuItem }
                    templateHtml={ this.state.templateHtml }
                    templateContent={ this.state.templateContent }
                    templateTheme={ this.state.templateTheme }
                    onTemplateContentChange={ this.handleTemplateContentChange }
                    onTemplateThemeChange={ this.handleTemplateThemeChange } />
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
