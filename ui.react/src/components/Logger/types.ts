export interface CapturePOSTPayload {
  success: boolean;
  error?: string

}

export interface CapturePOST {
  session_id: string
  message: string
}


export interface MonitorPOSTPayload {
  success: boolean;
  error?: string

}

export interface MonitorPOST {
  session_id: string
  href: string
}
