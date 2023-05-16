import { Route, Routes } from 'react-router-dom';
import { PATH } from 'src/const/config';
import { Login, Register } from 'src/features/auth';
import BookDetail from 'src/features/books/pages/BookDetail';
import HomePage from 'src/features/books/pages/Books';
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path={`/${PATH.BOOKS}/:bookTitle`} element={<BookDetail />} />
      <Route path={`${PATH.LOGIN}`} element={<Login />} />
      <Route path={`${PATH.REGISTER}`} element={<Register />} />
    </Routes>
  );
}
