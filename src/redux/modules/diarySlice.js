import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  error: null,
};

export const __getDiaries = createAsyncThunk('diary/getDiaries', async (payload, thunkAPI) => {
  try {
    const response = await axios.get('http://localhost:4000/diary');
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(response.data);
  }
});

// post 요청 날려줄거
export const __addDiary = createAsyncThunk('diary/addDiary', async (payload, thunkAPI) => {
  // payload에는 새로 만들 입력값들을 넘겨받아 들어올거임
  try {
    // axios 통신
    await axios.post('http://localhost:4000/diary', payload);
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const diarySlice = createSlice({
  name: 'diary',
  initialState,
  reducers: {},
  extraReducers: {
    [__getDiaries.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
    },
    [__getDiaries.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    [__getDiaries.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
    },

    [__addDiary.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = [...state.data, action.payload];
    },
    [__addDiary.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    [__addDiary.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
  },
});

export const {} = diarySlice.actions;
export default diarySlice.reducer;
