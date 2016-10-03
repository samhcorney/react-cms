import * as React from 'react';

import { Icon } from './Icon';

export abstract class Modal extends React.Component<any, {}> {

    modalContent;
    state = {
        isOpen: false,
        options: {
            title: 'Are you sure?',
            cancelText: 'cancel',
            confirmText: 'ok',
            callbackData: ''
        },
        data: null
    }

    constructor( props : any ) {
        super( props );
    }

    setOptions ( customOptions ) {

        for ( var key in customOptions ) {
            if ( customOptions.hasOwnProperty( key ) ) {
                this.state.options[ key ] = customOptions[ key ];
            }
        }
    }

    open ( customOptions ) {

        this.setOptions( customOptions );
        this.state.isOpen = true;
        this.setState( this.state );
    }

    close () {

        this.state.isOpen = false;
        this.setState( this.state );
        if ( this.props.onClose ) {
            this.props.onClose( this.state.options.callbackData );
        }
    }

    handleConfirmClick () {

        this.state.isOpen = false;
        this.setState( this.state );
        this.props.onConfirm( this.state.options.callbackData );
    }

    stopPropagation ( event ) {

        event.stopPropagation();
    }

    render () {

        return (
            this.state.isOpen ?
            <div className="modal" onClick={ this.close.bind( this ) }>
                <div className="modal-inner" onClick={ this.stopPropagation.bind( this ) }>
                    <div className="modal-header">
                        <h4>{ this.state.options.title }</h4>
                        <Icon onClick={ this.close.bind( this ) } name="cross" className="btn"/>
                    </div>
                    { this.modalContent ?
                    <div className="modal-content">
                        { this.modalContent }
                    </div>
                    : null }
                    <div className="modal-footer">
                        <button onClick={ this.close.bind( this ) }>{ this.state.options.cancelText }</button>
                        <button onClick={ this.handleConfirmClick.bind( this ) }>{ this.state.options.confirmText }</button>
                    </div>
                </div>
            </div>
            : null
        );
    }
}
