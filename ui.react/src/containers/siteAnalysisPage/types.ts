export interface siteAnalysisResponse {
    siteTraffic: {
      source: string
      destination: string
      count: number
    }[]
    fingerprint: {
      uuid: string
      CanvasHash: string
      platform: string
      browser: string
      actualHeight: number
      actualWidth: number
      ip: string
    }
    uniqueVisits: number
    pages: {
      page: string
      count: number
    }[]
}
