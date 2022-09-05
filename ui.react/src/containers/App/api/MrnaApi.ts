import { get } from '../../../api/restApi';
import { MrnaPayload, MrnaPOST } from '../../mrnaPage/types';
import { endpoints } from './endpoints';

export const fetchMrna = (body: MrnaPOST): Promise<MrnaPayload>  => {
  const apiConfig = {
    headers: {},
    params: {
      ...body
    }
  }
  return get(endpoints['mrna'], apiConfig);
}