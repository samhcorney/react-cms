import * as React from 'react';

export abstract class AbstractContentType extends React.Component<any, {}> {

    constructor( props : any ) {
        super( props );
    }

    handleChange ( event ) {

        this.props.content._content = event.target.value;
        this.props.onContentChange( event );
    }
}
