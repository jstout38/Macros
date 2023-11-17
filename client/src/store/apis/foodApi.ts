import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { pathToFileURL } from 'url';

export type FoodForm = {
  formName: string;
  formDescription: string;
  formCals: number;
  formProt: number;
  formCarbs: number;
  formFat: number;
  formFiber: number;
}

type EditForm = {
  formName: string;
  formDescription: string;
  formCals: number;
  formProt: number;
  formCarbs: number;
  formFat: number;
  formFiber: number;
  id: string;
}

const foodApi = createApi({
  reducerPath: 'food',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  tagTypes: ['Food'],
  endpoints: (builder) => {
    return {
      addFood: builder.mutation<void, FoodForm>({
        invalidatesTags: ['Food'],
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
        providesTags: ['Food'],
        query: () => {
          return {
            url: 'food/foodlist',
            method: 'GET',            
          };
        },
      }),
      deleteFood: builder.mutation<void, string>({
        invalidatesTags: ['Food'],
        query: (food_id) => {
          return {
            url: 'food/delete',
            method: 'DELETE',
            params: {
              food_id: food_id,
            }
          }
        }
      }),
      editFood: builder.mutation<void, EditForm>({
        invalidatesTags: ['Food'],
        query: (input) => {
          return {
            url: 'food/update',
            method: 'POST',
            body: {
              input,
            }
          }
        }
      }), 
    }
  }
});

export const { 
  useFetchFoodQuery,
  useAddFoodMutation,
  useFetchUserFoodQuery,
  useDeleteFoodMutation,
  useEditFoodMutation,
} = foodApi;
export { foodApi };