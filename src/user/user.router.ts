import { userController } from "./controllers/user.controller";
import { BaseRouter } from "../shared/router/router";

export class userRouter extends BaseRouter<userController> {

    constructor(){
        super(userController);
    }

    routes(): void {
        this.router.get('/user', (req, res) => this.controller.getUser(req, res));
    }

}