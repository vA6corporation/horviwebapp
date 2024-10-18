import { BusinessModel } from "../businesses/business.model";

export interface PartnershipItemModel {
  _id: string
  percent: number
  businessId: string
  business: BusinessModel
}
