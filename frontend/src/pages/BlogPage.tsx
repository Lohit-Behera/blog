import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchGetBlog } from "@/features/blogSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Avatar from "@/components/Avatar";
import { format } from "date-fns";
import ServerErrorPage from "./Error/ServerErrorPage";
import BlogLoader from "@/components/loader/BlogLoader";

function BlogPage() {
  const { blogId } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const blog = useSelector((state: RootState) => state.blog.getBlog.data);
  const getBlogStatus = useSelector(
    (state: RootState) => state.blog.getBlogStatus
  );

  useEffect(() => {
    if (blogId !== blog._id) {
      dispatch(fetchGetBlog(blogId as string));
    }
  }, [blogId]);

  return (
    <>
      {getBlogStatus === "loading" ? (
        <BlogLoader />
      ) : getBlogStatus === "failed" ? (
        <ServerErrorPage />
      ) : getBlogStatus === "succeeded" ? (
        <Card className="w-[98%] md:w-[90%]">
          <CardHeader>
            <CardTitle className="flex space-x-2">
              <Avatar
                className="text-base"
                latter={blog?.authorName ? blog.authorName[0] : "A"}
              />
              <p className="text-sm md:text-base">{blog?.authorName}</p>
            </CardTitle>
            <CardTitle>{blog?.title}</CardTitle>
            <CardDescription>
              {blog.createdAt ? format(blog.createdAt, "PPP") : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div dangerouslySetInnerHTML={{ __html: blog?.content }} />
          </CardContent>
        </Card>
      ) : null}
    </>
  );
}

export default BlogPage;
