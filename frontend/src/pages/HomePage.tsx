import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { Blog, fetchGetAllBlogs } from "@/features/blogSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Avatar from "@/components/Avatar";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import ServerErrorPage from "./Error/ServerErrorPage";
import HomePageLoader from "@/components/loader/HomePageLoader";

function HomePage() {
  const dispatch = useDispatch<AppDispatch>();

  const data = useSelector((state: RootState) => state.blog.getAllBlogs.data);
  const blogs = data.docs || [];
  const getAllBlogsStatus = useSelector(
    (state: RootState) => state.blog.getAllBlogsStatus
  );

  useEffect(() => {
    dispatch(fetchGetAllBlogs());
  }, []);

  return (
    <>
      {getAllBlogsStatus === "loading" ? (
        <HomePageLoader />
      ) : getAllBlogsStatus === "failed" ? (
        <ServerErrorPage />
      ) : getAllBlogsStatus === "succeeded" ? (
        <>
          {!blogs.length || blogs.length === 0 ? (
            <h3 className="text-lg font-semibold">No Blogs Found</h3>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-[98%] md:[95%]">
              {blogs.map((blog: Blog) => (
                <Card key={blog._id}>
                  <CardHeader>
                    <CardTitle className="flex space-x-2">
                      <Avatar
                        className="text-base  "
                        latter={blog?.authorName ? blog.authorName[0] : "A"}
                      />
                      <p className="text-sm">{blog?.authorName}</p>
                    </CardTitle>
                    <CardTitle>
                      <Link
                        className="hover:underline line-clamp-1"
                        to={`/post/${blog._id}`}
                      >
                        {blog.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Created At:{" "}
                      {blog.createdAt ? format(blog.createdAt, "PPP") : ""}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </>
      ) : null}
    </>
  );
}

export default HomePage;
