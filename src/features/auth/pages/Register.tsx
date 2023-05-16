import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { UserApi } from 'src/api/user.api';
import { PATH } from 'src/const/config';

export default function Register(): JSX.Element {
  const navigate = useNavigate();
  async function onFinish(values: any) {
    message.info('processing....');
    const result = await UserApi.Register({ ...values });
    if (!result.success) {
      message.error('Register failed');
    } else {
      message.success('Success');
      navigate(`/${PATH.LOGIN}`);
    }
  }
  return (
    <Row align="middle" justify="center" style={{ minHeight: '90vh' }}>
      <Col
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={{ span: 12 }}
        lg={{ span: 12 }}
        xl={{ span: 8 }}
        style={{ padding: 16 }}>
        <Row justify="center" style={{ marginBottom: 20 }}>
          <Col>Register</Col>
        </Row>
        <Form name="register" onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please fill this field!' },
              { type: 'email', message: 'Email is invalid!' }
            ]}>
            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please fill password!' },
              { min: 6, message: 'At least 6 characters!' }
            ]}>
            <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" block>
              Register
            </Button>
          </Form.Item>
        </Form>
        <Row justify="space-between">
          <Col span={12}>
            <Row gutter={[8, 8]}>
              <Col>Already have an account?</Col>
              <Col>
                <Link to={`/${PATH.LOGIN}`}>
                  <Button type="primary" style={{ float: 'left' }}>
                    Login
                  </Button>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
