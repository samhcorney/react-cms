import * as React from 'react';

/*
 * Components
 */
import { SiteEditor } from './SiteEditor';
import { ContentEditor } from './ContentEditor';

export class PrimaryContentContainer extends React.Component<any, {}> {

    constructor( props ) {
        super( props );
        super( props );
        this.handleTemplateDataChange = this.handleTemplateDataChange.bind( this );
    }

    handleTemplateDataChange () {
        this.props.onTemplateDataChange( this.props.templateData );
    }

    render() {
        return (
            <div className="primaryContentContainer">
                <h2>{ this.props.menuItem.title }</h2>
                { this.props.menuItem.handle === 'siteEditor' ? <SiteEditor templateHtml={ this.props.templateHtml } templateData={ this.props.templateData } /> : null }
                { this.props.menuItem.handle === 'contentEditor' ? <ContentEditor templateData={ this.props.templateData } onTemplateDataChange={ this.handleTemplateDataChange } /> : null }
            </div>
        );
    }
}
