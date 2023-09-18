import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '..'

interface AuthState {
  auth: any
}

const initialState: AuthState = {
  auth: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

  }
});