
// actions-type
import { reqUserList } from '../api'
import { Toast } from 'antd-mobile'
const USER_LIST = 'user_list'
// action
export function getUserList(data) {
    return async dispatch=> {
        const result = await reqUserList(data)
        if(result.status === 200 && result.data.code === 0) {
            Toast.success(result.data.msg)
            dispatch({type: USER_LIST,data: result.data.data})
        }else {
            Toast.fail(result.data.msg)
        }
    }
}
export default function(state=[],action) {
    switch(action.type) {
        case USER_LIST :
            state = []
            return [...state,...action.data]
        default :
            return state    
    }
}