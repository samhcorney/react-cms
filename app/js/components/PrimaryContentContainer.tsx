import * as React from 'react';

/*
 * Components
 */
import { SiteEditor } from './SiteEditor';
import { ContentEditor } from './ContentEditor';
import { ThemeEditor } from './ThemeEditor';

export class PrimaryContentContainer extends React.Component<any, {}> {

    constructor( props ) {
        super( props );
        this.handleTemplateContentChange = this.handleTemplateContentChange.bind( this );
        this.handleTemplateThemeChange = this.handleTemplateThemeChange.bind( this );
    }

    handleTemplateContentChange () {
        this.props.onTemplateContentChange( this.props.templateContent );
    }

    handleTemplateThemeChange () {
        this.props.onTemplateThemeChange( this.props.templateTheme );
    }

    render() {
        return (
            <div className="primaryContentContainer">
                <h2>{ this.props.menuItem.title }</h2>
                { this.props.menuItem.handle === 'siteEditor' ? <SiteEditor templateHtml={ this.props.templateHtml } templateContent={ this.props.templateContent } /> : null }
                { this.props.menuItem.handle === 'contentEditor' ? <ContentEditor templateContent={ this.props.templateContent } onTemplateContentChange={ this.handleTemplateContentChange } /> : null }
                { this.props.menuItem.handle === 'themeEditor' ? <ThemeEditor templateTheme={ this.props.templateTheme } onTemplateThemeChange={ this.handleTemplateThemeChange } /> : null }
            </div>
        );
    }
}
