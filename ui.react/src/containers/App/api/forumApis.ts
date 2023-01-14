import { get, post } from '../../../api/restApi';
import { BlogHomeGETResponse } from '../../forumHomePage/types';
import { BlogLoginPOSTPayload, BlogLoginPOSTResponse, BlogRegisterPOSTPayload, BlogRegisterPOSTResponse } from '../../forumLoginPage/types';
import { BlogPostCreatePOSTPayload } from '../../forumPostCreatePage/types';
import { BlogPostViewGETPayload } from '../../forumPostViewPage/types';
import { BlogUserGETResponse } from '../../forumUserPage/types';
import { endpoints } from './endpoints';
import { Payload } from './types';


export const postBlogRegister = (
  data: BlogRegisterPOSTPayload,
  authBasic: string
  ): Promise<BlogRegisterPOSTResponse>  => {
  const apiConfig = {
    headers: {'Authorization': `Basic ${authBasic}`},//, 'Access-Control-Allow-Credentials': 'true'},
    data: data
  }
  return post(endpoints['forumRegister'], apiConfig);
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
  return post(endpoints['forumLogin'], apiConfig);
}

export const postBlogLogout = (
  data: BlogLoginPOSTPayload,
  authJWT: string
): Promise<BlogRegisterPOSTResponse>  => {
  const apiConfig = {
    headers: {'Authorization': `Bearer ${authJWT}`},//, 'Access-Control-Allow-Credentials': 'true'},
    data: data,
    withCredentials: true,
  }
  return post(endpoints['forumLogout'], apiConfig);
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
  return post(endpoints['forumRefresh'], apiConfig);
}

export const postPostCreate = (
  data: BlogPostCreatePOSTPayload,
  authJWT: string
): Promise<BlogLoginPOSTPayload>  => {
  const apiConfig = {
    headers: {'Authorization': `Bearer ${authJWT}`},
    data: data
  }
  return post(endpoints['forumPostCreate'], apiConfig);
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
  return post(`${endpoints['forumPost']}${id}`, apiConfig);
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
  return get(`${endpoints['forumHome']}`, apiConfig);
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
  return get(`${endpoints['forumUser']}${username}`, apiConfig);
}