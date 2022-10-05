import { get, post } from '../../../api/restApi';
import { ContactPayload, ContactPOSTPayload } from '../../contactPage/types';
import { endpoints } from './endpoints';
import { Payload } from './types';


export const postCapture = (params: {
  session_id: string
  fingerprint: string
}): Promise<ContactPOSTPayload>  => {
  const apiConfig = {
    headers: {},
    params: params
  }
  return post(endpoints['capture'], apiConfig);
}

export const postMonitor = (params: {
  session_id: string
  href: string
}): Promise<ContactPOSTPayload>  => {
  const apiConfig = {
    headers: {},
    params: params
  }
  return post(endpoints['monitor'], apiConfig);
}

// TODO