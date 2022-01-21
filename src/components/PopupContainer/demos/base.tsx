import React, { createRef, useRef, useState } from 'react';
import { PopupContainer, PopupWindow, Submitter } from '@rezerojs/components';
import { Button, Form, Input, Space, Table, Tag } from 'antd';
import { PopupActionType } from '../index';

function FormModal(props: any) {
  const [form] = Form.useForm();

  console.log('------------', props);

  return (
    <PopupWindow
      title={'添加用户'}
      submitter={{
        onFinish: () => {
          console.log('------onFinish--------');
        },
        onFinishFailed: (error) => {
          console.log('------onFinishFailed--------');
          console.log(error);
        },
        beforeFinish: () => {
          return form.validateFields();
        },
      }}
    >
      <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your Name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Age"
          name="age"
          rules={[{ required: true, message: 'Please input your Age!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Please input your Address!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </PopupWindow>
  );
}

function Form2Modal(props: any) {
  console.log('-Form2Modal', props);

  const [form] = Form.useForm();

  return (
    <PopupWindow
      title={'First Modal'}
      submitter={{
        onFinish: () => {
          console.log('------onFinish--------');
        },
        onFinishFailed: (error) => {
          console.log('------onFinishFailed--------');
          console.log(error);
        },
        beforeFinish: () => {
          return form.validateFields();
        },
      }}
    >
      <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input autoComplete="new-text" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="psd"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password autoComplete="new-password" />
        </Form.Item>
      </Form>
    </PopupWindow>
  );
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags: string[]) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text: string, record: { name: string }) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

export default () => {
  const popupRef = useRef<PopupActionType>();

  const handleInsert = () => {
    popupRef.current?.trigger('f1');
  };

  const [testData, setTestData] = useState<any>({ a: 1, b: 2 });

  return (
    <div>
      <Space>
        <Button
          onClick={handleInsert}
          style={{ marginBottom: 16 }}
          type={'primary'}
        >
          INSERT
        </Button>
        <Button
          onClick={() => {
            testData.a = 11;
            testData.c = 3;
            setTestData({ ...testData });
          }}
          style={{ marginBottom: 16 }}
          type={'primary'}
        >
          Change TestData
        </Button>
      </Space>
      <Table dataSource={data} columns={columns} />
      <PopupContainer ref={popupRef}>
        <FormModal key={'f1'} testData={testData} />
        <Form2Modal key={'f2'} />
      </PopupContainer>
    </div>
  );
};
