import * as React from 'react';

import { Icon } from './Icon';

export class Alert extends React.Component<any, {}> {

    state = {
        isOpen: false
    }

    constructor( props : any ) {
        super( props );
    }

    componentWillReceiveProps ( nextProps ) {

        console.log( 'sdf' );

        this.state.isOpen = nextProps.isOpen;
    }

    handleCloseClick ( event ) {

        this.state.isOpen = false;
        this.setState( this.state );
    }

    handleConfirmClick ( event ) {

        this.state.isOpen = false;
        this.setState( this.state );
        this.props.onConfirm();
    }

    stopPropagation ( event ) {
        event.stopPropagation();
    }

    render () {

        return (
            this.state.isOpen ?
            <div className="alert" onClick={ this.handleCloseClick.bind( this ) }>
                <div className="alert-inner" onClick={ this.stopPropagation.bind( this ) }>
                    <div className="alert-header">
                        <h4>{ this.props.title }</h4>
                        <Icon onClick={ this.handleCloseClick.bind( this ) } name="cross" className="btn"/>
                    </div>
                    <div className="alert-content">
                        <button onClick={ this.handleCloseClick.bind( this ) }>{ this.props.cancelText ? this.props.cancelText : 'cancel' }</button>
                        <button onClick={ this.handleConfirmClick.bind( this ) }>{ this.props.okText ? this.props.okText : 'ok' }</button>
                    </div>
                </div>
            </div>
            : null
        );
    }
}
