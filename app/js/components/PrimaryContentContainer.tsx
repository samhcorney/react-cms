import * as React from 'react';

/*
 * Components
 */
import { SiteEditor } from './SiteEditor';
import { ContentEditor } from './ContentEditor';

export class PrimaryContentContainer extends React.Component<any, {}> {

    constructor( props ) {
        super( props );
    }

    render() {
        return (
            <div className="primaryContentContainer">
                <h2>{ this.props.menuItem.title }</h2>
                { this.props.menuItem.handle === 'siteEditor' ? <SiteEditor /> : null }
                { this.props.menuItem.handle === 'contentEditor' ? <ContentEditor /> : null }
            </div>
        );
    }
}
