import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type FoodForm = {
  formName: string;
  formDescription: string;
  formCals: number;
  formProt: number;
  formCarbs: number;
  formFat: number;
  formFiber: number;
}

const foodApi = createApi({
  reducerPath: 'food',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  endpoints: (builder) => {
    return {
      addFood: builder.mutation<void, FoodForm>({
        query: (formUpdate) => {
          return {
            url: 'food/add',
            method: 'PUT',
            body: formUpdate,
          };
        },
      }),
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
      fetchUserFood: builder.query<any, void>({
        query: () => {
          return {
            url: 'food/foodlist',
            method: 'GET',            
          };
        },
      }),
    }
  }
});

export const { 
  useFetchFoodQuery,
  useAddFoodMutation,
  useFetchUserFoodQuery,
} = foodApi;
export { foodApi };