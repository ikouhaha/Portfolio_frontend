import React, { useState } from 'react';
import { Button, Text, Form, Card, Input, Radio, Checkbox } from 'antd';
import { UserOutlined, LockOutlined ,GoogleOutlined} from '@ant-design/icons';
import 'rc-texty/assets/index.css';

import { formItemLayout, emailRules, passwordRules, confirmRules, usernameRules, tailFormItemLayout, requireRadioFieldRules, requireTextFieldRules, companyCodeRules } from '../common/latoutAndRules'

import { config } from "../common/config"
import { uuid,loading,done,getAllStateMap,getAllActionMap} from "../common/utils"
import * as http from "../common/http-common"
import { GoogleLogin } from 'react-google-login';

import { useNavigate, Link, unstable_HistoryRouter } from 'react-router-dom';
import { connect } from 'react-redux';



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
        let res = await http.post(props, "/auth", data, config)
        //props.userAction.login(res.user)
        props.navigate("/")
        done(props)
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
        let res = await http.post(props, "/auth/google/token", data)
        //props.userAction.login(res.user)
        props.navigate("/")
        done(props)
      } catch (ex) {
        done(props)
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




  const children = [
    <div key={uuid()} className="site-card-border-less-wrapper">
      <Card >
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
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
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
              clientId={config.googleClientID}
              buttonText="Login with Google"
              scope="profile email"
              render={renderProps => (
                <Button type="secondary" onClick={renderProps.onClick} shape="circle" icon={<GoogleOutlined />} />
              )}
              accessType="offline"
              redirectUri={config.baseUrl + '/auth/google/callback'}
              onSuccess={successGoogle}
              onFailure={failGoogle}
              responseType="token"
              cookiePolicy={'single_host_origin'}
            />
            <a style={{ float: 'right' }} href="">
              Register Now
            </a>
          </div>
         
        
          </Form.Item>


        </Form>

      </Card>
    </div>

  ]



  return (
    <div className='banner3' style={{ "textAlign": "left" }}>
      <div
        className='banner3-text-wrapper'
        style={{ width: "30%" }}
      >
        {children}
      </div>
    </div>
  );

}

const output = (props) =>{
  const navigation = useNavigate();
  return <LoginForm {...props} navigate={navigation} />
}
export default connect(getAllStateMap, getAllActionMap)(output)



