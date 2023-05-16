import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, message } from 'antd';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { UserApi } from 'src/api/user.api';
import { PATH } from 'src/const/config';
import { AuthProps, authReducer } from '../auth-reducer';

export default function Login(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function Auth(values: any) {
    message.loading('Processing....');
    const result = await UserApi.Login({ ...values });
    if (result.success) {
      message.success('Login success');
      const user: AuthProps = {
        email: result.data.user.email,
        id: result.data.user.id,
        token: result.data.session.access_token
      };
      dispatch(authReducer.actions.login(user));
      navigate('/');
    } else {
      message.error('Email or password is incorrect or Account is not yet verified !');
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
          <Col>Login</Col>
        </Row>
        <Form name="register" onFinish={Auth}>
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
              Login
            </Button>
          </Form.Item>
        </Form>
        <Row justify="space-between">
          <Col span={12}>
            <Row gutter={[8, 8]}>
              <Col>Not yet have an account?</Col>
              <Col>
                <Link to={`/${PATH.REGISTER}`}>
                  <Button type="primary" style={{ float: 'left' }}>
                    Register
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
