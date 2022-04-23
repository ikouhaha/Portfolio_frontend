import React, { useState } from 'react';
import { Button, Text, Form, Card, Input, Radio, Checkbox } from 'antd';
import { UserOutlined, LockOutlined ,GoogleOutlined} from '@ant-design/icons';
import 'rc-texty/assets/index.css';

import { formItemLayout, emailRules, passwordRules, confirmRules, usernameRules, tailFormItemLayout, requireRadioFieldRules, requireTextFieldRules, companyCodeRules } from '../common/latoutAndRules'

import { config } from "../common/config"

import * as http from "../common/http-common"
import { GoogleLogin } from 'react-google-login';

import { useNavigate, Link, unstable_HistoryRouter } from 'react-router-dom';

function LoginForm(props) {

  const [form] = Form.useForm();
  console.log(process.env)
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
        
        
        let res = await http.post(props, "/auth", {param:data,requestConfig:config})
        props.userAction.load(res)
        
        
        props.navigate("/")
        
      } catch (ex) {
        
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
        
        let res = await http.post(props, "/auth/google/token", {param:data})
        
        props.userAction.load(res)
        props.navigate("/")
        
      } catch (ex) {
        
        console.dir(ex)
      }

    })()
    

  }
  const failGoogle = (res) => {
    console.log(res)

  }

  const setFormValue = (name, value) => {
    form.setFieldsValue({
      [name]: value,
    })
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

            <a className="login-form-forgot" href="" style={{ float: "right" }}>
              Forgot password
            </a>
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
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
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



