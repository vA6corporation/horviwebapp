import { ExperienceModel } from "../experiences/experience.model"
import { ShareholderModel } from "../shareholders/shareholder.model"

export interface BusinessModel {
    _id: string
    document: string
    name: string
    email: string
    observations: string
    shareholders: ShareholderModel[]
    experiences: ExperienceModel[]
}