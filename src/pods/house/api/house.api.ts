import { ENV } from '#core/constants';
import { House } from './house.api-model';

const url = `${ENV.BASE_API_URL}/houses`;

export const getHouse = async (
  id: string,
  options?: RequestInit
): Promise<House> => {
  const response = await fetch(`${url}/${id}`, options);
  if (!response.ok) {
    throw new Error(`Failed to fetch house: ${response.statusText}`);
  }
  const data = await response.json();
  if (!data) {
    throw new Error(`House with id ${id} not found`);
  }
  return data;
};

export const bookHouse = async (house: Partial<House> & { id: string; isBooked: boolean }): Promise<boolean> => {
  await fetch(`${url}/${house.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(house),
  });
  return true;
};
