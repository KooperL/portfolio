interface ErrorPageProps {
  errorMessage: string
  errorType: 'NETWORK' | 'CLIENT'
  decorator?: string
}

export type { ErrorPageProps }
