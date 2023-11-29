import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//RTK Query API for fetching user and creating/updating user account
export type FormData = {
  formFirstName: string;
  formLastName: string;
  formEmail: string;
  formWeight: number;
  formHeight: number;
  formDOB: null | Date;
  formProtein: number;
  formCarbs: number;
  formFat: number;
  formFiber: number;
  formCalories: number;
};

export interface User {
  googleId: string;
  firstName: string;
  lastName: string;
  email: string;
  DoB: Date;
  weight: number;
  height: number;
  protein: number;
  carbs: number;
  calories: number;
  fat: number;
  fiber: number;
  foods: [];
  journal: [];
}

export type FormUpdate = {
  fields: FormData,
  googleId: string,
};

//Endpoints:
//useFetchUserQuery - fetch current user
//useAddUserMutation - add or edit user
const authApi = createApi({
  reducerPath: 'auth',
  tagTypes: ['User'],
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  endpoints(builder) {
    return {
      addUser: builder.mutation<void, FormUpdate>({
        invalidatesTags: ['User'],
        query: (formUpdate) => {
          return {
            url: 'auth/user',
            method: 'PUT',
            body: formUpdate,
          };
        },
      }),
      fetchUser: builder.query<User, void>({
        providesTags: ['User'],
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