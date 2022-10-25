import { get, post } from '../../../api/restApi';
import { BlogHomeGETResponse, BlogLoginPOSTPayload, BlogLoginPOSTResponse, BlogRegisterPOSTPayload, BlogRegisterPOSTResponse, BlogUserGETResponse } from '../../blogLoginPage/types';
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
// snap send solve

export const postBlogLogin = (
  data: BlogLoginPOSTPayload,
  authBasic: string
): Promise<BlogLoginPOSTResponse>  => {
  const apiConfig = {
    headers: {'Authorization': `Basic ${authBasic}`},//, 'Access-Control-Allow-Credentials': 'true'},
    data: data,
    withCredentials: true,
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
    // headers: {'Access-Control-Allow-Credentials': 'true'}
    withCredentials: true,

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

export const getBlogHome = (
  params: BlogLoginPOSTPayload,
  authJWT: string,
): Promise<BlogHomeGETResponse>  => {
  const apiConfig = {
    headers: {'Authorization': `Bearer ${authJWT}`},
    params: params,
    withCredentials: true
  }
  return get(`${endpoints['blogHome']}`, apiConfig);
}

export const getUserView = (
  data: BlogPostViewGETPayload,
  authJWT: string,
  username: string
): Promise<BlogUserGETResponse>  => {
  const apiConfig = {
    headers: {'Authorization': `Bearer ${authJWT}`},
    params: data,
  }
  return get(`${endpoints['blogUser']}${username}`, apiConfig);
}