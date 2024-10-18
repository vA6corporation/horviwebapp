import { BeneficiaryModel } from "../beneficiaries/beneficiary.model";
import { BusinessModel } from "../businesses/business.model";
import { PartnershipModel } from "../partnerships/partnership.model";
import { GuaranteeModel } from "./guarantee.model";

export interface TemplateModel {
    _id: string
    businessId: string
    partnershipId: string
    startDate: string
    business: BusinessModel
    guaranties: GuaranteeModel[]
    partnership: PartnershipModel | null
    beneficiary: BeneficiaryModel
    tenderNumber: string
}