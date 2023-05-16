import { configureStore } from '@reduxjs/toolkit';
import {  authReducer } from './auth-reducer';

const initValue = {
  id: null,
  email: null,
  token: null
};

describe('authReducer', () => {
  let store

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer.reducer
      }
    });
  });

  test('login action should update state with payload', () => {
    const payload = {
      id: '1',
      email: 'example@example.com',
      token: 'token123'
    };

    store.dispatch(authReducer.actions.login(payload));

    const state = store.getState().auth;
    expect(state).toEqual(payload);
  });

  test('logout action should reset state to initial value', () => {
    store.dispatch(authReducer.actions.logout());

    const state = store.getState().auth;
    expect(state).toEqual(initValue);
  });
});
