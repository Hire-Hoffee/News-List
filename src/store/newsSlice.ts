import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AllNewsDataType, OneNewsDataType } from "@/types/newsTypes";

const initialState: {
  news: Partial<OneNewsDataType[]>;
} & Partial<FetchOptionsType> = {
  news: [],
  keyWord: "",
  pageSize: 10,
  page: 2,
};

type FetchOptionsType = {
  keyWord: string;
  page: number;
  pageSize: number;
};

export const newsSlice = createSlice({
  name: "newsData",
  initialState,
  reducers: {
    changeKeywordState: (state, action: PayloadAction<string>) => {
      state.keyWord = action.payload;
    },
    changePageSizeState: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
      state.news.length = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNewsData.fulfilled, (state, action) => {
      if (action.meta.arg.page) {
        state.news = [...state.news, ...action.payload.response.results];
        return;
      }
      state.news = action.payload.response.results;
    });
  },
});

const fetchNewsData = createAsyncThunk(
  "newsData/fetchNewsData",
  async ({
    keyWord,
    page,
    pageSize,
  }: Partial<FetchOptionsType>): Promise<AllNewsDataType> => {
    const URL = process.env.NEXT_PUBLIC_API_ENDPOINT!;
    const searchParams = new URLSearchParams({
      "api-key": process.env.NEXT_PUBLIC_API_KEY!,
      "show-fields": "thumbnail",
      q: keyWord || "",
      page: page?.toString() || "1",
      "page-size": pageSize?.toString() || "10",
    });

    const response = await fetch(URL + searchParams);
    return await response.json();
  }
);

export const { changeKeywordState, changePageSizeState } = newsSlice.actions;
export { fetchNewsData };

export default newsSlice.reducer;
