import { configureStore } from '@reduxjs/toolkit';
import { AuthProps, authReducer } from 'src/features/auth/auth-reducer';
import { BookStoreProps, bookReducer } from 'src/features/books/books-reducer';
import thunkMiddleware from 'redux-thunk';

export interface RootStateProps {
  books: BookStoreProps;
  auth: AuthProps;
}
export const store = configureStore({
  reducer: {
    books: bookReducer.reducer,
    auth: authReducer.reducer
  },
  middleware: [thunkMiddleware]
});
