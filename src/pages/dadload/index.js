import React from 'react'
import { Switch,Route,Redirect} from 'react-router-dom'
import { NavBar } from 'antd-mobile';
import TabBarLink from '../../component/tabBarLink'
import { connect } from 'react-redux'
import  Boss from '../boss'
import  Niuren from '../niuren'
import  Message from '../message'
import  Me from '../me'
function DadLoad(props) {
    const pathname = props.location.pathname
    const tabBarList = [  // tabBar显示的列表  boss角色查看牛人列表  niuren角色查看boss列表
        {
            path: '/boss',   //  boss角色匹配的路径
            icon: 'boss',    // tabbar显示图标
            selectedIcon: 'boss-active', // 选中的图标
            text: 'boss',    // tabbar显示图标的名字
            title: '牛人列表', // navbar显示的标题
            component: Boss,
            hide: props.userInfo.type === 'niuren' // 如boss身份则隐藏niuren的navbar
        },
        {
            path: '/niuren',   //  niuren角色匹配的路径
            icon: 'niuren',    // tabbar显示图标
            selectedIcon: 'niuren-active', // 选中的图标
            text: 'niuren',    // tabbar显示图标的名字
            title: 'boss列表', // navbar显示的标题
            component: Niuren,
            hide: props.userInfo.type === 'boss' // 如boss身份则隐藏niuren的navbar
        },
        {
            path: '/message',   //  boss角色匹配的路径
            icon: 'message',    // tabbar显示图标
            selectedIcon: 'message-active', // 选中的图标
            text: 'message',    // tabbar显示图标的名字
            title: '信息列表', // navbar显示的标题
            component: Message
        },
        {
            path: '/me',   //  boss角色匹配的路径
            icon: 'me',    // tabbar显示图标
            selectedIcon: 'me-active', // 选中的图标
            text: 'me',    // tabbar显示图标的名字
            title: '我的', // navbar显示的标题
            component: Me
        },
    ]
    return <div>
        <NavBar
        mode="dark"
        >
            { tabBarList.find(v=> v.path === pathname) ? tabBarList.find(v=> v.path === pathname).title : '消息列表'}
        </NavBar>
        <Switch>
              <Route path="/boss" component={Boss}></Route>
              <Route path="/niuren" component={Niuren}></Route>
              <Route path="/message" component={Message}></Route>
              <Route path="/me" component={Me}></Route>
              {/* <Redirect to="/login"></Redirect> */}
        </Switch>
        <div>
        <TabBarLink tabBarList={tabBarList} /> 
        </div>
            </div>
}
export default connect(
    state=> ({userInfo: state.user}),
    null
)(DadLoad)