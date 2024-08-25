import { createSlice } from '@reduxjs/toolkit';
import { loginUser} from '../utils/authUtils';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: null,
    name: '',
    email: '',
    role: '',
    isAuthenticated: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.userId = null;
      state.email = '';
      state.name = '';
      state.role = '';
      state.isAuthenticated = false;
      state.error = null;
    },
    updateUser: (state, action) => {
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        if (user) {
          state.userId = user.id;
          state.email = user.email;
          state.name = user.name;
          state.role = user.role;
          state.isAuthenticated = true;
          state.error = null;
          state.status= 'succeeded'
        } else {
          state.status = 'failed';
          state.error = 'User data not found in response';
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const { logout, updateUser } = authSlice.actions;
export default authSlice.reducer;