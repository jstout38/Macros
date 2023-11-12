import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
    }
  }
});

export const {   
  useAddJournalMutation,
} = journalApi;
export { journalApi };