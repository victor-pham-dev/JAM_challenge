import { Button, Col, Form, Input, Modal, Row, message } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BooksApi } from 'src/api/books.api';
import { PATH } from 'src/const/config';
import { RootStateProps } from 'src/store/store';
import { bookReducer, fetchBooks } from '../books-reducer';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';
import BooksCard from 'src/components/BooksCard';
export default function HomePage() {
  const navigate = useNavigate();
  const auth = useSelector((state: RootStateProps) => state.auth);
  const [openModal, setOpenModal] = useState(false);
  const dispatch: ThunkDispatch<RootStateProps, undefined, AnyAction> = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(bookReducer.actions.resetDetail());
  }, []);
  const [filter, setFilter] = useState<string | undefined>(undefined)
  const listBook = useSelector((state: RootStateProps) => state.books.listBooks);

  const booksMemo = useMemo(() => {
    if(filter !== undefined && filter.trim().length > 0){
      const filterBooks = listBook.filter(item => item.title.toLowerCase().includes(filter.toLowerCase()))
      return filterBooks
    }else{
      return listBook
    }
  }, [filter,listBook]);

  function handleViewDetail(index: number) {
    const book = listBook[index];
    dispatch(bookReducer.actions.viewDetail(book));
    const pathToNavigate = `/${PATH.BOOKS}/${book.title}`;
    return navigate(pathToNavigate);
  }


  return (
    <Row gutter={[0, 20]}>
      <Col span={24}>
        {auth.token !== null ? (
          <Button onClick={() => setOpenModal(true)} type="primary">
            Add a new Book
          </Button>
        ) : (
          <>
            {'->'} <Link to={`/${PATH.LOGIN}`}>Login to add a new book</Link>
          </>
        )}
      </Col>
      <Col span={24}>
        <Row gutter={[16, 16]} justify='center'>
          <Input placeholder='Enter name to search' onChange={e => setFilter(e.target.value)} />
          {booksMemo.map((item, i) => (
            <Col key={`book ${i}`} xxl={6} xs={12} onClick={() => handleViewDetail(i)}>
              <BooksCard {...item} />
            </Col>
          ))}
        </Row>
      </Col>

      <Modal
        title={`Add a new book`}
        footer={null}
        open={openModal}
        onCancel={() => setOpenModal(false)}>
        <FormAddNewBook setOpenModal={setOpenModal} />
      </Modal>
    </Row>
  );
}

interface FormProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export function FormAddNewBook({ setOpenModal }: FormProps) {
  const [form] = Form.useForm();
  const dispatch: ThunkDispatch<RootStateProps, undefined, AnyAction> = useDispatch();

  async function AddBook(values: any) {
    const result = await BooksApi.CreateANewBook(values);
    if (result.success) {
      message.success('add success');
      form.resetFields();
      setOpenModal(false);
      dispatch(fetchBooks());
    } else {
      message.error('failed');
    }
  }

  return (
    <Form
      name="add book"
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ img: 'https://picsum.photos/200' }}
      onFinish={AddBook}
      autoComplete="off">
      <Form.Item label="img" name="img" rules={[{ required: true, message: 'Please input img!' }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="title"
        name="title"
        rules={[{ required: true, message: 'Please input title!' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="author"
        name="author"
        rules={[{ required: true, message: 'Please input author!' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="description"
        name="description"
        rules={[{ required: true, message: 'Please input description!' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="category"
        name="category"
        rules={[{ required: true, message: 'Please input category!' }]}>
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Add new book
        </Button>
      </Form.Item>
    </Form>
  );
}
