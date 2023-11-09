import { Request, Response } from "express";
import { prisma } from "../../app";

const createPost = async (req: Request, res: Response) => {
  try {
    const result = await prisma.post.create({
      data: req.body,
    });
    return res.send({
      success: true,
      statusCode: 200,
      message: "Post created successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

const getPosts = async (_req: Request, res: Response) => {
  try {
    const result = await prisma.post.findMany();
    return res.send({
      success: true,
      statusCode: 200,
      message: "Post get successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

const getPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await prisma.post.findUnique({
      where: {
        id,
      },
    });
    return res.send({
      success: true,
      statusCode: 200,
      message: "Post get successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await prisma.post.update({
      where: {
        id,
      },
      data: req.body,
    });
    return res.send({
      success: true,
      statusCode: 200,
      message: "Post updated successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await prisma.post.delete({
      where: {
        id,
      },
    });
    return res.send({
      success: true,
      statusCode: 200,
      message: "Post deleted successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

export const postController = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
};
