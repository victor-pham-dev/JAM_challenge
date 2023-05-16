import { createSlice } from '@reduxjs/toolkit';

export interface AuthProps {
  id: string | null;
  email: string | null;
  token: string | null;
}

const initValue: AuthProps = {
  id: null,
  email: null,
  token: null
};

export const authReducer = createSlice({
  name: 'auth',
  initialState: initValue,
  reducers: {
    login: (state, action) => {
      return (state = action.payload);
    },
    logout: (state) => {
      return (state = initValue);
    }
  }
});
