import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '..';

//Create an RTK QUery slice to track user targets for use in various components

interface TargetState {
  [index: string]: number,
}

const initialState = {
  "calories": 0,
  "protein": 0,
  "carbs": 0,
  "fat": 0,
  "fiber": 0,  
} as TargetState;

export const userSlice = createSlice({
  name: 'targets',
  initialState,
  reducers: {
    setTargets: (state, action: PayloadAction<TargetState>) => {
      state["calories"] = action.payload.calories;        
      state["protein"] = action.payload.protein;
      state["carbs"] = action.payload.carbs;
      state["fat"] = action.payload.fat;
      state["fiber"] = action.payload.fiber;
    },
    resetTargets: () => initialState,
  },  
});

export const { setTargets, resetTargets } = userSlice.actions

export const selectTargets = (state: RootState) => state.targets

export default userSlice.reducer