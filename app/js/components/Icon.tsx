import * as React from 'react';

export class Icon extends React.Component<any, {}> {

    constructor( props : any ) {
        super( props );
    }

    handleClick ( event ) {

        if ( this.props.onClick ) {
            this.props.onClick( event )
        };
    }

    render () {

        return (
            <svg onClick={ this.handleClick.bind( this ) } className={ "icon icon-" + this.props.name + ' ' + this.props.className }><use xlinkHref={ "/build/fonts/svg-symbols.svg#" + this.props.name }></use></svg>
        );
    }
}
