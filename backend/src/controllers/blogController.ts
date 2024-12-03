import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { Blog } from "../models/blogModel";
import { User } from "../models/userModel";
import mongoose from "mongoose";

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
  const blog = await Blog.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(blogId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: {
        path: "$user",
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        content: 1,
        author: 1,
        createdAt: 1,
        updatedAt: 1,
        authorName: "$user.name",
      },
    },
  ]);
  if (!blog) {
    return res.status(404).json(new ApiResponse(404, null, "Blog not found."));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, blog[0], "Blog found successfully."));
});

const getAllBlogs = asyncHandler(async (req, res) => {
  const aggregate = Blog.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: {
        path: "$user",
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        content: 1,
        author: 1,
        createdAt: 1,
        updatedAt: 1,
        authorName: "$user.name",
      },
    },
  ]);
  const blogs = await Blog.aggregatePaginate(aggregate, {
    page: 1,
    limit: 10,
  });
  if (!blogs) {
    return res.status(404).json(new ApiResponse(404, null, "Blogs not found."));
  }
  if (blogs.docs.length === 0) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "There are no blogs."));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, blogs, "Blogs found successfully."));
});

export { createBlog, getBlog, getAllBlogs };
