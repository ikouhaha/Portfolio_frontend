import React from 'react';
import { Button, Text, Form, Card, Input } from 'antd';
import QueueAnim from 'rc-queue-anim';
import Texty from 'rc-texty';
import 'rc-texty/assets/index.css';
import { connect } from 'react-redux';
import { formItemLayout, emailRules, passwordRules, confirmRules, usernameRules, tailFormItemLayout } from '../common/latoutAndRules'

import { config } from "../common/config"
import { uuid } from "../common/utils"
import { GoogleLogin } from 'react-google-login';
class LoginForm extends React.Component {

  render() {
    const { ...currentProps } = this.props;
    const onFinish = (values) => {
      //ignore confirm field
      const { confirm, ...data } = values
      console.log(data)
    }

    const responseGoogle = (res,...arg) => {
      console.log(res)
      console.log(arg)
      
    }


    delete currentProps.dataSource;
    delete currentProps.isMobile;
    const children = [
      <div key={uuid()} className="site-card-border-less-wrapper">
        <Card >
          <Form  {...formItemLayout} name="register" onFinish={onFinish} >
            <Form.Item name="email" label="e-mail" rules={emailRules}>
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={passwordRules}>
              <Input.Password />
            </Form.Item>
            <Form.Item name="confirm" label="Confirm Password" rules={confirmRules}>
              <Input.Password />
            </Form.Item>
            <Form.Item name="username" label="Username" rules={usernameRules}>
              <Input />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">Register</Button>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <GoogleLogin
                clientId={config.googleClientID}
                scope="profile email"
                redirectUri={config.baseUrl+'/auth/google/callback'}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                responseType="token"
                cookiePolicy={'single_host_origin'}
              />,
            </Form.Item>

          </Form>

        </Card>
      </div>

    ]



    return (
      <div className='banner3'>
        <QueueAnim

          type={['bottom', 'top']}
          delay={200}
          className='banner3-text-wrapper'
        >
          {children}
        </QueueAnim>
      </div>
    );
  }
}
export default LoginForm;
