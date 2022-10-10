import { get, post } from '../../../api/restApi';
import { BlogLoginPOSTPayload, BlogLoginPOSTResponse, BlogRegisterPOSTPayload } from '../../blogLoginPage/types';
import { endpoints } from './endpoints';
import { Payload } from './types';


export const postBlogRegister = (data: BlogRegisterPOSTPayload): Promise<BlogRegisterPOSTPayload>  => {
  const apiConfig = {
    headers: {},
    data: data
  }
  return post(endpoints['blogRegister'], apiConfig);
}

export const postBlogLogin = (
  data: BlogLoginPOSTPayload,
  authBasic: string
): Promise<BlogLoginPOSTResponse>  => {
  const apiConfig = {
    headers: {'Authorization': `Basic ${authBasic}`},
    data: data
  }
  return post(endpoints['blogLogin'], apiConfig);
}

export const postBlogRefresh = (
  data: {
    session_id: string;
  },
): Promise<BlogLoginPOSTPayload>  => {
  const apiConfig = {
  }
  return post(endpoints['blogLogin'], apiConfig);
}