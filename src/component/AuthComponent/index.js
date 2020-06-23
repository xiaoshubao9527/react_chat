import React from 'react'
import { reqUserInfo } from '../../api'
import { withRouter } from 'react-router-dom'
import { connect }  from 'react-redux'
import { submitUserInfoToRedux } from '../../redux/user'
 function AuthComponent(props) {
    let pathname = props.location.pathname
    let arr = ['/login','/register']
    if(arr.indexOf(pathname) !== -1) return null
    const auth = async function() {
        const result = await reqUserInfo()
        if(result.status === 200 && result.data.code === 0) { // 有cookie就把最新的用户信息提交到redux中保持最新的用户信息
            props.submitUserInfoToRedux(result.data.data)
        }else {
            props.history.push('/login') // 没有cookie则跳转到login登录页面
        }
    }
    auth()
    return <div className="auth-component"></div>
}
export default connect(
    null,
    {submitUserInfoToRedux}
)(withRouter(AuthComponent))