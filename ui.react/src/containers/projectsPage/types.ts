import { ApiError } from "../../api/apiErrorHandler"

export interface ProjectsState {
  details?: ProjectsPayload
  error?: boolean
  errorMessage?: ApiError | null
  loading?: boolean
}

export interface ProjectsPayload {
  data: {
    title: string
    points:
      | {
          address: string
          name: string
        }[]
      | null
  }[]
  success: boolean
}

export const ProjectsInitialState: ProjectsState = {
  error: false,
  errorMessage: null,
  loading: true,
} as const
