import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
};

const apiData = createSlice({
  name: "data",
  initialState,
  reducers: {
    setApiData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setApiData } = apiData.actions;
export default apiData.reducer;
