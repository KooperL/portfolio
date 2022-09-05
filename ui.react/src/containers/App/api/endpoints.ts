import { ApiEndpoints } from './types';
import { environmentConfig } from './environmentMappings';

const { apiHost } = environmentConfig();

export const endpoints: ApiEndpoints = {
  home: `${apiHost}/home`,
  property: `${apiHost}/property`,
  mrna: `${apiHost}/mrna`,
  seqalign: `${apiHost}/seqalign`,
  render: `${apiHost}/render`,
  secondary: `${apiHost}/secondary`,
  fuelprices: `${apiHost}/fuelprices`,
  tictactoe: `${apiHost}/tictactoe`,
  randombio: `${apiHost}/randombio`,
}

