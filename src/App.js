import React from 'react';
import AuthComponent from './component/AuthComponent'
import { Switch,Route,Redirect} from 'react-router-dom'
import Login from './pages/login';
import Register from './pages/register';
import BossInfo from './pages/bossInfo'
import NiurenInfo from './pages/niurenInfo'
import Dadload from './pages/dadload'
import './App.scss'
import Chat from './pages/chat';
export default function App() {
    return (
      <div className="app"> 
           <AuthComponent />
           <Switch>
              <Route path="/login" component={Login}></Route>
              <Route path="/register" component={Register}></Route>
              <Route path="/bossinfo" component={BossInfo}></Route>
              <Route path="/niureninfo" component={NiurenInfo}></Route>
              <Route path="/chat/:user" component={Chat}></Route>
              <Route component={Dadload} />
              {/* <Route path="/boss" component={Boss}></Route>
              <Route path="/niuren" component={Niuren}></Route> */}
           </Switch>
      </div>
    )
}
