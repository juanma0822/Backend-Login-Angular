import express, { Application } from 'express';
import sequelize from '../database/connection';
import RUser from '../routes/user';
import RProduct from '../routes/product';
import { User } from '../models/user';
import { Product } from './product';

class Server{

    private app: Application;
    private port: string;
    constructor(){
        
        this.app = express();
        this.port = process.env.PORT || '3017';
        this.listen();
        this.midlewares();
        this.router();
        this.DBconnect();

    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        })
    }

    router(){
        this.app.use(RUser);
        this.app.use(RProduct);
    }

    midlewares(){
        this.app.use(express.json());
    }

    async DBconnect(){
        try {
            //await sequelize.authenticate();
            //console.log('Connection has been established successfully.');
            await User.sync();
            await Product.sync();
            console.log('The table for the User model was just (re)created!');
            console.log('Conexion exitosa');
        } catch (error) {
            console.log('Error de conexion: ',error);
        }
    }
    
}

export default Server