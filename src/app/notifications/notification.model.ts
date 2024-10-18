import { BusinessModel } from "../businesses/business.model";
import { CommercialModel } from "../commercials/commercial.model";
import { SeaceModel } from "../seaces/seace.model";

export interface NotificationModel {
    _id: string
    business: BusinessModel
    seace: SeaceModel
    commercial: CommercialModel
    objectContract: string
    publishedAt: string
    createdAt: string
    adjudicatedAt: string
}