import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchGetBlog } from "@/features/blogSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Avatar from "@/components/Avatar";
import { format } from "date-fns";

function BlogPage() {
  const { blogId } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const blog = useSelector((state: RootState) => state.blog.getBlog.data);

  useEffect(() => {
    if (blogId !== blog._id) {
      dispatch(fetchGetBlog(blogId as string));
    }
  }, [blogId]);

  return (
    <Card className="w-[98%] md:w-[90%]">
      <CardHeader>
        <CardTitle className="flex space-x-2">
          <Avatar
            className="text-base  "
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
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}

export default BlogPage;
