import * as React from 'react';

import { Icon } from './Icon';

export class Toast extends React.Component<any, {}> {

    state = {
        message: ''
    }

    timeout;

    constructor( props : any ) {
        super( props );
    }

    componentWillReceiveProps ( nextProps: any ) {

        if ( nextProps.message ) {
            this.state.message = nextProps.message;
            this.setState( this.state );
            if ( this.timeout ) {
                clearTimeout( this.timeout );
            }
            this.timeout = setTimeout( ( any ) => {
                this.state.message = '';
                this.setState( this.state );
            }, this.props.closeAfterMilliseconds ? this.props.closeAfterMilliseconds : 5000 );

        }
    }

    handleCloseClick () {

        this.state.message = '';
        this.setState( this.state );
    }

    render () {

        return (
            this.state.message ?
            <div className="toast">
                <p>{ this.state.message }</p>
                <Icon onClick={ this.handleCloseClick.bind( this ) } name="cross" className="btn"/>
            </div> : null
        );
    }
}
