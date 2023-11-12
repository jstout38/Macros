import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type FoodInput = {
  date: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks: string;
};

const journalApi = createApi({
  reducerPath: 'journal',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
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
        query: (input) => {
          return {
            url: 'journal/update',
            method: 'PUT',
            body: {
              input: input
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
} = journalApi;
export { journalApi };