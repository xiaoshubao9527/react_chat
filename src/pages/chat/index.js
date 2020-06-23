import React,{ useState,useEffect } from 'react'
import { List, InputItem, NavBar, Icon } from 'antd-mobile'
import { getMsgList,receMsg } from '../../redux/chatmsg'
import './index.scss'
import { connect } from 'react-redux'

function Chat(props) {
    let [value,setValue] = useState('')
    const msgList = props.chatmsg.msgList
    const handleInputChange = (newValue)=> {
        setValue(newValue)
    }
    console.log(props)
    const sendMsg = ()=> {
        const from  = props.user._id  // 发送消息的人 当前登录的人 我
        const to = props.match.params.user // 收到消息的人 对方 你
        props.receMsg({ from,to,value })
        setValue(value = '')
    }
    useEffect(()=> {
        props.getMsgList()
    },[])
    return <div className="chat">
                <NavBar
                mode="dark"
                icon={<Icon type="left" />}
                onLeftClick={() => props.history.go(-1)}
                >{props.location.state.username}</NavBar>
                <div className="content">
                    {
                        msgList.length > 0 && msgList.map((v)=> {
                            if(props.user._id === v.from) {
                                return <div className="right-chat" key={v._id}>
                                            <div>   
                                                {/* <img src={`/images/avatar/${props.user.avatar}.png`} alt="" /> */}
                                                <p>我发的：{v.content}</p> 
                                            </div>   
                                       </div>
                            }
                            return <div className="left-chat" key={v._id}>
                                            <div>
                                                <p>对方发的：{v.content}</p>    
                                                {/* <img src={`/images/avatar/${props.user.avatar}.png`} alt="" /> */}
                                            </div>
                                       </div>
                        })
                    }
                </div>
                <div className="send-msg">
                    <List>
                        <InputItem 
                            value={ value } 
                            onChange={ handleInputChange } 
                            placeholder="请输入发送内容" 
                            extra="发送"
                            onExtraClick={ sendMsg }
                        ></InputItem>
                    </List>
                </div>
           </div>
}
export default connect(
    state=> ({
        chatmsg: state.chatmsg,
        user: state.user
    }),
    { getMsgList,receMsg }
)(Chat)