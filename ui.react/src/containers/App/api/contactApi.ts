import { get, post } from '../../../api/restApi';
import { ContactPayload, ContactPOSTPayload } from '../../contactPage/types';
import { endpoints } from './endpoints';
import { Payload } from './types';

export const fetchContact = (): Promise<ContactPayload>  => {
  const apiConfig = {
    headers: {},
    params: {}
  }
  return get(endpoints['contact'], apiConfig);
}

export const postContact = (params: {
  session_id: string
  message: string
}): Promise<ContactPOSTPayload>  => {
  const apiConfig = {
    headers: {},
    params: params
  }
  return post(endpoints['contact'], apiConfig);
}