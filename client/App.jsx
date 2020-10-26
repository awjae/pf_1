import * as React from 'react';
import './src/css/reset.css';
import './index.css';
import BodyContents from 'BodyContents';
import HeaderBar from 'HeaderBar';

const App = ({ }) => {
    return (
        <>
            <HeaderBar></HeaderBar>
            <BodyContents></BodyContents>
        </>
    )
}

export default App;