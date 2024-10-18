import { ActiveModuleModel } from "../auth/active-module.model"

export class UserModel {
    _id: string = ''
    name: string = ''
    email: string = ''
    password: string = ''
    isAdmin: boolean = false
    commercialId: string = ''
    privileges: ActiveModuleModel = {}
}
