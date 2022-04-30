import React, { useState, useEffect } from 'react';
import { Button, Form, Card, Input, Radio } from 'antd';

import { formItemLayout, emailRules, tailFormItemLayout, requireRadioFieldRules, companyCodeRules } from '../common/latoutAndRules'


import { uuid, loading, done, getAllActionMap, getAllStateMap,getAccessToken } from "../common/utils"
import * as http from "../common/http-common"
import { GoogleLogin } from 'react-google-login';

import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import config from '../config'

function Profile(props) {


  const [form] = Form.useForm();
  const [user, setUser] = useState({})

  const loadProfile = async (needLoading = true) => {
    try {      
      let res = await http.get(props, "/users/profile", { needLoading })
      setUser(res)
    } catch (ex) {
      console.dir(ex)
    }
  }
  useEffect(() => {
    loadProfile()
  }, [])

  const onFinish = (values) => {


    (async () => {
      try {
        console.log(values)
        //ignore confirm field
        const { username,confirm, ...data } = values
        loading(props)
        await http.put(props, "/users/" + user.id, { param: data, needLoading: false,successMsg:"update successfully ! Please login again" })
        await loadProfile(false)
        done(props)
      } catch (ex) {
        done(props)
        console.dir(ex)
      }

    })()
  }
  const successGoogle = (res) => {

   
    let profile = { ...res.profileObj }

    let data = {
      "avatarUrl": profile.imageUrl,
      "googleId": profile.googleId
    }
    
    http.put(props, "/users/connect/" + user.id, { param: data,successMsg:"connect google successfully",needLoading:false })

  }
  const failGoogle = (res) => {
    console.log(res)

  }

 



  return (
    <div className='banner3 banner3-form-wrapper' style={{ "textAlign": "left" }}>

       <div key={uuid()} className="site-card-border-less-wrapper" style={{ width: '60%' }}>
      <Card >
        <Form form={form} {...formItemLayout} name="profile" onFinish={onFinish}  >
        <Form.Item name="username" initialValue={user.username} label="User name" >
            <Input disabled />
          </Form.Item>
          <Form.Item name="email" initialValue={user.email}  label="E-mail" rules={emailRules}  >
            <Input />
          </Form.Item>
          <Form.Item name="firstName" initialValue={user.firstName} label="First name" >
            <Input />
          </Form.Item>
          <Form.Item name="lastName" initialValue={user.lastName} label="Last Name" >
            <Input />
          </Form.Item>
          <Form.Item name="role" initialValue={user.role} label="Choose Role" rules={requireRadioFieldRules} >
            <Radio.Group buttonStyle="solid" >
              <Radio.Button value="user">Normal User</Radio.Button>
              <Radio.Button value="staff">Staff</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="companyCode" initialValue={user.companyCode} label="Company Code" rules={companyCodeRules} >
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
              clientId={config.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Continue with Google"
              scope="profile email"
              accessType="offline"

              onSuccess={successGoogle}
              onFailure={failGoogle}
              responseType="token"
              cookiePolicy={'single_host_origin'}
            />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">Update</Button>
          </Form.Item>

        </Form>

      </Card>
    </div>

    </div>
  );

}

const output = (props) => {
  const navigation = useNavigate();
  return <Profile {...props} navigate={navigation} />
}
export default connect(getAllStateMap, getAllActionMap)(output)


