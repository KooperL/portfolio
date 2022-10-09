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

export const postContact = (data: {
  session_id: string
  message: string
}): Promise<ContactPOSTPayload>  => {
  const apiConfig = {
    headers: {},
    data: data
  }
  return post(endpoints['contact'], apiConfig);
}