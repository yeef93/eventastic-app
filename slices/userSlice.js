import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// api call
export const fetchUsers = createAsyncThunk(
  "users/getAllUsers",
  async (thunkApi) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    return data;
  }
);

const initialState = {
  users: [],
  loading: false,
  value: 10,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    increment: (state) => {
      state.value++;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users.push(...action.payload);
    });

    builder.addCase(fetchUsers.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export const { increment } = userSlice.actions;
export default userSlice.reducer;