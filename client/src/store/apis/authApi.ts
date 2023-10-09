import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userInfo } from 'os';

export type FormData = {
  formFirstName: string;
  formLastName: string;
  formEmail: string;
  formWeight: number;
  formHeight: number;
  formDOB: null | Date;
};

export type FormUpdate = {
  fields: FormData;
  data: any;
};

const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  endpoints(builder) {
    return {
      addUser: builder.mutation<void, FormUpdate>({
        query: (formUpdate) => {
          return {
            url: 'auth/user',
            method: 'PUT',
            body: formUpdate,
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