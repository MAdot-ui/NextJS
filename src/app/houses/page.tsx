import { HouseList, api, mapHouseListFromApiToVm } from '#pods/houses-list';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rent a house - House list',
};

const HouseListPage = async () => {
  // cache: 'force-cache' is the default value
  const houseList = await api.getHouseList({ cache: 'no-store' });
  console.log('House list at build time:', { houseList });

  return <HouseList houseList={mapHouseListFromApiToVm(houseList)} />;
};

export default HouseListPage;
