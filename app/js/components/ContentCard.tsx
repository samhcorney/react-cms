import * as React from 'react';

import { ContentTypeRenderer } from './contenttypes/ContentTypeRenderer';
import { Icon } from './Icon';

export class ContentCard extends React.Component<any, {}> {

    state = {
        showBody: true
    }

    constructor( props : any ) {
        super( props );
    }

    handleClick ( event ) {

        if ( this.props.onClick ) {
            this.props.onClick( event )
        };
    }

    toggleBody () {

        this.state.showBody = !this.state.showBody;
        this.setState( this.state );
    }

    render () {

        return (
            <div className={ 'contentCard' + ( this.state.showBody ? ' contentCard-showbody' : ' contentCard-hidebody' ) } >
                <div className="contentCard-header">
                    <h4 className="contentCard-label">{ this.props.contentItem._name } ( { this.props.contentItem._handle } )</h4>
                    <div className="contentCard-header-buttons">
                        <Icon onClick={ this.props.removeContent.bind( this, this.props.contentIndex ) } name="cross" className="btn"/>
                        <Icon onClick={ this.toggleBody.bind( this, this.props.contentItem._handle ) } name="chevron-arrow-down" className="btn contentCard-bodyToggle"/>
                    </div>
                </div>
                { this.state.showBody ?
                <div className="contentCard-body">
                    <ContentTypeRenderer content={ this.props.contentItem } onContentChange={ this.props.handleChange.bind( this ) } />
                </div>
                : null }
            </div>
        );
    }
}
