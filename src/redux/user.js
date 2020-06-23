import { reqLogin, reqPerfectInfo } from "../api"
import { Toast } from 'antd-mobile'
import getRedirectRoute from '../utils/getRedirectRoute'
// actions-type
const LOGIN_SUCCESS = 'login_success' // 登录成功修改数据
const LOGIN_FAILURE = 'login_failure' // 登录失败
const SUBMIT_USERINFO = 'submit_userinfo' // userinfo 访问每个路由页面都根据cookie请求最新的用户数据
const SUBMIT_PERFECTINFO = 'submit_perfectInfo' // bossinfo或者niureninfo页面提交完善的信息如头像等信息
const LOGOUT = 'logout' // 退出登录
// action
const loginSuccess = (data) => ({ type: LOGIN_SUCCESS,data }) 
const loginFailure = (data) => ({ type: LOGIN_FAILURE,data }) // 登录失败
const perfectInfo = (data) => ({ type: SUBMIT_PERFECTINFO,data }) // 完善用户信息头像等
export const submitUserInfoToRedux = (data) => ({ type: SUBMIT_USERINFO,data }) // 每次进入路由都要进行验证cookie返回最新的用户信息到redux
// 退出登录清空cookie 并且把redux中的用户信息清空变成初始值
export const logout = () => ({ type: LOGOUT })

export function login(data){ // 登录提交用户信息到redux
    return async dispatch => {
        const result = await reqLogin(data)
        if(result.status === 200 && result.data.code === 0) {
            Toast.success(result.data.msg)
            dispatch(loginSuccess(result.data.data))
        }else {
            Toast.fail(result.data.msg)
            dispatch(loginFailure(result.data))
        }
    }
}
// 到bossinfo 或者niureninfo完善头像等信息
export function submitPerfectInfo(data) {
    return async dispatch => {
        const result = await reqPerfectInfo(data)
        if(result.status === 200 && result.data.code === 0) {
            Toast.success(result.data.msg)
            dispatch(perfectInfo(result.data.data))
        }else {
            Toast.fail(result.data.msg)
        }
    }
}
// reducer
const initUserInfo = {
    _id: '',
    username: '',
    type: '',
    redirectTo: '', // 登录完成根据type和acatar来判断后重定向到那个路由
    avatar: '', // 用户头像
    title: '', // 招聘岗位或者求职岗位
    desc: '', // 个人简介或者职位要求
    company: '', // 公司名称
    money: '', // 职位薪资
}
export default function user(state = initUserInfo, action) {
    switch(action.type) {
        case LOGIN_SUCCESS :
            return {...state,...action.data,redirectTo: getRedirectRoute(action.data)}  // 登录成功则设置对应的redirect来跳转
        case LOGIN_FAILURE :
            return { ...initUserInfo }
        case SUBMIT_USERINFO :
            return { ...state,...action.data,redirectTo:'' }
        case SUBMIT_PERFECTINFO :
            return {...state,...action.data,redirectTo: getRedirectRoute(action.data)}  // 完善信息成功则设置对应的redirect来跳转
        case LOGOUT :             
            return { ...initUserInfo,redirectTo: '/login' } // 退出登录则设置对应的redirect来跳转到login     
        default :
            return state    
    }
}