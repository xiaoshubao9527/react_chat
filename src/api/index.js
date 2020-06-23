import api from './base'

// 注册
export const reqRegister = (data)=> api.post('/user/register', data)
// 登录
export const reqLogin = (data)=> api.post('/user/login', data)
// 请求userinfo接口发送cookie验证身份
export const reqUserInfo = ()=> api.get('/user/info')
// 完善用户信息 如头像等信息
export const reqPerfectInfo = (data)=> api.post('/user/perfectInfo', data)
// 请求用户列表（boss或者是牛人）
export const reqUserList = (data)=> api.get('/user/list', data)




// 用户信息
export const reqMsgList = ()=> api.get('/chat/msgList')