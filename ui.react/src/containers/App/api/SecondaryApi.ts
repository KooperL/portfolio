import { ApiError } from '../../../api/apiErrorHandler';
import { get } from '../../../api/restApi';
import { SecondaryPayload, SecondaryPOST } from '../../secondaryPage/types';
import { endpoints } from './endpoints';


export const fetchSecondary = (body: SecondaryPOST): Promise<ApiError | SecondaryPayload>  => {
  const apiConfig = {
    headers: {},
    params: {...body}
  }
  return get(endpoints['secondary'], apiConfig);
}