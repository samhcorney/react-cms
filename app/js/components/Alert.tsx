import * as React from 'react';

import { Icon } from './Icon';

export class Alert extends React.Component<any, {}> {

    state = {
        isOpen: false,
        data: null
    }

    constructor( props : any ) {
        super( props );
    }

    open ( data ) {

        this.state.isOpen = true;
        this.state.data = data;
        this.setState( this.state );
    }

    cancel ( event ) {

        this.state.isOpen = false;
        this.setState( this.state );
        if ( this.props.onCancel ) {
            this.props.onCancel( this.state.data.callbackDat );
        }
    }

    handleConfirmClick ( event ) {

        this.state.isOpen = false;
        this.setState( this.state );
        this.props.onConfirm( this.state.data.callbackData );
    }

    stopPropagation ( event ) {

        event.stopPropagation();
    }

    render () {

        return (
            this.state.isOpen ?
            <div className="alert" onClick={ this.cancel.bind( this ) }>
                <div className="alert-inner" onClick={ this.stopPropagation.bind( this ) }>
                    <div className="alert-header">
                        <h4>{ this.state.data.title ? this.state.data.title : 'Are you sure?' }</h4>
                        <Icon onClick={ this.cancel.bind( this ) } name="cross" className="btn"/>
                    </div>
                    <div className="alert-content">
                        <button onClick={ this.cancel.bind( this ) }>{ this.state.data.cancelText ? this.state.data.cancelText : 'cancel' }</button>
                        <button onClick={ this.handleConfirmClick.bind( this ) }>{ this.state.data.okText ? this.state.data.okText : 'ok' }</button>
                    </div>
                </div>
            </div>
            : null
        );
    }
}
