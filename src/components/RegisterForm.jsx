import React, { useState } from 'react';
import { Button, Text, Form, Card, Input, Radio } from 'antd';

import 'rc-texty/assets/index.css';

import { formItemLayout, emailRules, passwordRules, confirmRules, usernameRules, tailFormItemLayout, requireRadioFieldRules, requireTextFieldRules, companyCodeRules } from '../common/latoutAndRules'


import { uuid,loading,done,getAllActionMap,getAllStateMap } from "../common/utils"
import * as http from "../common/http-common"
import { GoogleLogin } from 'react-google-login';

import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as AppReducer from '../redux/app'


function RegisterForm(props) {


  const [form] = Form.useForm();
  


  const onFinish = (values) => {


    (async () => {
      try {
        //ignore confirm field
        const { confirm, ...data } = values
        
        const res = await http.post(props, "/users", {param:data})
        
        props.navigate("/signin")

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
      "email": profile.email,
      "lastName": profile.familyName,
      "firstName": profile.givenName,
      "username": profile.email.split('@')[0],
      "avatarUrl": profile.imageUrl,
      "googleId": profile.googleId
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
        <Form form={form} {...formItemLayout} name="register" onFinish={onFinish}  >
          <Form.Item name="email" label="e-mail" rules={emailRules}  >
            <Input name="email" />
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
          <Form.Item name="firstName" label="First name" >
            <Input />
          </Form.Item>
          <Form.Item name="lastName" label="Last Name" >
            <Input />
          </Form.Item>
          <Form.Item name="role" initialValue={"user"} label="Choose Role" rules={requireRadioFieldRules}>
            <Radio.Group  buttonStyle="solid">
              <Radio.Button value="user">Normal User</Radio.Button>
              <Radio.Button value="staff">Staff</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="companyCode" label="Company Code" rules={companyCodeRules}>
            <Input />
          </Form.Item>
          <Form.Item name="avatarUrl" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="googleId" hidden>
            <Input />
          </Form.Item>
          <Form.Item label="Other">
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Register with Google"
              scope="profile email"
              accessType="offline"
              redirectUri={process.env.BASE_LINK + '/auth/google/callback'}
              onSuccess={successGoogle}
              onFailure={failGoogle}
              responseType="token"
              cookiePolicy={'single_host_origin'}
            />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">Register</Button>
          </Form.Item>
       
        </Form>

      </Card>
    </div>

  ]



  return (
    <div className='banner3' style={{"textAlign":"left"}}>
      <div
        className='banner3-text-wrapper'
      >
        {children}
      </div>
    </div>
  );

}

const output = (props) =>{
  const navigation = useNavigate();
  return <RegisterForm {...props} navigate={navigation} />
}
export default connect(getAllStateMap, getAllActionMap)(output)


