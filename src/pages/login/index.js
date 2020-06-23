
import React from 'react'
import { List,Button,InputItem } from 'antd-mobile'
import { connect } from 'react-redux'
import '../register/index.scss'
import { login } from '../../redux/user'
import { Redirect } from 'react-router-dom'
import errorMsg from '../../utils/errorMsg'
import handleInputChangeHeightOrderCom from '../../utils/handleInputChangeHeightOrderCom'
function Login(props) {
    let { username,password,setUsername,setPassword,handleInputChange } = props
    const handleLogin = () => {
        if(!username || !password) return errorMsg('用户名和密码不为空')
        props.login({ username,password })
    }
    let redirectTo = props.userInfo.redirectTo
    return <div className="login register">
                { redirectTo && redirectTo !== props.location.pathname ? <Redirect to={redirectTo} /> : null }
                <img className="logo" src="/logo.jpg" alt="" />
                <div className="login-form">   
                    <List style={{marginTop:'0.6rem'}}>
                        <InputItem value={ username } onChange={ (content)=> handleInputChange(username,setUsername,content) }>用户名</InputItem>
                        <InputItem value={ password } type="password" onChange={ (content)=> handleInputChange(password,setPassword,content) }>密码</InputItem>
                    </List>  
                    <Button type="primary" style={{marginTop: '0.4rem'}} onClick={ handleLogin }>登录</Button> 
                    <Button type="primary" style={{marginTop: '0.14rem'}} onClick={()=> props.history.push('/register')}>注册</Button> 
                </div>    
           </div>
}
Login = handleInputChangeHeightOrderCom(Login)
export default connect(
    state => ({ userInfo: state.user }),
    {login}
)(Login)