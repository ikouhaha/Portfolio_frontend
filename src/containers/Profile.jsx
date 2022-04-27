import React, { useState ,useEffect} from 'react';
import { Button, Text, Form, Card, Input, Radio } from 'antd';

import { formItemLayout, emailRules, passwordRules, confirmRules, usernameRules, tailFormItemLayout, requireRadioFieldRules, requireTextFieldRules, companyCodeRules } from '../common/latoutAndRules'


import { uuid,loading,done,getAllActionMap,getAllStateMap } from "../common/utils"
import * as http from "../common/http-common"
import { GoogleLogin } from 'react-google-login';

import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { $CombinedState, bindActionCreators } from 'redux'
import * as AppReducer from '../redux/app'


function Profile(props) {


  const [form] = Form.useForm();
  const [user,setUser] = useState({})

  useEffect(() => {
    (async () => {
      try {
          let res = await http.get(props, "/users/profile")
          console.log(res)
          setUser(res)
        
          
      } catch (ex) {

          console.dir(ex)
      }

  })()
  }, [])
  
  const onFinish = (values) => {


    (async () => {
      try {
        //ignore confirm field
        const { confirm, ...data } = values
        
        const res = await http.put(props, "/users/"+user.id, {param:data})
      } catch (ex) {
        
        console.dir(ex)
      }

    })()
  }





  const children = [
    <div key={uuid()} className="site-card-border-less-wrapper" style={{width:'60%'}}>
      <Card >
        <Form form={form} {...formItemLayout} name="profile" onFinish={onFinish}  >
        <Form.Item name="email" initialValue={user.email} label="E-mail" rules={emailRules}  >
            <Input/>
          </Form.Item>
          <Form.Item name="password" label="Password" rules={passwordRules} hidden>
            <Input.Password />
          </Form.Item>
          <Form.Item name="firstName" initialValue={user.firstName} label="First name" >
            <Input />
          </Form.Item>
          <Form.Item name="lastName" initialValue={user.lastName} label="Last Name" >
            <Input />
          </Form.Item>
          <Form.Item name="username" initialValue={user.username} label="User Name" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="role" initialValue={user.role} label="Choose Role" rules={requireRadioFieldRules} >
            <Radio.Group  buttonStyle="solid" >
              <Radio.Button value="user">Normal User</Radio.Button>
              <Radio.Button value="staff">Staff</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="companyCode" initialValue={user.companyCode} label="Company Code" rules={companyCodeRules} >
            <Input />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">Update</Button>
          </Form.Item>
       
        </Form>

      </Card>
    </div>

  ]



  return (
    <div className='banner3 banner3-form-wrapper' style={{"textAlign":"left"}}>
     
        {children}
      
    </div>
  );

}

const output = (props) =>{
  const navigation = useNavigate();
  return <Profile {...props} navigate={navigation} />
}
export default connect(getAllStateMap, getAllActionMap)(output)


