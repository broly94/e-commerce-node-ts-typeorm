import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { UserEntity } from "../user/entities/user.entity";

export abstract class ConfigServer {

    constructor() {
        const nodeNameEnv = this.createPathEnv(this.nodeEnv);
        console.log(nodeNameEnv);
        dotenv.config({
            path: nodeNameEnv
        });
    }

    //OBTIENE EL SETEO QUE ESTA DESDE EL PACKAGE.JSON
    public getEnvironment(k: string): string | undefined {
        return process.env[k];
    }

    //SE LLAMA EN EL SERVIDOR PARA PASARLE LA VARIABLE QUE TIENE QUE LLAMAR (PORT) 
    public getNumberEnv(k: string): number {
        return Number(this.getEnvironment(k))
    }

    //RETORNA EL VALOR DE PROCESS.ENV.NODE_ENV
    public get nodeEnv(): string {
        return this.getEnvironment("NODE_ENV")?.trim() || "";
    }

    public createPathEnv(path: string): string {
        const arrEnv: string[] = ["env"];
        if (arrEnv.length > 0) {
            const arrayToString = path.split(".");
            arrEnv.unshift(...arrayToString);
        }
        if (!path) {
            arrEnv.shift();
        }
        return "." + arrEnv.join(".");
    }

    public typeORMConfig() {
        const portNumber = Number(this.getEnvironment("DB_PORT"));
        const AppDataSource = new DataSource({
            type: "mysql",
            host: this.getEnvironment("DB_HOST"),
            port: portNumber,
            username: this.getEnvironment("DB_USER"),
            password: this.getEnvironment("DB_PASSWORD"),
            database: this.getEnvironment("DB_DATABASE"),
            synchronize: true,
            logging: false,
            entities: [UserEntity],  
            subscribers: [],
            migrations: [],
            namingStrategy:new SnakeNamingStrategy()
        })

        return AppDataSource
    }

}
//Dirname entities
//__dirname + "/../**/*.entities{.ts,.js}"