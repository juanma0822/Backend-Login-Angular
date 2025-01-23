import { Request, Response } from 'express';
import { Product } from '../models/product'; // Adjust the path as necessary

export const registerProduct = async (req: Request, res: Response) =>{

    const {name, description} = req.body;


    Product.create({
        name: name,
        description: description,
        status: 1,
    })

    res.json({
        msg: `Product ${name} created successfully`
    })
}

export const getProducts = async (req: Request, res: Response) =>{
    const listProducts = await Product.findAll();
    res.json(listProducts);
}