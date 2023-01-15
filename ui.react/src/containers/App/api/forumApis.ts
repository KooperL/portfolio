import { ApiError } from '../../../api/apiErrorHandler';
import { get, post } from '../../../api/restApi';
import { ForumHomeGETResponse } from '../../forumHomePage/types';
import { ForumLoginPOSTPayload, ForumLoginPOSTResponse, ForumRegisterPOSTPayload, ForumRegisterPOSTResponse } from '../../forumLoginPage/types';
import { ForumPostCreatePOSTPayload } from '../../forumPostCreatePage/types';
import { ForumPostViewGETPayload } from '../../forumPostViewPage/types';
import { ForumUserGETResponse } from '../../forumUserPage/types';
import { endpoints } from './endpoints';
import { Payload } from './types';


export const postForumRegister = (
  data: ForumRegisterPOSTPayload,
  authBasic: string
  ): Promise<ApiError | ForumRegisterPOSTResponse>  => {
  const apiConfig = {
    headers: {'Authorization': `Basic ${authBasic}`},//, 'Access-Control-Allow-Credentials': 'true'},
    data: data
  }
  return post(endpoints['forumRegister'], apiConfig);
}
// snap send solve

export const postForumLogin = (
  data: ForumLoginPOSTPayload,
  authBasic: string
): Promise<ApiError | ForumLoginPOSTResponse>  => {
  const apiConfig = {
    headers: {'Authorization': `Basic ${authBasic}`},//, 'Access-Control-Allow-Credentials': 'true'},
    data: data,
    withCredentials: true,
  }
  return post(endpoints['forumLogin'], apiConfig);
}

export const postForumLogout = (
  data: ForumLoginPOSTPayload,
  authJWT: string
): Promise<ApiError | ForumRegisterPOSTResponse>  => {
  const apiConfig = {
    headers: {'Authorization': `Bearer ${authJWT}`},//, 'Access-Control-Allow-Credentials': 'true'},
    data: data,
    withCredentials: true,
  }
  return post(endpoints['forumLogout'], apiConfig);
}

export const postForumRefresh = (
  data: {
    session_id: string;
  },
): Promise<ApiError | ForumLoginPOSTResponse>  => {
  const apiConfig = {
    data: data,
    // headers: {'Access-Control-Allow-Credentials': 'true'}
    withCredentials: true,

  }
  return post(endpoints['forumRefresh'], apiConfig);
}

export const postPostCreate = (
  data: ForumPostCreatePOSTPayload,
  authJWT: string
): Promise<ApiError | ForumLoginPOSTPayload>  => {
  const apiConfig = {
    headers: {'Authorization': `Bearer ${authJWT}`},
    data: data
  }
  return post(endpoints['forumPostCreate'], apiConfig);
}

export const getPostView = (
  data: ForumPostViewGETPayload,
  authJWT: string,
  id: number
): Promise<ApiError | ForumLoginPOSTPayload>  => {
  console.log(data)
  const apiConfig = {
    headers: {'Authorization': `Bearer ${authJWT}`, 'content-type': 'application/json', 'content-length': JSON.stringify(data).length},
    data: data,
  }
  return post(`${endpoints['forumPost']}${id}`, apiConfig);
}

export const getForumHome = (
  params: ForumLoginPOSTPayload,
  authJWT: string,
): Promise<ApiError | ApiError | ForumHomeGETResponse>  => {
  const apiConfig = {
    headers: {'Authorization': `Bearer ${authJWT}`},
    params: params,
    withCredentials: true
  }
  return get(`${endpoints['forumHome']}`, apiConfig);
}

export const getUserView = (
  data: ForumPostViewGETPayload,
  authJWT: string,
  username: string
): Promise<ApiError | ApiError | ForumUserGETResponse>  => {
  const apiConfig = {
    headers: {'Authorization': `Bearer ${authJWT}`},
    params: data,
  }
  return get(`${endpoints['forumUser']}${username}`, apiConfig);
}