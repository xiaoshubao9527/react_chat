import React from 'react'
import { Result, List, WhiteSpace,Button,Modal } from 'antd-mobile'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { logout } from '../../redux/user'
import { Redirect } from 'react-router-dom'
const alert = Modal.alert;
function Me(props) {

    let userInfo = props.userInfo
    const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" width='50' style={{width: '1.4rem',height: '1.2rem'}} />;
    const Item = List.Item
    const Brief = Item.Brief;
    return <div>
                { userInfo.redirectTo ? <Redirect to={userInfo.redirectTo} /> : null }
                <Result
                    img={userInfo.avatar ? myImg(`/images/avatar/${userInfo.avatar}.png`) : null}
                    title={userInfo.username}
        message={<div>{userInfo.title}</div>}
                    />
                <WhiteSpace />
                <List className="my-list">
                    <Item wrap multipleLine onClick={() => {}}>
                    {userInfo.type === 'boss' ? '岗位描述' : '个人简介'} <Brief>
                        {
                            userInfo.desc.split('\n')
                                    .map(item => <p key={item}>{item}</p>)
                        }
                    </Brief>
                    </Item>
                    {
                        userInfo.money ? (
                            <div>
                                <Item wrap multipleLine>
                        公司名称 <Brief>{userInfo.company}</Brief>
                                </Item>
                                <Item wrap multipleLine>
                        招聘薪资 <Brief>{userInfo.money}</Brief>
                                </Item>
                            </div>
                        ): null
                    }
                    <Item wrap multipleLine
                        onClick={() =>
                          alert('退出登录', 'Are you sure???', [
                            { text: '取消'},
                            { text: '确定', onPress: () => {
                                Cookies.remove('_id') // 清楚cookie
                                props.logout() // 并且清空redux中的用户信息
                                // window.location.href = window.location.href
                            }},
                          ])
                        }
                    >
                        退出登录
                    </Item>
                </List>    
            </div>
        } 
export default connect(
    state=> ({userInfo: state.user}),
    { logout }
)(Me)