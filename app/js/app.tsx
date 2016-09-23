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
            { title: 'Site Editor', handle: 'siteEditor' },
            { title: 'Content Editor', handle: 'contentEditor' },
            { title: 'Palette', handle: 'palette' }
        ],
        templateHtml: '',
        templateData: ''
    };

    constructor( props : any ) {
        super( props );
        this.state.activeMenuItem = this.state.menuItems[1];
        this.handleMenuItemClick = this.handleMenuItemClick.bind( this );
    }

    handleMenuItemClick ( menuItem: MenuItem ) {

        this.state.activeMenuItem = menuItem;
        this.setState( this.state );
    }

    componentWillMount () {

        Promise.all( [ $.get( "templates/one.html" ).promise(), $.get( "data/one.json" ).promise() ] )
            .then( ( result: any[] ) => {
                this.state.templateHtml = result[0];
                this.state.templateData = result[1];
                this.setState( this.state );
            })
            .catch( ( error: any ) => {
                console.log( 'Failed when setting site content ', error );
            });
    }


    handleTemplateDataChange () {
        
    }

    render () {
        return (
            <div className="pageContainer">
                <SideMenu menuItems={ this.state.menuItems } onMenuItemClick={ this.handleMenuItemClick } />
                <PrimaryContentContainer menuItem={ this.state.activeMenuItem } templateHtml={ this.state.templateHtml } templateData={ this.state.templateData } onTemplateDataChange={ this.handleTemplateDataChange } />
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
