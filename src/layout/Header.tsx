import { Button, Col, Row, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PATH } from 'src/const/config';
import { authReducer } from 'src/features/auth/auth-reducer';
import { RootStateProps } from 'src/store/store';

export default function Header() {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootStateProps) => state.auth);
  return (
    <Row
      gutter={[16, 16]}
      justify="space-between"
      style={{ background: '#bdbdbd', padding: 8 }}
      align="middle">
      <Col>
        <Link to="/">Books App</Link>
      </Col>
      <Col>
        {auth.token !== null ? (
          <Space>
            <span>{auth.email}</span>
            <Button onClick={() => dispatch(authReducer.actions.logout())}>Log out</Button>
          </Space>
        ) : (
          <Space>
            <Link to={`${PATH.LOGIN}`}>
              <Button type="primary">Login</Button>
            </Link>
            <Link to={`${PATH.REGISTER}`}>
              <Button type="primary">Register</Button>
            </Link>
          </Space>
        )}
      </Col>
    </Row>
  );
}
