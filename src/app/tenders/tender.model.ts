import { BeneficiaryModel } from "../beneficiaries/beneficiary.model"
import { BusinessModel } from "../businesses/business.model"
import { CommercialModel } from "../commercials/commercial.model"
import { PartnershipModel } from "../partnerships/partnership.model"
import { TenderNodeModel } from "./tender-node.model"

export interface TenderModel {
    _id: string
    code: string
    objectDescription: string
    partnershipId: string
    commercial: CommercialModel
    business: BusinessModel
    partnership: PartnershipModel
    beneficiary: BeneficiaryModel
    nodes: TenderNodeModel[]
}