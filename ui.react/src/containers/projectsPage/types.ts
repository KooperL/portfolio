export interface ProjectsState {
  details?: ProjectsPayload;
  error?: boolean;
  errorMessage?: string;
  loading?: boolean;
}


export interface ProjectsPayload {
  data: {
    title: string;
    points: {
      address: string;
      name: string
    }[] | null;
  }[]
  success: boolean;
}

export const ProjectsInitialState: ProjectsState = {
  error: false,
  errorMessage: '',
  loading: true
} as const;