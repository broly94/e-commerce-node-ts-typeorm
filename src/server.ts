import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { userRouter } from './user/user.router';
import { ConfigServer } from './config/config';


class ServerBootstrap extends ConfigServer{

    public app: express.Application = express();
    private port: number = this.getNumberEnv('PORT');

    constructor() {
        super();
        this.dbConnect();
        this.middlewares();
        this.app.use('/api', this.routes());
        this.listen()
    }


    private async dbConnect() {
        try {
            await this.typeORMConfig().initialize();
            console.log('DBConnected')
        } catch (error) {
            throw new Error("Error Catch:" + error);
        }
    }

    private middlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(morgan('dev'));
        this.app.use(cors());
    }

    private routes(): Array<express.Router> {
        return [new userRouter().router];
    }


    private listen() {
        this.app.listen(this.port, () => {
            console.log(`listening on port: ${this.port}`);
        })
    }

}

new ServerBootstrap();