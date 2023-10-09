import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const keys = require('../../config/dev');

const foodApi = createApi({
  reducerPath: 'food',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  endpoints: (builder) => {
    return {
      fetchFood: builder.query<any, string>({
        query: (keyword) => {
          return {
            url: 'food/search',
            method: 'GET',
            params: {
              keyword:keyword,
            },
          }
        }
      }),
    }
  }
});

export const { 
  useFetchFoodQuery,
} = foodApi;
export { foodApi };