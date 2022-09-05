import { get } from '../../../api/restApi';
import { SecondaryPayload, SecondaryPOST } from '../../secondaryPage/types';
import { endpoints } from './endpoints';


export const fetchSecondary = (body: SecondaryPOST): Promise<SecondaryPayload>  => {
  const apiConfig = {
    headers: {},
    params: {...body}
  }
  return get(endpoints['secondary'], apiConfig);
}