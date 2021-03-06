

import React, { useState } from 'react';

import {  Button, Modal, Form, Input, Select, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
//import articles from './data/articles.json'

import { formItem2Layout, requireUploadFieldRules,  requireTextFieldRules, requireSelectFieldRules } from '../common/latoutAndRules'


import { uuid,toBase64, getAllActionMap, getAllStateMap } from '../common/utils';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

const { Option } = Select;

DogModalForm.propTypes = {
    fileList:PropTypes.array.isRequired,
    isShow:PropTypes.bool.isRequired,
    loading:PropTypes.bool.isRequired,
    dog:PropTypes.object.isRequired,
    breeds:PropTypes.array.isRequired,
    app:PropTypes.object.isRequired,
    handleCancel:PropTypes.func.isRequired,
    onFormFinish:PropTypes.func.isRequired,
    
}


function DogModalForm(props) {
    
    const dog = { ...props.dog }
    const breeds = [...props.breeds||[]]
    if(!dog.id){
        return (<></>)
    }
    
    const [fileList] = useState(props.fileList);
   

    const [form] = Form.useForm();
    const modalId = uuid()
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
        <Modal id={modalId} key={modalId} closable={true} maskClosable={false} title="Dog Info" visible={props.isShow}  onCancel={props.handleCancel}
            footer={[
                <Button form={formid} key="submit" htmlType="submit" loading={props.loading}>
                    Submit
                </Button>
            ]}

        >
            <Form id={formid} key={formid} form={form} {...formItem2Layout} name="register" onFinish={(values) => props.onFormFinish(dog.id,values)}  >
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