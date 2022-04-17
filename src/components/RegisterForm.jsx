import React, { useState } from 'react';
import { Button, Text, Form, Card, Input, Radio } from 'antd';

import 'rc-texty/assets/index.css';

import { formItemLayout, emailRules, passwordRules, confirmRules, usernameRules, tailFormItemLayout, requireRadioFieldRules,requireTextFieldRules,companyCodeRules } from '../common/latoutAndRules'

import { config } from "../common/config"
import { uuid } from "../common/utils"
import { GoogleLogin } from 'react-google-login';




function RegisterForm(props) {
  React.useEffect(() => {


  }, []);
  
  const [role, setRole] = useState("user")
  const [fields, setFields] = useState([])
  const [form] = Form.useForm();

  const onFinish = (values) => {
    //ignore confirm field
    const { confirm, ...data } = values
    console.log(data)
  }
  const successGoogle = (res) => {
    console.log(res)

    let profile = { ...res.profileObj }
    let newObj = {
      "email":profile.email,
      "lastName":profile.familyName,
      "firstName":profile.givenName,
      "username":profile.email.split('@')[0],
    }
    Object.keys(newObj).forEach(key=>{
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

  const handleFormValueChange = (values) => {
    console.log(values)
    if (values["role"]) {
      if (values["role"] == "staff") {
        
        //setRole(values["role"])
      } else {
        //setRole(values["role"])
      }
    }
  }
  

  setFormValue("role", role)
  const children = [
    <div key={uuid()} className="site-card-border-less-wrapper">
      <Card >
        {/* <Button onClick={test}>test</Button> */}
        <Form form={form} {...formItemLayout} name="register" onFinish={onFinish} onValuesChange={handleFormValueChange} >
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
          <Form.Item name="role" label="Choose Role" rules={requireRadioFieldRules}>
            <Radio.Group style={{ display: 'table' }} buttonStyle="solid">
              <Radio.Button value="user">Normal User</Radio.Button>
              <Radio.Button value="staff">Staff</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item   name="companyCode" label="Company Code"  rules={companyCodeRules}>
            <Input />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">Register</Button>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <GoogleLogin
              clientId={config.googleClientID}
              scope="profile email"

              redirectUri={config.baseUrl + '/auth/google/callback'}
              onSuccess={successGoogle}
              onFailure={failGoogle}
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
      <div
        className='banner3-text-wrapper'
      >
        {children}
      </div>
    </div>
  );

}

export default RegisterForm;
