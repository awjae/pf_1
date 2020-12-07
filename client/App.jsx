import * as React from 'react';
import { BrowserRouter,Route, Link,Switch } from "react-router-dom";
import './src/css/reset.css';
import './index.css';
import BodyContents from 'BodyContents';
import HeaderBar from 'HeaderBar';

const App = ({ }) => {
    return (
        <BrowserRouter>
            {/* <HeaderBar></HeaderBar> */}
            <BodyContents></BodyContents>
        </BrowserRouter>
    )
}

export default App;