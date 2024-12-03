import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { Blog } from "../models/blogModel";
import { User } from "../models/userModel";

const createBlog = asyncHandler(async (req, res) => {
  // get data from req.body
  const { title, content } = req.body;

  // validate data
  if (!title || !content) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Please provide all required fields."));
  }

  // check user exists
  const user = await User.findById(req.user?._id);

  if (!user) {
    return res.status(404).json(new ApiResponse(404, null, "User not found."));
  }
  // create blog
  const blog = await Blog.create({
    title,
    content,
    author: user._id,
  });
  // check blog created
  const createdBlog = await Blog.findOne({ _id: blog._id });

  if (!createdBlog) {
    return res
      .status(500)
      .json(
        new ApiResponse(500, null, "Something went wrong while creating blog.")
      );
  }
  // send response
  return res
    .status(201)
    .json(new ApiResponse(201, blog._id, "Blog created successfully."));
});

const getBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  const blog = await Blog.findById(blogId);
  if (!blog) {
    return res.status(404).json(new ApiResponse(404, null, "Blog not found."));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, blog, "Blog found successfully."));
});

const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find();
  if (blogs.length === 0) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "There are no blogs."));
  }
  if (!blogs) {
    return res.status(404).json(new ApiResponse(404, null, "Blogs not found."));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, blogs, "Blogs found successfully."));
});

export { createBlog, getBlog, getAllBlogs };
