import { ApiError } from "../../api/apiErrorHandler"

export interface PropertyIndexResponse {
  highest: {
    suburb: string
    meanMeans: number
    distcc: number
    count: number
    meanGradient: number
    desirability: number
  }[]
  stats: {
    Min: number
    Q1: number
    median: number
    Q3: number
    Max: number
    IQR: number
  }
}

export interface PropertySearchResponse {
  suburb: string
  stats: {
    mean: number
    distance: number
    spread: number
    listingsCaptured: number
    linearGradient: number
    desirability: number
  }
  details: {
    pricedata: {
      count: number
      datekey: string[]
      desirability: number
      frequency: number[]
      mean_gradient: number[]
      mean_means: number
      mean_stds: number
      means: number[]
      std_gradient: number[]
      stds: number[]
    }
  }
}

export interface PropertySearchRequest {
  prop_suburb: string
}
