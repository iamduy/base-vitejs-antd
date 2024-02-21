import Authenticated from '@/components/templates/Authenticated';
import { useLogin } from '@/react-query';
import { AuthHelper, Repository } from '@/services';
import { Button, Checkbox, Flex, Form, Input } from 'antd';
import React from 'react';

type FieldType = {
  username: string;
  password: string;
  remember: boolean;
};

const Login: React.FC = () => {
  const { mutateAsync } = useLogin();
  const onFinish = async (values: FieldType) => {
    await mutateAsync(values, {
      onSuccess(data) {
        AuthHelper.saveAuthenticate({
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
        });
        Repository.dispatchEventStorage();
      },
    });
  };

  return (
    <Authenticated>
      <Flex
        gap='middle'
        align='center'
        justify='center'
        vertical
        style={{ height: '100vh' }}
      >
        <Form
          name='basic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete='off'
        >
          <Form.Item<FieldType>
            label='Username'
            name='username'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label='Password'
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            name='remember'
            valuePropName='checked'
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Authenticated>
  );
};

export default Login;
