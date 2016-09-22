import 'svgxuse';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { PageContainer } from './components/PageContainer';

export class MyApp {

    constructor () {
        ReactDOM.render(
            <PageContainer />,
            document.getElementById( 'content' )
        );
    }
}

this.MyApp();
