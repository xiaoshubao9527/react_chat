import { combineReducers } from 'redux'
import user from './user'
import userList from './userlist'
import chatmsg from './chatmsg'
export default combineReducers({
    user,
    userList,
    chatmsg
})