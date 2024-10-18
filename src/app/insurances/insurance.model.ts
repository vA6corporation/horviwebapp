import { BusinessModel } from "../businesses/business.model"
import { CommercialModel } from "../commercials/commercial.model"
import { FinancierModel } from "../financiers/financier.model"
import { TenderModel } from "../tenders/tender.model"

export interface InsuranceModel {
    _id: string
    emitionAt: string
    type: string
    insuranceNumber: string
    insuranceGroupId: string
    policyNumber: string
    prima: number
    commission: number
    expirationAt: string
    isPaid: boolean
    financierId: string
    businessId: string
    brokerId: string
    bankId: string
    companyId: string
    commercialId: string
    observations: string
    tender: TenderModel
    financier: FinancierModel
    business: BusinessModel
    commercial: CommercialModel
    createdAt: string
}