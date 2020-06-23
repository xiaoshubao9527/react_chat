import React from 'react'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
UserList.propTypes = {
    userItem: PropTypes.object.isRequired
}
function UserList(props) {
    const handleClick = ()=> {
        props.history.push({
            pathname: `/chat/${props.userItem._id}`,
            state: {
                username: props.userItem.username
            }
        })
    }
    return <WingBlank size="lg">
            <WhiteSpace size="lg" />
            <Card onClick={handleClick}>
                <Card.Header
                    title={props.userItem.username}
                    thumb={props.userItem.avatar ? `/images/avatar/${props.userItem.avatar}.png` : ''}
                    extra={<span>{props.userItem.title}</span>}
                />
                <Card.Body>
                    {
                        props.userItem.company ?
                        <div>
                            <p>公司名称：{props.userItem.company}</p>
                            <p>招聘薪资：{props.userItem.money}</p>
                        </div>
                        : null     
                    }
                    <div>
                        {
                            props.userItem.desc && props.userItem.desc.split('\n')
                                .map(item=> <div key={item}>{item}</div>)            
                        }
                    </div>
                </Card.Body>
            </Card>
            <WhiteSpace size="lg" />
        </WingBlank>
}
export default withRouter(UserList) 