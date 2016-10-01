import * as React from 'react';

import { Icon } from './Icon';

export class Toast extends React.Component<any, {}> {

    state = {
        isOpen: false,
        message: ''
    }

    timeout;

    constructor( props : any ) {
        super( props );
    }

    open ( message ) {

        this.state.isOpen = true;
        this.state.message = message;
        this.setState( this.state );

        clearTimeout( this.timeout );

        this.timeout = setTimeout( ( any ) => {
            this.close();
        }, this.props.closeAfterMilliseconds ? this.props.closeAfterMilliseconds : 3500 );
    }

    close () {

        this.state.isOpen = false;
        this.setState( this.state );
    }

    render () {

        return (
            this.state.isOpen ?
            <div className="toast">
                <h4>{ this.state.message }</h4>
                <Icon onClick={ this.close.bind( this ) } name="cross" className="btn"/>
            </div> : null
        );
    }
}
