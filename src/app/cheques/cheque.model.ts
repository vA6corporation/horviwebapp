import { SuretyModel } from "../sureties/surety.model"

export interface ChequeModel {
    _id: string
    price: number
    observations: string
    paymentType: string
    paymentAt: string
    extensionAt: string | null
    deletedAt: string | null
    currencyCode: string
    isPaid: boolean
    suretyId: string
    surety: SuretyModel
    businessId: string
}
