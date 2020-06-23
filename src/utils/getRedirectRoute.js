export default function({ type,avatar }) { // 根据type和avatar来判断跳转到哪个路由
    // niuren  ===> niureninfo(如果是牛人身份并且没有头像 需要到niureninfo完善信息)  niuren(信息已经完善)
    // boss    ===> bossinfo(如果是boss身份并且没有头像 需要到bossinfo完善信息)   boss（信息已经完善）
    let url = type
    if(!avatar) { //没有头像就去info页面
        url += 'info'
    }
    return url
}