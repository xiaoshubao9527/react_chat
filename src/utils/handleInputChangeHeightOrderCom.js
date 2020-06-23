import React,{ useState } from 'react'
export default function (Com) {
    return function(props){
        let [username, setUsername] = useState('')
        let [password, setPassword] = useState('')
        const handleInputChange = (v,set,value) => {
            set(v = value)
        }
        const obj = {
            username,
            setUsername,
            password,
            setPassword
        }
        return <Com {...obj} handleInputChange = { handleInputChange } {...props} />
    }
}