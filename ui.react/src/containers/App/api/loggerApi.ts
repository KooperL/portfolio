import { ApiError } from '../../../api/apiErrorHandler';
import { get, post } from '../../../api/restApi';
import { ContactPayload, ContactPOSTPayload } from '../../contactPage/types';
import { endpoints } from './endpoints';
import { Payload } from './types';


export const postCapture = (params: {
  canvas_hash: string;
  uuid: string;
  innerHeight: number;
  outerHeight: number;
  innerWidth: number;
  outerWidth: number;
  actualHeight: number;
  actualWidth: number;
  pixelDepth: number;
  platform: string;
  cookieEnabled: boolean;
  darkMode: boolean;
}): Promise<ApiError | ContactPOSTPayload>  => {
  const apiConfig = {
    headers: {},
    params: params
  }
  return post(endpoints['capture'], apiConfig);
}

export const postMonitor = (params: {
  uuid: string
  session_id: string
  page: string
  prevPage?: string
  newVisit?: string
}): Promise<ApiError | ContactPOSTPayload>  => {
  const apiConfig = {
    headers: {},
    params: params
  }
  return post(endpoints['monitor'], apiConfig);
}

