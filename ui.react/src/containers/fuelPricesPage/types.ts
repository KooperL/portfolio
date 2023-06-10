import { ApiError } from "../../api/apiErrorHandler"

export interface fuelpricesData {
  average: {
    x: string
    y: number
  }[]
  max: {
    x: string
    y: number
  }[]
  min: {
    x: string
    y: number
  }[]
  wholesale: {
    x: string
    y: number
  }[]
}

export interface FuelPricesResponse {
  fuelprices: fuelpricesData
  stats: {
    average: number
    relativePrice: number
    gradient: number
    decision: string
  }
}
