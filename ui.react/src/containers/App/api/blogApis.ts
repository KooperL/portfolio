import { get, post } from '../../../api/restApi';
import { ContactPayload, ContactPOSTPayload } from '../../contactPage/types';
import { endpoints } from './endpoints';
import { Payload } from './types';


export const postBlogRegister = (data: {
  session_id: string;
  blog_username: string;
  blog_password: string;
}): Promise<ContactPOSTPayload>  => {
  const apiConfig = {
    headers: {},
    data: data
  }
  return post(endpoints['blogLogin'], apiConfig);
}

export const postBlogLogin = (
  data: {
    session_id: string;
  },
  authBasic: string
): Promise<ContactPOSTPayload>  => {
  const apiConfig = {
    headers: {'Authorization': `Basic ${authBasic}`},
    data: data
  }
  return post(endpoints['blogLogin'], apiConfig);
}