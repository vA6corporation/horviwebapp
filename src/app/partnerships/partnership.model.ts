import { BusinessModel } from "../businesses/business.model";
import { PartnershipItemModel } from "./partnership-item.model";

export interface PartnershipModel {
  _id: string
  document: string
  name: string
  email: string
  address: string
  constitutedAt: string
  phoneNumber: string
  annexed: string
  representativeNationality: string
  representative: string
  representativeDocument: string
  business: BusinessModel|null
  partnershipItems: PartnershipItemModel[]
  businessId: string
  createdAt: any
  updatedAt: any
  userId: string
}
