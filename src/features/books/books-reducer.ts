import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BooksApi } from 'src/api/books.api';

export interface BookProps {
  id: string;
  title: string;
  category: string;
  description: string;
  author: string;
  img: string;
}

export interface BookStoreProps {
  listBooks: BookProps[];
  currentBookData: BookProps | null;
}

const initValue: BookStoreProps = {
  listBooks: [],
  currentBookData: null
};

export const bookReducer = createSlice({
  name: 'books',
  initialState: initValue,
  reducers: {
    viewDetail: (state, action: PayloadAction<BookProps>) => {
      return { ...state, currentBookData: action.payload };
    },
    resetDetail: (state) => {
      return { ...state, currentBookDataL: null };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      return { ...state, listBooks: action.payload };
    });
  }
});

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const result = await BooksApi.GetAllBooks();
  return result.data;
});
