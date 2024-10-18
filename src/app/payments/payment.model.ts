import { BankModel } from "../providers/bank.model"

export interface PaymentModel {
    charge: number
    paymentAt: string
    parentId: string
    bankId: string
    type: string
    onModel: string
    companyId: string
    bank: BankModel
}