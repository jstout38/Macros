import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  endpoints(builder) {
    return {
      fetchUser: builder.query<any, void>({
        query: () => {
          return {
            url: '/current_user',
            method: 'GET'
          };
        }
      })
    }
  }
});

export const { useFetchUserQuery } = authApi;
export { authApi };