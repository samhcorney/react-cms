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

    toggleBody () {

        this.state.showBody = !this.state.showBody;
        this.setState( this.state );
    }

    render () {

        return (
            <li className={ 'contentCard' + ( this.state.showBody ? ' contentCard-showbody' : ' contentCard-hidebody' ) + ( this.props.customStyles ? ' ' + this.props.customStyles : '' ) } draggable="true" onDragStart={ this.props.dragStart.bind( this, this.props.contentItem ) } onDragEnd={ this.props.dragEnd.bind( this, this.props.contentItem ) } >
                <div className="contentCard-header" onDragOver={ this.props.dragOver.bind( this, this.props.contentItem ) }>
                    <h4 className="contentCard-label">{ this.props.contentItem._name } ( { this.props.contentHandle } )</h4>
                    <div className="contentCard-header-buttons">
                        <Icon onClick={ this.props.removeContent.bind( this, this.props.contentHandle ) } name="cross" className="btn"/>
                        <Icon onClick={ this.toggleBody.bind( this ) } name="chevron-arrow-down" className="btn contentCard-bodyToggle"/>
                    </div>
                </div>
                { this.state.showBody ?
                <div className="contentCard-body">
                    <ContentTypeRenderer content={ this.props.contentItem } onContentChange={ this.props.handleChange.bind( this ) } />
                </div>
                : null }
            </li>
        );
    }
}
