import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword } from "firebase/auth";
import firebaseAuth from "../../firebase/firebaseAuth";
import { signOut } from "firebase/auth";

export const attemptAuth = createAsyncThunk(
  "auth/attemptAuth",
  async (credentials) => {
    try {
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
      throw TypeError("Unable to login");
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    await signOut(firebaseAuth);
    return {};
  } catch (err) {
    throw TypeError("Unable to logout");
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    form: {
      email: "",
      password: "",
    },
    isLoading: false,
    isSignOutLoading: false,
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
    updateAuthenticatedUser: (state, action) => {
      state.authenticatedUser = {
        email: action.payload.email,
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

    builder.addCase(logout.pending, (state) => {
      state.isSignOutLoading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.authenticatedUser = null;
      state.isSignOutLoading = false;
    });
    builder.addCase(logout.rejected, (state) => {
      state.isSignOutLoading = false;
    });
  },
});

export const { updateCredentials, updateAuthenticatedUser } = authSlice.actions;

export default authSlice.reducer;
