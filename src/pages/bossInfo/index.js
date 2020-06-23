import Avatar from '../../component/avatar'
import { NavBar,List,WhiteSpace,InputItem,Button,TextareaItem } from 'antd-mobile';
import React,{ useState } from 'react'
import { connect } from 'react-redux'
import { submitPerfectInfo } from '../../redux/user'
import errorMsg from '../../utils/errorMsg'
import { Redirect } from 'react-router-dom';
function BossInfo(props) {
    let [avatar,setAvatar] = useState('')
    let [company,setCompany] = useState('')
    let [money,setMoney] = useState('')
    let [title,setTitle] = useState('')
    let [desc,setDesc] = useState('')
    // 点击navBar的返回键
    // const back = () => {
    //     Cookies.remove('_id');
    //     props.history.replace('/login')
    // }
    // 选择头像
    const selectAvatar = (avatar) => {
        setAvatar(avatar = avatar.text )
    }
    // 处理input框的信息
    const handleInputChange = (v,set,oldValue) => {
        set(v = oldValue)   
    }
    // 点击提交按钮完善boss信息
    const perfectInfo = () => {
        switch('') {
            case avatar:
                return errorMsg('用户头像不为空')
            case company:
                return errorMsg('公司名称不为空')
            case desc:
                return errorMsg('岗位描述不为空')
            case money:
                return errorMsg('岗位薪资不为空')
            case title:
                return errorMsg('招聘岗位不为空')
            default :
                break
        }
        props.submitPerfectInfo({avatar,company,money,title,desc})
    }
    return <div className="bossinfo" > 
                { props.userinfo.redirectTo ? <Redirect to={ props.userinfo.redirectTo } /> : null}
                <NavBar
                    mode="dark"
                    >Boss完善信息页面</NavBar>
                <Avatar selectAvatar={ selectAvatar } />
                <List>
                    <WhiteSpace />
                    <InputItem value={ company } onChange={ (content)=> handleInputChange(company,setCompany,content) }>公司名称</InputItem>
                    <InputItem value={ title } onChange={ (content)=> handleInputChange(title,setTitle,content) }>招聘岗位</InputItem>
                    <InputItem value={ money } onChange={ (content)=> handleInputChange(money,setMoney,content) }>岗位薪资</InputItem>
                    <TextareaItem 
                        autoHeight 
                        value={ desc } 
                        onChange={ (content)=> handleInputChange(desc,setDesc,content) } 
                        rows={4} 
                        title="岗位描述"
                    ></TextareaItem>
                </List>  
                <Button type="primary" style={{marginTop: '0.14rem'}} onClick={ perfectInfo }>提交</Button> 
            </div>
}
export default connect(
    state=> ({userinfo: state.user}),
    { submitPerfectInfo }
)(BossInfo)