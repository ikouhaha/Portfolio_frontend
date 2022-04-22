

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row, Spin, Button, Modal, Form, Input, Select, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
//import articles from './data/articles.json'

import { formItem2Layout, emailRules, passwordRules, requireUploadFieldRules, usernameRules, tailFormItemLayout, requireRadioFieldRules, requireTextFieldRules, companyCodeRules, requireSelectFieldRules } from '../common/latoutAndRules'

import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { uuid,toBase64, getAllActionMap, getAllStateMap } from '../common/utils';
import { config } from '../common/config';
import { connect } from 'react-redux';
const { Option } = Select;



function DogModalForm(props) {

    const dog = { ...props.dog }
    const breeds = [...props.breeds||[]]
    if(!dog.id){
        return (<></>)
    }
    const [fileList, setFileList] = useState([
        {
          uid: '1',
          name: 'image.png',
          status: 'done',
          url: config.baseUrl+'/dogs/image/'+dog.id,
        },
      ]);

    const [form] = Form.useForm();
    const formid = uuid()
    React.useEffect(() => {
        // props.action.load({isFavourite:true})
    }, []);

    
    

    const setBase64Field = async (file) => {

        let base64 = await toBase64(file)
        console.log(base64)
        form.setFieldsValue({ "imageBase64": base64 })
    }

    const beforeUpload =  async (file) => {

        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }

        console.log("start")
        await setBase64Field(file)
        console.log("end")

        return false;
    }

    const normFile =  (e) => {
        console.log(e)
        if (Array.isArray(e)) {
            return e;
            }

        return e && e.fileList;
    };
    return (
        <Modal closable={true} maskClosable={false} title="Dog Info" visible={props.isShow} onOk={props.handleOk} onCancel={props.handleCancel}
            footer={[
                <Button form={formid} key="submit" htmlType="submit" loading={props.loading}>
                    Submit
                </Button>
            ]}

        >
            <Form id={formid} form={form} {...formItem2Layout} name="register" onFinish={(values) => props.onFinish(values)}  >
                <Form.Item name="name" label="name" initialValue={dog.name} rules={requireTextFieldRules}  >
                    <Input name="name" />
                </Form.Item>
                <Form.Item name="about" label="introduction" initialValue={dog.about} rules={requireTextFieldRules}  >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="breedID" label="breed" initialValue={dog.breedID} rules={requireSelectFieldRules}  >
                    <Select
                        placeholder="Select a breed"

                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }

                        allowClear
                        showSearch
                    >
                        {breeds.map((item) => (
                            <Option
                                title={item.name}
                                key={item.id}
                                id={item.id}
                                value={item.id}
                            >
                                {item.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="imageBase64" initialValue={dog.imageBase64} hidden  ><Input /></Form.Item>
                <Form.Item name="createdBy" initialValue={dog.createdBy} hidden  ><Input /></Form.Item>
                <Form.Item name="companyCode" initialValue={dog.companyCode} hidden  ><Input /></Form.Item>

                <Form.Item name="image" label="Dog Image" initialValue={fileList} valuePropName="fileList" getValueFromEvent={normFile} rules={requireUploadFieldRules}>
                    <Upload.Dragger name="files"  listType="picture" accept='image/*' beforeUpload={beforeUpload} multiple={false} maxCount={1}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag image to this area to upload</p>
                        <p className="ant-upload-hint">Support for a single upload.</p>
                    </Upload.Dragger>
                </Form.Item>
            </Form>
        </Modal>
    )

}
export default connect(getAllStateMap,getAllActionMap)(DogModalForm);