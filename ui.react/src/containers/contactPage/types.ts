export interface ContactState {
  details?: ContactPayload;
  error?: boolean;
  errorMessage?: string;
  loading?: boolean;
}

export interface ContactPOSTState {
  details?: ContactPOSTPayload;
  error?: boolean;
  errorMessage?: string;
  loading?: boolean;
}


export interface ContactPayload {
  data: {
    type: string;
    data: string[];
    text: string;
  }[]
  success: boolean;
}

export interface ContactPOSTPayload {
  success: boolean;
  error?: string

}

export interface ContactPOST {
  session_id: string
  message: string
}

export const ContactInitialState: ContactState = {
  error: false,
  errorMessage: '',
  loading: true
} as const;

export const ContactPOSTInitialState: ContactPOSTState = {
  error: false,
  errorMessage: '',
  loading: false
} as const;