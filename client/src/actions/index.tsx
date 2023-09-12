import { FETCH_USER } from './types';
import axios from 'axios';

export const fetchUser = () => async (dispatch: any) => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};