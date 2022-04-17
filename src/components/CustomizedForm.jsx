import React from "react"

import {  Form, Input  } from "antd"

const CustomizedForm = ({ onChange, fields }) => (
    <Form
      name="global_state"
      layout="inline"
      fie={fields}
      onFieldsChange={(_, allFields) => {
        onChange(allFields);
      }}
    >
      <Form.Item
        name="username"
        label="Username"
        rules={[
          {
            required: true,
            message: 'Username is required!',
          },
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  );

  
export default CustomizedForm