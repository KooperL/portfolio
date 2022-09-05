import { get } from '../../../api/restApi';
import { FuelPricesPayload } from '../../fuelPricesPage/types';
import { endpoints } from './endpoints';
import { Payload } from './types';

export const fetchFuelPrices = (): Promise<FuelPricesPayload>  => {
  const apiConfig = {
    headers: {},
    params: {}
  }
  return get(endpoints['fuelprices'], apiConfig);
}