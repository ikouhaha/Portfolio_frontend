

import React from 'react';

import {  Col, Row, Button, Form, Input, Select, Space, Tooltip } from 'antd';
import { SearchOutlined, ClearOutlined, FileAddFilled } from '@ant-design/icons';
//import articles from './data/articles.json'


const { Option } = Select;


function DogFilter(props) {

  const [form] = Form.useForm();




  return (

    <Form
      form={form}
      name="advanced_search"
      style={{position:'sticky',top:0}}
      className="ant-advanced-search-form"
      onFinish={props.onFinish}
    >

      <Row gutter={24}>
        <Col span={10} >
          <Form.Item name="name">
            <Input placeholder="name" />
          </Form.Item>

        </Col>
        <Col span={10} >
          <Form.Item name="breedID">
            <Select
              placeholder="Select a breed"

              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }

              allowClear
              showSearch
            >
              {props.breeds.map((item) => (
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

        </Col>
        <Col span={4} style={{ textAlign: 'right' }}>
          <Space>
            <Tooltip title="search">
              <Button htmlType="submit" icon={<SearchOutlined />} />
            </Tooltip>
            <Tooltip title="clear filter">
              <Button
                icon={<ClearOutlined />}
                onClick={() => {
                  form.resetFields();
                }}
              />
            </Tooltip>
            {(()=>{
                if(props.canCreate){
                  return (
                    <Tooltip title="create new one">
                    <Button
                      icon={<FileAddFilled />}
                      onClick={() => {
                        props.handleCreateClick()
                      }}
                    />
                  </Tooltip>
                  )
                }
            })()}
           
          </Space>

        </Col>
      </Row>

      <Row>

      </Row>

    </Form>

  )

}
export default DogFilter;