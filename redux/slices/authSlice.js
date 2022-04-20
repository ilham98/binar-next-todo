import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword } from "firebase/auth";
import firebaseAuth from "../../firebase/firebaseAuth";

export const attemptAuth = createAsyncThunk(
  "auth/attemptAuth",
  async (credentials) => {
    try {
      console.log(credentials);
      const { email, password } = credentials;
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      return {
        email: userCredential.user.email,
      };
    } catch (err) {
      console.log(err);
      throw TypeError("Unable to load posts");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    form: {
      email: "",
      password: "",
    },
    isLoading: false,
    authenticatedUser: null,
  },
  reducers: {
    updateCredentials: (state, action) => {
      const { name, value } = action.payload;
      state.form = {
        ...state.form,
        [name]: value,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(attemptAuth.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(attemptAuth.fulfilled, (state, action) => {
      state.authenticatedUser = action.payload;
      state.isLoading = false;
    });
    builder.addCase(attemptAuth.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { updateCredentials } = authSlice.actions;

export default authSlice.reducer;
