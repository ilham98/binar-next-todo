import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import firebaseDb from "../../firebase/firebaseDb";

export const fetchTodo = createAsyncThunk("todo/fetchTodo", async () => {
  try {
    const todos = [];
    const querySnapshot = await getDocs(collection(firebaseDb, "todos"));
    querySnapshot.forEach((doc) => {
      todos.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return todos;
  } catch (err) {
    console.log(err);
    throw TypeError("Unable to load posts");
  }
});

export const createTodo = createAsyncThunk("todo/createTodo", async (title) => {
  try {
    const docRef = await addDoc(collection(firebaseDb, "todos"), {
      title,
    });
    return {
      id: docRef.id,
      title,
    };
  } catch (err) {
    console.log(err);
    throw TypeError("Unable to load posts");
  }
});

export const deleteTodo = createAsyncThunk(
  "todo/deleteTodo",
  async (params) => {
    try {
      await deleteDoc(doc(firebaseDb, "todos", params.id));
      return params.index;
    } catch (err) {
      console.log(err);
      throw TypeError("Unable to load posts");
    }
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    form: {
      title: "",
    },
    isLoading: false,
    isSubmitLoading: false,
    data: [],
    errorMessage: "",
  },
  reducers: {
    changeFormTitle: (state, action) => {
      state.form.title = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTodo.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchTodo.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(createTodo.pending, (state) => {
      state.isSubmitLoading = true;
    });
    builder.addCase(createTodo.fulfilled, (state, action) => {
      state.data.push(action.payload);
      state.isSubmitLoading = false;
      state.form.title = "";
    });
    builder.addCase(createTodo.rejected, (state) => {
      state.isSubmitLoading = false;
    });

    builder.addCase(deleteTodo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.data.splice(action.payload, 1);
      state.isLoading = false;
      state.form.title = "";
    });
    builder.addCase(deleteTodo.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { changeFormTitle } = todoSlice.actions;

export default todoSlice.reducer;
