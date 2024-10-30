import { ApiError } from '@/types/task'

export function handleApiError(error: ApiError): string {
  if (error?.response?.data?.message) {
    return error.response.data.message
  }

  if (error?.message) {
    return error.message
  }

  return 'An error occurred while processing your request.'
}
