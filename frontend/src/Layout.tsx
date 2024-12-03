import { Outlet, ScrollRestoration, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store/store";
import { fetchUserDetails } from "./features/UserSlice";
import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import SomethingWentWrong from "./pages/Error/SomethingWentWrong";
import ServerErrorPage from "./pages/Error/ServerErrorPage";
import GlobalLoader from "./components/loader/GlobalLoader/GlobalLoader";
import { toast } from "sonner";

function Layout() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const userDetailsStatus = useSelector(
    (state: RootState) => state.user.userDetailsStatus
  );
  const userDetailsError = useSelector(
    (state: RootState) => state.user.userDetailsError
  );
  useEffect(() => {
    if (userInfo) {
      dispatch(fetchUserDetails());
    }
  }, []);

  useEffect(() => {
    if (userDetailsError === "Refresh token expired") {
      toast.error("Your session has expired. Please sign in again.");
      navigate("/token-expired");
    }
  }, [userDetailsError]);
  return (
    <div className="min-h-[100vh] flex flex-col justify-center items-center">
      {userDetailsStatus === "loading" ? (
        <GlobalLoader />
      ) : userDetailsStatus === "failed" ? (
        <ServerErrorPage />
      ) : userDetailsStatus === "succeeded" || userDetailsStatus === "idle" ? (
        <ErrorBoundary fallback={<SomethingWentWrong />}>
          <Header />
          <main className="flex-1 flex justify-center items-center my-6">
            <ScrollRestoration />
            <Outlet />
          </main>
        </ErrorBoundary>
      ) : null}
    </div>
  );
}

export default Layout;
