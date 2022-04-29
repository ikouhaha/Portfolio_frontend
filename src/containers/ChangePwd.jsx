import React, { useState, useEffect } from 'react';
import { Button, Text, Form, Card, Input, Radio } from 'antd';

import { formItemLayout, emailRules, passwordRules, confirmRules, usernameRules, tailFormItemLayout, requireRadioFieldRules, requireTextFieldRules, companyCodeRules } from '../common/latoutAndRules'


import { uuid, loading, done, getAllActionMap, getAllStateMap } from "../common/utils"
import * as http from "../common/http-common"
import { GoogleLogin } from 'react-google-login';

import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { $CombinedState, bindActionCreators } from 'redux'
import * as AppReducer from '../redux/app'


function ChangePwd(props) {


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
        //ignore confirm field
        const { confirm, ...data } = values
        loading(props)
        const res = await http.put(props, "/users/p/" + user.id, { param: data, needLoading: false, successMsg: "update successfully" })
        await loadProfile(false)
        done(props)
      } catch (ex) {
        done(props)
        console.dir(ex)
      }

    })()
  }


 




  return (
    <div className='banner3 banner3-form-wrapper' style={{ "textAlign": "left" }}>

      <div key={uuid()} className="site-card-border-less-wrapper" style={{ width: '60%' }}>
        <Card >
          <Form form={form} {...formItemLayout} name="changePwd" onFinish={onFinish}  >
          <Form.Item name="username" initialValue={user.username} label="User name" >
            <Input disabled />
          </Form.Item>
            <Form.Item name="password" label="Password" rules={passwordRules}>
              <Input.Password />
            </Form.Item>
            <Form.Item name="confirm" label="Confirm Password" rules={confirmRules}>
              <Input.Password />
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
  return <ChangePwd {...props} navigate={navigation} />
}
export default connect(getAllStateMap, getAllActionMap)(output)


