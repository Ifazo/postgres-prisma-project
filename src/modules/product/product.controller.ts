import { Request, Response } from "express";
import { prisma } from "../../app";

const createProduct = async (req: Request, res: Response) => {
    try {
        const result = await prisma.product.create({
            data: req.body,
        });
        return res.status(200).send({
            success: true,
            message: "Product created successfully",
            data: result,
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error,
        });
    }
};

const getProducts = async (req: Request, res: Response) => {
    try {
        const {
            search,
            skip,
            take,
        } = req.query;
        if (search) {
            const result = await prisma.product.findMany({
                where: {
                    OR: [
                        {
                            name: {
                                contains: search as string,
                                mode: "insensitive",
                            },
                        },
                        {
                            description: {
                                contains: search as string,
                                mode: "insensitive",
                            },
                        },
                    ],
                },
            });
            return res.status(200).send({
                success: true,
                message: "Products by search get successfully",
                data: result,
            });
        } else if (skip && take) {
            const result = await prisma.product.findMany({
                skip: Number(skip) || 0,
                take: Number(take) || 10,
            });
            return res.status(200).send({
                success: true,
                message: "Products get successfully",
                data: result,
            });
        } else {
            const result = await prisma.product.findMany({
                orderBy: {
                    createdAt: "desc",
                },
            });
            return res.status(200).send({
                success: true,
                message: "Products get successfully",
                data: result,
            });
        }
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error,
        });
    }
};

const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await prisma.product.findUnique({
            where: {
                id,
            },
        });
        return res.status(200).send({
            success: true,
            message: "Product get successfully",
            data: result,
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error,
        });
    }
};

const updateProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const result = await prisma.product.update({
            where: { id },
            data,
        });
        return res.status(200).send({
            success: true,
            message: "Product updated successfully",
            data: result,
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error,
        });
    }
};

const deleteProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await prisma.product.delete({
            where: {
                id,
            },
        });
        return res.status(200).send({
            success: true,
            message: "Product deleted successfully",
            data: result,
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error,
        });
    }
};

export const productController = {
    createProduct,
    getProducts,
    getProductById,
    updateProductById,
    deleteProductById,
};
