import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API_URL } from "../../constants/constants";

export const fetchColorThemes = createAsyncThunk(
  "colorThemes/fetchColorThemes",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_API_URL}/api/color-themes`);
      return res.data.data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch themes");
    }
  }
);

export const createColorTheme = createAsyncThunk(
  "colorThemes/createColorTheme",
  async (themeData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_API_URL}/api/color-themes`, themeData);
      return res.data.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create theme");
    }
  }
);

const colorThemeSlice = createSlice({
  name: "colorThemes",
  initialState: {
    themes: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchColorThemes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchColorThemes.fulfilled, (state, action) => {
        state.loading = false;
        state.themes = action.payload;
      })
      .addCase(fetchColorThemes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createColorTheme.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createColorTheme.fulfilled, (state, action) => {
        state.loading = false;
        state.themes.push(action.payload);
        state.successMessage = "Theme created successfully!";
      })
      .addCase(createColorTheme.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = colorThemeSlice.actions;
export default colorThemeSlice.reducer;
