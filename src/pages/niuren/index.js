import React from 'react'
import UserList from '../../component/userList'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/userlist'
let bool = true
function Niuren(props) {
    if(props.userInfo.type && bool) {
        props.getUserList({type: 'boss'})
        bool = false
    }
    return props.userList.length > 0 && props.userList.map(user => {
             return <UserList userItem={user} key={user._id} />
        })
}
export default connect(
    state =>({userInfo: state.user,userList: state.userList}),
    { getUserList }
)(Niuren)