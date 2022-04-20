import axios from 'axios'
import { config } from './config'
import { message } from "antd"
import { loading, done } from './utils'

const http = axios.create({
    baseURL: config.baseUrl,
    headers: {
        "Content-type": "application/json; charset=utf-8",

    },
    responseType: 'json',
    


})

let messageError = (ex, props) => {
    const { navigate } = props
    if (ex.response && ex.response.status && ex.response.status == 401) {
        if(props.userAction){
            props.userAction.reset()
        }
        navigate("/signin")
    } else if (ex.response && ex.response.status && ex.response.status == 404) {
        navigate("/404")
    }
    else if (ex.response && ex.response.data && ex.response.data.stack) {
        message.error(ex.response.data.stack)
    }
    else if (ex.response && ex.response.data && ex.response.data.message) {
        message.error(ex.response.data.message)
    }
    else if (ex.response && ex.response.message) {
        message.error(ex.response.message)
    } else if (ex.message) {
        message.error(ex.message)
    } else if (ex) {
        message.error(ex)
    }
}

let messageSucceess = (msg) => {
    if (msg) {
        message.success(msg)
    }
}

export const get = async (props, endpoint, { successMsg } = {}) => {
    //add auth header automatically
    
    let res = {};
    
    try {
        let header = {}
        if (props.user && props.user.token) {
            let authObj = {
                "Authorization": props.user.token
            }
            header = { ...header, ...authObj }
        }
        console.log(header)
        loading(props)
        // console.log(successMsg)
        let response = await http.get(endpoint,{headers:{...header}})

        const { data } = response
        res = data

        messageSucceess(successMsg)
        //console.error(response)




        return res

    } catch (ex) {
        // console.log(ex.response.status)
        messageError(ex, props)
        throw ex
    } finally {
        setTimeout(() => {
            done(props)
        }, 500)

    }

}

export const post = async (props, endpoint,
    { successMsg = null, param, requestConfig } = {}) => {
    let res = {};
    
    try {
        let header = {}
        let response
        loading(props)
        if (props.user && props.user.token) {
            let authObj = {
                "auth": props.user.token
            }
            header = { ...header, ...authObj }
        }
        if (requestConfig) {
            header = { ...header, ...requestConfig }

        }

        console.log(header)
        response = await http.post(endpoint, param, header)
        //console.error(response)
        const { data } = response
        res = data
        messageSucceess(successMsg)


        return res
    } catch (ex) {
        // console.log(ex.response.status)
        messageError(ex, props)
        throw ex
    } finally {
        setTimeout(() => {
            done(props)
        }, 500)
    }

} 