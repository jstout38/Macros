import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '..';

interface MacroState {
  [index: string]: {
    calories: number,
    protein: number,
    carbs: number,
    fat: number,
    fiber: number,
  },
}

interface MacroPayload {
  meal: string,
  calories: number,
  protein: number,
  carbs: number,
  fat: number,
  fiber: number,
}

const initialState = {
  "breakfast": {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
  },
  "lunch": {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
  },
  "dinner": {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
  },
  "snacks": {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
  }
} as MacroState

export const macroSlice = createSlice({
  name: 'macros',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<MacroPayload>) => {
      state[action.payload.meal].calories = action.payload.calories;        
      state[action.payload.meal].protein = action.payload.protein;
      state[action.payload.meal].carbs = action.payload.carbs;
      state[action.payload.meal].fat = action.payload.fat;
      state[action.payload.meal].fiber = action.payload.fiber;
    },
  },
});

export const { update } = macroSlice.actions

export const selectMacros = (state: RootState) => state.macros

export default macroSlice.reducer