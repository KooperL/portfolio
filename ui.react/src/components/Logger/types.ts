export interface LoggingPOSTResponse {
  success: boolean
  error?: string
}

export interface CapturePOST {
  uuid: string
  message: string
}

export interface MonitorPOST {
  uuid: string
  page: string
  prevPage?: string
}
