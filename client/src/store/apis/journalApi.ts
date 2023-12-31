import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Food } from './foodApi';

export type EntryType = {
  date: string,
  food: Food,
  meal: string,
  quantity: number,
  user: string,
  _id: string
}

export type EntryList = {
  [index: string]: [EntryType] | string,
  _id: string,
}


export type FoodInput = {
  date: string;
  food: string;
  meal: string;
  quantity: number;
};

export type DeleteInput = {
  date: string;
  id: string;
  meal: string;
}

//Endpoints:
//useAddJournalMutation - Add new journal for date
//useUpdateJournalMutation - Upate journal entries for day
//useFetchJournalQuery - Get all journal entries for date
//useDeleteEntryMutation - Deelte an individual journal entry
const journalApi = createApi({
  reducerPath: 'journal',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  tagTypes: ['Journal'],
  endpoints: (builder) => {
    return {
      addJournal: builder.mutation<void, string>({
        invalidatesTags: ['Journal'],
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
      fetchJournal: builder.query<EntryList, string>({
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
      deleteEntry: builder.mutation<void, DeleteInput>({
        invalidatesTags: ['Journal'],
        query: (input) => {
          return {
            url: 'journal/delete',
            method: 'POST',
            params: {
              date: input.date,
              meal: input.meal,
              id: input.id,
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
  useDeleteEntryMutation,
} = journalApi;
export { journalApi };