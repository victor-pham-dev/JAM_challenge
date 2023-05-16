import { Col, Row } from 'antd';
import { ReactNode } from 'react';

import Header from './Header';

interface Props {
  children: ReactNode;
}
export default function AppLayout({ children }: Props) {
  return (
    <Row justify="center">
      <Col xxl={16}>
        {/* header */}
        <Header />
        {/* app */}
        <div style={{ width: '100%', padding: '1rem' }}>{children}</div>
        {/* footer */}
        <p style={{ textAlign: 'center', background: 'gray', color: 'white', padding: 8 }}>
          JAM challenge
        </p>
      </Col>
    </Row>
  );
}
