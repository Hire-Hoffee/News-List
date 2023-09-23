import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AllNewsDataType } from "@/types/newsTypes";

const initialState: { news: Partial<AllNewsDataType> } = {
  news: {},
};

type FetchOptionsType = {
  keyWord: string;
};

export const newsSlice = createSlice({
  name: "newsData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNewsData.fulfilled, (state, action) => {
      state.news = action.payload;
    });
  },
});

const fetchNewsData = createAsyncThunk(
  "newsData/fetchNewsData",
  async ({ keyWord }: Partial<FetchOptionsType>) => {
    const URL = process.env.NEXT_PUBLIC_API_ENDPOINT!;
    const searchParams = new URLSearchParams({
      "api-key": process.env.NEXT_PUBLIC_API_KEY!,
      "show-fields": "thumbnail",
      q: keyWord || "",
    });

    const response = await fetch(URL + searchParams);
    return await response.json();
  }
);

export const {} = newsSlice.actions;
export { fetchNewsData };

export default newsSlice.reducer;
