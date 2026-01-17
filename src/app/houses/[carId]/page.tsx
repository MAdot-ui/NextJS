import { House, api, mapHouseFromApiToVm } from '#pods/house';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ carId: string }>;
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params;
  const house = await api.getHouse(params.carId, { cache: 'no-store' }); // Check 'force-cache' too
  return {
    title: `Rent a house - House ${house.name} details`,
  };
};

const HousePage = async (props: Props) => {
  const params = await props.params;
    const house = await api.getHouse(params.carId, { cache: 'no-store' }); // Check 'force-cache' too
  console.log('House page', house);

  return <House house={mapHouseFromApiToVm(house)} />;
};

export default HousePage;
