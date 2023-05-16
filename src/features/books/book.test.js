import { configureStore } from '@reduxjs/toolkit';
import { bookReducer, fetchBooks } from './books-reducer';
import thunkMiddleware from 'redux-thunk';
describe('bookReducer', () => {
  let store
  beforeEach(() => {
    store = configureStore({
      reducer: {
        books: bookReducer.reducer
      },
      middleware: [thunkMiddleware]
    });
  });

  test('viewDetail action should update currentBookData', () => {
    const book = {
      id: '1',
      title: 'Book Title',
      category: 'Fiction',
      description: 'Book description',
      author: 'John Doe',
      img: 'book.jpg'
    };

    store.dispatch(bookReducer.actions.viewDetail(book));

    const state = store.getState().books;
    expect(state.currentBookData).toEqual(book);
  });

  test('resetDetail action should reset currentBookData to null', () => {
    store.dispatch(bookReducer.actions.resetDetail());

    const state = store.getState().books;
    expect(state.currentBookData).toBeNull();
  });

  test('fetchBooks async action should update listBooks', async () => {
    await store.dispatch(fetchBooks());

    const state = store.getState().books;
    expect(Array.isArray(state.listBooks)).toBe(true);
    expect(state.listBooks.length).toBeGreaterThan(0);
  });
});
