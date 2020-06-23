import React, { useEffect } from 'react'
import { TabBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { getMsgList,receMsg } from '../../redux/chatmsg'
import { connect } from 'react-redux'
TabBarLink.propTypes = {
    tabBarList: PropTypes.array.isRequired
}
function TabBarLink(props) {
    const pathname = props.location.pathname
    const filterTabBarList = props.tabBarList.filter(v=> !v.hide)
    useEffect(()=> {
        props.getMsgList()
    },[])
    return  <div style={{position: 'fixed',bottom: 0,left: 0,right: 0}}>
                <TabBar tabBarPosition="bottom">
                {
                    filterTabBarList.length > 0 && filterTabBarList.map(item => {
                        return <TabBar.Item
                                    badge={item.path === '/message' ? props.chatmsg.unread : null}
                                    title={item.title}
                                    key={item.path}
                                    icon={<div style={{
                                        width: '22px',
                                        height: '22px',
                                        background: `url(/images/tabBar/${item.icon}.png) center center /  21px 21px no-repeat` }}
                                    />
                                    }
                                    selectedIcon={<div style={{
                                        width: '22px',
                                        height: '22px',
                                        background: `url(/images/tabBar/${item.selectedIcon}.png) center center /  21px 21px no-repeat` }}
                                    />
                                    }
                                    selected={pathname === item.path}
                                    onPress={() => {
                                        props.history.push(item.path)
                                    }}
                                    >
                                </TabBar.Item>
                    })
                }
                </TabBar>  
            </div>
       
}
export default connect(
    state=> ({
        chatmsg: state.chatmsg,
        user: state.user
    }),
    { getMsgList,receMsg }
)(withRouter(TabBarLink))