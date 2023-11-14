import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type FoodInput = {
  date: string;
  food: string;
  meal: string;
};

const journalApi = createApi({
  reducerPath: 'journal',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  tagTypes: ['Journal'],
  endpoints: (builder) => {
    return {
      addJournal: builder.mutation<void, string>({
        query: (date) => {
          return {
            url: 'journal/add',
            method: 'POST',
            body: {
              date: date
            },
          };
        },
      }), 
      updateJournal: builder.mutation<void, FoodInput>({
        invalidatesTags: ['Journal'],
        query: (input) => {
          return {
            url: 'journal/update',
            method: 'PUT',
            body: {
              input
            },
          };
        },        
      }),
      fetchJournal: builder.query<any, string>({
        providesTags: ['Journal'],
        query: (date) => {
          return {
            url: 'journal/entries',
            method: 'GET',
            params: {
              date: date,
            },
          };
        },        
      }),
    }
  }
});

export const {   
  useAddJournalMutation,
  useUpdateJournalMutation,
  useFetchJournalQuery,
} = journalApi;
export { journalApi };