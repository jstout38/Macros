import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userInfo } from 'os';

export interface FormData {
  formFirstName: string,
  formLastName: string,
  formEmail: string,
  formWeight: string,
  formHeight: string,
  formDOB: string,
}

const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  endpoints(builder) {
    return {
      addUser: builder.mutation<any, FormData>({
        query: (formData) => {
          return {
            url: 'google/auth',
            method: 'GET',
            params: {
              formData,
            },
          };
        },
      }),
      fetchUser: builder.query<any, void>({
        query: () => {
          return {
            url: 'api/current_user',
            method: 'GET'
          };
        }
      })
    }
  }
});

export const { 
  useFetchUserQuery,
  useAddUserMutation,
} = authApi;
export { authApi };