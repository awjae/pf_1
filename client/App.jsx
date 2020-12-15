import * as React from 'react';
import { BrowserRouter,Route, Switch } from "react-router-dom";
import './src/css/reset.css';
import './index.css';
import BodyContents from 'BodyContents';
import LoginPop from 'LoginPop';

const App = ({ }) => {
    return (
        <BrowserRouter>
            {/* <HeaderBar></HeaderBar> */}
            <Switch>
                <Route exact path="/" component={ BodyContents } />
                <Route path="/mypage" component={ BodyContents } />
                <Route path="/searchPage" component={ BodyContents } /> 
                <Route path="/routing"  component={ BodyContents } /> 
                <Route path="/trip" component={ BodyContents } /> 
                <Route path="/tools" component={ BodyContents } />
                <Route path="/favorite" component={ BodyContents } />  
                {/* 컴포넌트가 중복되는 이유 : 뒤늦게 react-route를 적용함으로써인해 구조적으로 알맞게 짜여지지 않았다... */}
                <Route path="/loginPop" component={ LoginPop } />
            </Switch>
        </BrowserRouter>
    )
}

export default App;