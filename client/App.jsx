import * as React from 'react';
import { BrowserRouter,Route, Switch } from "react-router-dom";
import './src/css/reset.css';
import './index.css';
import BodyContents from 'BodyContents';
import LoginPop from './src/component/User/LoginPop';
import SignUp from './src/component/User/SignUp';
import FindId from './src/component/User/FindId';
import FindPw from './src/component/User/FindPw';
import { RecoilRoot } from 'recoil';

const App = ({ }) => {
    return (
        <RecoilRoot>
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
                    <Route exact path="/loginPop" component={ LoginPop } />
                    <Route path="/loginPop/signUp" component={ SignUp } />
                    <Route path="/loginPop/findId" component={ FindId } />
                    <Route path="/loginPop/findPw" component={ FindPw } />
                </Switch>
            </BrowserRouter>
        </RecoilRoot>
    )
}

export default App;