import { ENV } from '#core/constants';
import { House } from './house-list.api-model';

const url = `${ENV.BASE_API_URL}/houses`;

export const getHouseList = async (options?: RequestInit): Promise<House[]> => {
  return await fetch(url, options).then((response) => response.json());
};
