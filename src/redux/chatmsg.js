import { reqMsgList } from "../api"
import io from 'socket.io-client'
const Socket = io('ws://localhost:5003');
const MSG_LIST = 'msg_list'  // 获取对应用户的聊天列表
const RECE_MSG = 'rece_msg' // 获取正在聊天收到的信息
const initState = {
    msgList: [], // 存放信息列表
    unread: 0 // 记录没有读取的信息数量
}
// 获取所有的信息列表
export function getMsgList() {
    return async dispatch=> {
        const result = await reqMsgList()
        if(result.status === 200 && result.data.code === 0) {
            dispatch({type: MSG_LIST,data: result.data.data})
        }
    }
}
// 发送的每条消息 存入到数据库中
let bool = true // 用于表示全局事件只监听一次
export function receMsg(data) {
    return async dispatch=> {
        Socket.emit('sendMsg', data) // 发送单个用户的数据给后台
        if(bool) { 
            Socket.on('broadcastMsg',(data)=> {
                dispatch({type: RECE_MSG, data})
            }) // 监听广播 拿到所有用户的消息
            bool = false
        }
    }
}
export default function(state = initState,action) {
    switch(action.type) {
        case MSG_LIST:
            return { ...state, msgList: action.data, unread: action.data.filter(item=> !item.read).length }
        case RECE_MSG:
            return  { ...state, msgList: [...state.msgList, action.data], unread: state.unread + 1}
        default :
            return state    
    }
}