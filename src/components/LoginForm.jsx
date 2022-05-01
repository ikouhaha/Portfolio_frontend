import React from 'react';
import { Button, Form, Input, Checkbox } from 'antd';
import { UserOutlined, LockOutlined ,GoogleOutlined} from '@ant-design/icons';
import 'rc-texty/assets/index.css';

import {  passwordRules, usernameRules } from '../common/latoutAndRules'

import config  from "../config"

import * as http from "../common/http-common"
import { GoogleLogin } from 'react-google-login';

import { Link } from 'react-router-dom';
import { loading ,done} from '../common/utils';

function LoginForm(props) {

  const [form] = Form.useForm();
  
  const onFinish = (values) => {
    (async () => {
      try {
        //ignore confirm field
        const { ...data } = values
        console.log(data)
        let config = {
          auth: {
            username: data.username,
            password: data.password
          }
        }
        delete data.password
        
        loading(props)
        let token = await http.post(props, "/auth", {param:data,requestConfig:config,needLoading:false})
        props.userAction.load({isLogin:true,token:token})
        let res = await http.get(props, "/users/profile",{needLoading:false,token:token})
        //set profile
        props.userAction.load(res)
        done(props)
        props.navigate("/")
        
      } catch (ex) {
        done(props)
        console.dir(ex)
      }

    })()
  }
  const successGoogle = (values) => {
    if (!values) {
      return;
    }
    (async () => {
      try {
        let data = {
          "access_token": values.accessToken
        }
        console.log(values.accessToken)
        loading(props)
        let token = await http.post(props, "/auth/google/token", {param:data,needLoading:false})        
        let res = await http.get(props, "/users/profile",{needLoading:false,token:token})
        //set profile
        props.userAction.load(res)
        done(props)
        props.navigate("/")
        
      } catch (ex) {
        done(props)
        console.dir(ex)
      }

    })()
    

  }
  const failGoogle = (res) => {
    console.log(res)

  }


  return (
         <Form
          form={form}
          id="components-form-demo-normal-login"
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={usernameRules}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={passwordRules}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Link style={{ float: 'right' }} to="/signup">Forgot password</Link>
        
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" >
              Log in
            </Button>

          </Form.Item>
          <Form.Item  >
          <div id="scaffold-src-components-Login-demo-basic">
            Other login methods &nbsp; 
            <GoogleLogin
              autoLoad={false}
              disabledStyle
              clientId={config.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Login with Google"
              scope="profile email"
              render={renderProps => (
                <Button type="secondary" onClick={renderProps.onClick} shape="circle" icon={<GoogleOutlined />} />
              )}
              accessType="offline"
              
              onSuccess={successGoogle}
              onFailure={failGoogle}
              responseType="token"
              cookiePolicy={'single_host_origin'}
            />
            <Link style={{ float: 'right' }} to="/signup" >Register Now</Link>

          </div>
         
        
          </Form.Item>


        </Form>
    
  );

}


export default LoginForm



