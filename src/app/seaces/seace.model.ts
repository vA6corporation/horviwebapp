import { NotificationModel } from "../notifications/notification.model"

export interface SeaceModel {
    publishedAt: string
    goodProAt: string
    adjudicatedAt: string
    nomenclature: string
    objectContract: string
    state: string
    referenceValue: string
    convener: string
    notification: NotificationModel | null
    winners: []
}