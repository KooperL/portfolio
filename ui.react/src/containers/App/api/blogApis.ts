import { get, post } from '../../../api/restApi';
import { BlogLoginPOSTPayload, BlogLoginPOSTResponse, BlogRegisterPOSTPayload, BlogRegisterPOSTResponse } from '../../blogLoginPage/types';
import { BlogPostCreatePOSTPayload } from '../../blogPostCreatePage/types';
import { BlogPostViewGETPayload } from '../../blogPostViewPage/types';
import { endpoints } from './endpoints';
import { Payload } from './types';


export const postBlogRegister = (data: BlogRegisterPOSTPayload): Promise<BlogRegisterPOSTResponse>  => {
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
    headers: {'Authorization': `Basic ${authBasic}`, 'withCredentials': true},
    data: data
  }
  return post(endpoints['blogLogin'], apiConfig);
}

export const postBlogRefresh = (
  data: {
    session_id: string;
  },
): Promise<BlogLoginPOSTResponse>  => {
  const apiConfig = {
    data: data,
    headers: {withCredentials: true}
  }
  return post(endpoints['blogRefresh'], apiConfig);
}

export const postPostCreate = (
  data: BlogPostCreatePOSTPayload,
  authJWT: string
): Promise<BlogLoginPOSTPayload>  => {
  const apiConfig = {
    headers: {'Authorization': `Bearer ${authJWT}`},
    data: data
  }
  return post(endpoints['blogPostCreate'], apiConfig);
}

export const getPostView = (
  data: BlogPostViewGETPayload,
  authJWT: string,
  id: number
): Promise<BlogLoginPOSTPayload>  => {
  console.log(data)
  const apiConfig = {
    headers: {'Authorization': `Bearer ${authJWT}`, 'content-type': 'application/json', 'content-length': JSON.stringify(data).length},
    data: data,
  }
  return post(`${endpoints['blogPost']}${id}`, apiConfig);
}