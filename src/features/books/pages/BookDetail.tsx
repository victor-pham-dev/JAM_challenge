import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootStateProps } from 'src/store/store';

export default function BookDetail() {
  const bookData = useSelector((state: RootStateProps) => state.books.currentBookData);
  return (
    <React.Fragment>
      {bookData === null ? (
        <p>Some thing went wrong</p>
      ) : (
        <Row gutter={[20, 20]} justify="center">
          <Col xxl={16} xs={24}>
            <Row gutter={[20, 20]}>
              <Col>
                <img src={bookData.img} />
                <p>Author: {bookData.author}</p>
              </Col>
              <Col>
                <p>Title: {bookData.title}</p>
                <p>Description: {bookData.description}</p>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </React.Fragment>
  );
}
