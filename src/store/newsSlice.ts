import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AllNewsDataType, OneNewsDataType } from "@/types/newsTypes";

const initialState: {
  news: Partial<OneNewsDataType[]>;
} & Partial<FetchOptionsType> & { isLoadingData: boolean } = {
  news: [],
  keyWord: "",
  pageSize: 10,
  page: 2,
  orderBy: "newest",
  isLoadingData: false,
  lang: "en",
};

type FetchOptionsType = {
  keyWord: string;
  page: number;
  pageSize: number;
  orderBy: string;
  lang: string;
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
    changeOrderByState: (state, action: PayloadAction<string>) => {
      state.orderBy = action.payload;
    },
    changeLangState: (state, action: PayloadAction<string>) => {
      state.lang = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNewsData.pending, (state, action) => {
      if (action.meta.arg.page) {
        return;
      }
      state.isLoadingData = true;
    });

    builder.addCase(fetchNewsData.fulfilled, (state, action) => {
      if (action.meta.arg.page) {
        state.news = [...state.news, ...action.payload.response.results];
        return;
      }
      state.news = action.payload.response.results;
      state.isLoadingData = false;
    });
  },
});

const fetchNewsData = createAsyncThunk(
  "newsData/fetchNewsData",
  async ({
    keyWord,
    page,
    pageSize,
    orderBy,
    lang,
  }: Partial<FetchOptionsType>): Promise<AllNewsDataType> => {
    const URL = process.env.NEXT_PUBLIC_API_ENDPOINT!;
    const searchParams = new URLSearchParams({
      "api-key": process.env.NEXT_PUBLIC_API_KEY!,
      "show-fields": "thumbnail",
      q: keyWord || "",
      page: page?.toString() || "1",
      "page-size": pageSize?.toString() || "10",
      "order-by": orderBy || "newest",
      lang: lang || "en",
    });

    const response = await fetch(URL + searchParams);
    return await response.json();
  }
);

export const { changeKeywordState, changePageSizeState, changeOrderByState, changeLangState } =
  newsSlice.actions;
export { fetchNewsData };

export default newsSlice.reducer;
