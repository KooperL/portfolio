export interface LoggingResponsePayload {
  success: boolean
  error?: string
}

export interface CaptureRequestPayload {
  uuid: string
  message: string
}

export interface MonitorRequestPayload {
  uuid: string
  page: string
  prevPage?: string
}
