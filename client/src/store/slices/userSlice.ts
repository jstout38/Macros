import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '..';

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
  },
});

export const { setTargets } = userSlice.actions

export const selectTargets = (state: RootState) => state.targets

export default userSlice.reducer