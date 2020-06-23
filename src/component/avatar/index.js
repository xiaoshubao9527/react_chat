import { Grid } from 'antd-mobile';
import React,{ useState } from 'react'
import PropTypes from 'prop-types'
Avatar.propTypes = {
    selectAvatar: PropTypes.func.isRequired
}
export default function Avatar(props) {
    let [avatar,setAvatar] = useState('')
    const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
                        .split(',')
                        .map(item => ({
                            icon: `/images/avatar/${item}.png`,
                            text: item
                        }))
    const selectAvatar = (elm) => {
        setAvatar(avatar = elm.text )
        props.selectAvatar(elm)
    }                   
    return <div className="avatar">
                {
                    avatar? <div style={{marginBottom: '0.1rem'}}>你选择的头像是: <img style={{width: '0.4rem'}} src={`/images/avatar/${avatar}.png`} alt="" /></div>: <div style={{marginBottom: '0.1rem'}}>请选择头像</div>
                }
                <Grid columnNum={5} data={avatarList} onClick={(elm) => selectAvatar(elm)} /> 
           </div>
}