import { get } from '../../../api/restApi';
import { HomePayload } from '../../homePage/types';
import { endpoints } from './endpoints';
import { Payload } from './types';

export const fetchHome = (): Promise<HomePayload>  => {
  const apiConfig = {
    headers: {},
    params: {}
  }
  return get(endpoints['home'], apiConfig);

}