import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "@/features/UserSlice";
import BlogSlice from "@/features/blogSloce";

const store = configureStore({
  reducer: {
    user: UserSlice,
    blog: BlogSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
