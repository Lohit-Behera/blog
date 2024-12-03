import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "@/lib/proxy";

export type Blog = {
  _id: string;
  title: string;
  content: string;
  author: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
};

type AllBlogs = {
  docs: Blog[];
  totalDocs: number;
  limit: number;
  page: number;
  totalPages: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
};

export const fetchCreateBlog = createAsyncThunk(
  "blog/create",
  async (blog: { title: string; content: string }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const { data } = await axios.post(
        `${baseUrl}/api/v1/blogs/create`,
        blog,
        config
      );
      return data;
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchGetBlog = createAsyncThunk(
  "blog/get",
  async (id: string, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const { data } = await axios.get(
        `${baseUrl}/api/v1/blogs/get/${id}`,
        config
      );
      return data;
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchGetAllBlogs = createAsyncThunk(
  "blog/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const { data } = await axios.get(`${baseUrl}/api/v1/blogs/all`, config);
      return data;
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    createBlog: null,
    createBlogStatus: "idle",
    createBlogError: {},

    getBlog: { data: {} as Blog },
    getBlogStatus: "idle",
    getBlogError: {},

    getAllBlogs: { data: {} as AllBlogs },
    getAllBlogsStatus: "idle",
    getAllBlogsError: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreateBlog.pending, (state) => {
        state.createBlogStatus = "loading";
      })
      .addCase(fetchCreateBlog.fulfilled, (state, action) => {
        state.createBlogStatus = "succeeded";
        state.createBlog = action.payload;
      })
      .addCase(fetchCreateBlog.rejected, (state, action) => {
        state.createBlogStatus = "failed";
        state.createBlogError = action.payload || "Create blog failed";
      })
      .addCase(fetchGetBlog.pending, (state) => {
        state.getBlogStatus = "loading";
      })
      .addCase(fetchGetBlog.fulfilled, (state, action) => {
        state.getBlogStatus = "succeeded";
        state.getBlog = action.payload;
      })
      .addCase(fetchGetBlog.rejected, (state, action) => {
        state.getBlogStatus = "failed";
        state.getBlogError = action.payload || "Getting blog failed";
      })
      .addCase(fetchGetAllBlogs.pending, (state) => {
        state.getAllBlogsStatus = "loading";
      })
      .addCase(fetchGetAllBlogs.fulfilled, (state, action) => {
        state.getAllBlogsStatus = "succeeded";
        state.getAllBlogs = action.payload;
      })
      .addCase(fetchGetAllBlogs.rejected, (state, action) => {
        state.getAllBlogsStatus = "failed";
        state.getAllBlogsError = action.payload || "Getting all blogs failed";
      });
  },
});

export default blogSlice.reducer;
