import * as React from 'react';
import { BrowserRouter,Route, Switch } from "react-router-dom";
import './src/css/reset.css';
import './index.css';
import BodyContents from 'BodyContents';
import loginPop from 'loginPop';

const App = ({ }) => {
    return (
        <BrowserRouter>
            {/* <HeaderBar></HeaderBar> */}
            <Switch>
                <Route path="/" component={ BodyContents } />
                <Route exact path="/loginPop" component={ loginPop } />
            </Switch>
        </BrowserRouter>
    )
}

export default App;