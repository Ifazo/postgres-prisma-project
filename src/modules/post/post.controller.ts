import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const createPost = async (req: Request, res: Response) => {
  const result = await prisma.post.create({
    data: req.body,
  });

  return res.send({
    success: true,
    statusCode: 200,
    message: "Post created successfully",
    data: result,
  });
};

const getPosts = async (_req: Request, res: Response) => {
  const result = await prisma.post.findMany();

  return res.send({
    success: true,
    statusCode: 200,
    message: "Post get successfully",
    data: result,
  });
};

const getPost = async (req: Request, res: Response) => {
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
};

const updatePost = async (req: Request, res: Response) => {
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
};

const deletePost = async (req: Request, res: Response) => {
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
};

export const postController = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
};
