import { ApiError } from '../../../api/apiErrorHandler';
import { get } from '../../../api/restApi';
import { MrnaPayload, MrnaPOST } from '../../mrnaPage/types';
import { endpoints } from './endpoints';

export const fetchMrna = (body: MrnaPOST): Promise<ApiError | MrnaPayload>  => {
  const apiConfig = {
    headers: {},
    params: {
      ...body
    }
  }
  return get(endpoints['mrna'], apiConfig);
}