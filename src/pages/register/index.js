
import React, { useState } from 'react'
import { List,Button,InputItem,WhiteSpace,Radio, Toast } from 'antd-mobile'
import './index.scss'
import { reqRegister } from '../../api';
const RadioItem = Radio.RadioItem;
export default function Register(props) {
    let [type, setType] = useState('niuren')
    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')
    let [reaptPassword, setReaptPassword] = useState('')
    let [value, setValue] = useState(0)
    const radioTypes = [
        { value: 0, label: 'niuren' },
        { value: 1, label: 'boss' },
    ];
    // 处理表单输入框
    const handleInputChange = (v,set,value) => {
        set(v = value)
    }
    // 处理单选框的用户注册的类型
    const onChange = (value,roleType) => {
        setValue(value)
        setType(roleType)
    }
    const register = async (data) => {
        const result = await reqRegister(data)
        if(result.status === 200 && result.data.code === 0){
            Toast.success(result.data.msg, 1)
            props.history.push('/login')
        }else{
            Toast.fail(result.data.msg, 1)
        }
    }
    const handleRegister = () => { 
        if(!username || !password) {
            return Toast.info('用户名和密码不为空', 2);
        }
        if(password !== reaptPassword) {
            return Toast.info('两次输入密码不相同', 2);
        }
        register({username,password,type})
    }
    return <div className="register">
                <img className="logo" src="/logo.jpg" alt="" />
                <div className="login-form">
                    <List renderHeader={() => 'RadioItem demo'}>
                        <WhiteSpace />
                        <InputItem value={ username } onChange={ (content)=> handleInputChange(username,setUsername,content) }>用户名</InputItem>
                        <InputItem value={ password } type="password" onChange={ (content)=> handleInputChange(password,setPassword,content) }>密码</InputItem>
                        <InputItem value={ reaptPassword } type="password" onChange={ (content)=> handleInputChange(reaptPassword,setReaptPassword,content) }>确认密码</InputItem>
                        <WhiteSpace />
                            {
                                radioTypes.map(i => (
                                    <RadioItem key={i.value} checked={value === i.value} onChange={() => onChange(i.value,i.label)}>
                                    {i.label}
                                    </RadioItem>
                                ))
                            }
                      </List>  
                    <Button type="primary" style={{marginTop: '0.2rem'}} onClick={ handleRegister }>注册</Button> 
                    <Button type="primary" style={{marginTop: '0.2rem'}} onClick={()=> props.history.push('/login')}>登录</Button> 
                </div>    
           </div>
}