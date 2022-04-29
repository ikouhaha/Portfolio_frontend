import axios from 'axios'
import { message } from "antd"
import { loading, done, getAccessToken } from './utils'

const http = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL+process.env.REACT_APP_API_VERSION_LINK,
    headers: {
        "Content-type": "application/json; charset=utf-8"
    },
    responseType: 'json',

})

let messageError = (ex, props) => {
    
    const { navigate } = props
    if (ex.response && ex.response.status && ex.response.status == 401) {
        if(ex.response.statusText){
            message.error(ex.response.statusText)
        }
        if (props.userAction) {
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
    else if (ex.response && ex.response.data) {
        message.error(ex.response.data)
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

export const get = async (props, endpoint, { successMsg,needLoading=true } = {}) => {
    //add auth header automatically

    let res = {};

    try {
        if(needLoading){
            loading(props)
        }
        
        if (getAccessToken()) {
            http.defaults.headers.common["Authorization"] = getAccessToken()
        }else{
            delete http.defaults.headers.common["Authorization"] 
        }
        // console.log(successMsg)
        let response = await http.get(endpoint)

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
        if (needLoading) {
            done(props)
        }
        

    }

}

export const post = async (props, endpoint,
    { successMsg = null, param, requestConfig = {},needLoading=true } = {}) => {
    let res = {};

    try {

        let response
        if (needLoading) {
        loading(props)
        }
        if (getAccessToken() && !requestConfig.auth) {
            http.defaults.headers.common["Authorization"] = getAccessToken()
        }else {
            delete http.defaults.headers.common["Authorization"] 
        }
        response = await http.post(endpoint, param, requestConfig)
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
        if (needLoading) {
        done(props)
        }

    }

}

export const put = async (props, endpoint,
    { successMsg = null, param, requestConfig = {}, needLoading = true } = {}) => {
    let res = {};

    try {

        let response
        if (needLoading) {
            loading(props)
        }

        if (getAccessToken() && !requestConfig.auth) {
            http.defaults.headers.common["Authorization"] = getAccessToken()
        }else {
            delete http.defaults.headers.common["Authorization"] 
        }

        response = await http.put(endpoint, param, requestConfig)
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

        if (needLoading) {
            done(props)
        }
    }

} 

export const del = async (props, endpoint,
    { successMsg = null, param, requestConfig = {}, needLoading = true } = {}) => {
    let res = {};

    try {

        let response
        if (needLoading) {
            loading(props)
        }

        if (getAccessToken() && !requestConfig.auth) {
            http.defaults.headers.common["Authorization"] = getAccessToken()
        }else {
            delete http.defaults.headers.common["Authorization"] 
        }

        response = await http.delete(endpoint, requestConfig)
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

        if (needLoading) {
            done(props)
        }
    }

} 