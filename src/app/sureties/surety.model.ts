import { BeneficiaryModel } from "../beneficiaries/beneficiary.model";
import { BusinessModel } from "../businesses/business.model";
import { ChequeModel } from "../cheques/cheque.model";
import { CommercialModel } from "../commercials/commercial.model";
import { DepositModel } from "../deposits/deposit.model";
import { FinancierModel } from "../financiers/financier.model";
import { PartnershipModel } from "../partnerships/partnership.model";
import { TenderModel } from "../tenders/tender.model";
import { SuretyStatus } from "./sureties/surety-status.enum";
import { SuretyNodeModel } from "./surety-node.model";

export interface SuretyModel {
    _id: string
    status: SuretyStatus
    statusLabel: string
    prima: number
    price: number
    policyNumber: string
    object: string
    diffDays: number
    guarantee: number
    startDate: string
    endDate: string
    businessId: string
    financierId: string
    business: BusinessModel
    financier: FinancierModel
    beneficiary: BeneficiaryModel
    partnership: PartnershipModel | null
    tender: TenderModel
    tenderId: string
    commercial: CommercialModel
    suretyType: string
    suretyLabel: string
    createdAt: any
    updatedAt: any
    nodes: SuretyNodeModel[]
    cheques: ChequeModel[]
    deposits: DepositModel[]
}
