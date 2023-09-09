import axios from 'axios';
import { FETCH_USER } from './types';

const fetchUser = () => {
  return function (dispatch: any) {
    axios.get('/api/current_user')
      .then(res => dispatch({ type: FETCH_USER, payload: res }));
  };
};