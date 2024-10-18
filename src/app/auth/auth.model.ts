import { ModuleModel } from "../users/module.model";
import { UserModel } from "../users/user.model";

export interface AuthModel {
    user: UserModel
    // modules: ModuleModel[]
}