import { PartnershipModel } from "../partnerships/partnership.model";

export interface BeneficiaryModel {
    _id?: string
    document: string
    name: string
    email: string
    phoneNumber: string
    annexed: string
    createdAt: any
    updatedAt: any
    partnershipId: string
    partnership?: PartnershipModel
    userId: string
    businessId: string
    legalRepresentative: string
    positionLegalRepresentative: string
    contactPerson: string
    positioncontactPerson: string
}
