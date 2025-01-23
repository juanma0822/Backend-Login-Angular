import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user'; // Adjust the path as necessary
import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';


export const register = async (req: Request, res: Response) =>{

    const {name, lastname, password, email, credential} = req.body;

    
    const userUnique = await User.findOne({where: { [Op.or]: {email: email, credential: credential}}});
    
    
    if(userUnique){
        return res.status(400).json({
            msg: `El usuario ya existe con el email ${email}, intente otro porfavor`
        })
    }
    
    console.log("Estoy por aquí")
    const passwordHash = await bcrypt.hash(password, 10);

    try {
        User.create({
            name: name,
            lastname: lastname,
            email: email,
            password: passwordHash,
            credential: credential,
            status: 1,
        })
    
        res.json({
            msg: `User ${name} ${lastname} created successfully`
        })
    } catch (error) {
        msg: `Existe un error al crear el usuario ${name} ${lastname} created successfully`
    }

    
}

export const login = async (req: Request, res: Response) =>{
    const { password, email} = req.body;
    const userExist: any = await User.findOne({where: { email: email}});

    
    if(!userExist){
        return res.status(400).json({
            msg: 'El usuario no se encuentra en la base de datos'
        })
    }

    const passwordValid= await bcrypt.compare(password, userExist.password);

    if(!passwordValid){
        return res.status(400).json({
            msg: 'La contraseña es incorrecta'
        })
    }

    const token = jwt.sign({
        email: email
    }, 
    process.env.SECRET_KEY || 'JuanmaSoft',{
        expiresIn: '1h'
    });

    res.json({token})
}