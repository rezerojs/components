import React from 'react';
import { Submitter } from '@rezerojs/components';
import { Form, Input } from 'antd';

export default () => {
  const [form] = Form.useForm();

  return (
    <>
      <Form name="basic" form={form} layout={'vertical'}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="psd"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password autoComplete="new-password" />
        </Form.Item>

        <Submitter
          onFinish={() => {
            console.log('------onFinish--------');
          }}
          onFinishFailed={(error) => {
            console.log('------onFinishFailed--------');
            console.log(error);
          }}
          beforeFinish={() => {
            return form.validateFields();
          }}
        />
      </Form>
    </>
  );
};
