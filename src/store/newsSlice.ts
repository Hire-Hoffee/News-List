import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  news: {},
};

export const newsSlice = createSlice({
  name: "newsData",
  initialState,
  reducers: {},
});

export const {} = newsSlice.actions;

export default newsSlice.reducer;
