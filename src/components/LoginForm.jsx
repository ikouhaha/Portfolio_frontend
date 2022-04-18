import React, { useState } from 'react';
import { Button, Text, Form, Card, Input, Radio, Checkbox } from 'antd';
import { UserOutlined, LockOutlined ,GoogleOutlined} from '@ant-design/icons';
import 'rc-texty/assets/index.css';

import { formItemLayout, emailRules, passwordRules, confirmRules, usernameRules, tailFormItemLayout, requireRadioFieldRules, requireTextFieldRules, companyCodeRules } from '../common/latoutAndRules'

import { config } from "../common/config"
import { uuid } from "../common/utils"
import * as http from "../common/http-common"
import { GoogleLogin } from 'react-google-login';

import { useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as AppReducer from '../redux/app'
import * as UserReducer from '../redux/user'



const mapDispatchToProps = dispatch => ({
  //⑤ Bindactioncreators simplify dispatch
  appAction: bindActionCreators(AppReducer, dispatch),
  userAction:bindActionCreators(UserReducer,dispatch)
})

const mapStateToProps = state => ({ app: state.App ,user:state.User});

function LoginForm(props) {

  React.useEffect(() => {
    console.log(props)

  }, []);

  const [form] = Form.useForm();
  const navigate = useNavigate();


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

        props.appAction.setLoading(true)
        const res = await http.post(navigate, "/auth", data, config)
        console.warn(res)
        props.userAction.login(res.user)
        props.appAction.setLoading(false)
        //navigate("/")
      } catch (ex) {
        console.dir(ex)
      }

    })()
  }
  const successGoogle = (res) => {
    console.log(res)
    if (!res) {
      return;
    }
    let profile = { ...res.profileObj }

    let newObj = {
      "access_token": profile.access_token
    }
    Object.keys(newObj).forEach(key => {
      setFormValue(key, newObj[key])
    })

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

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
