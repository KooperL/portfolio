import { get } from '../../../api/restApi';
import { SeqAlignPayload, SeqAlignPOST } from '../../seqAlignPage/types';
import { endpoints } from './endpoints';


export const fetchSeqAlign = (body: SeqAlignPOST): Promise<SeqAlignPayload>  => {
  const apiConfig = {
    headers: {},
    params: {...body}
  }
  return get(endpoints['seqalign'], apiConfig);
}