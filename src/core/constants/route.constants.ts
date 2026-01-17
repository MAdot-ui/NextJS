export interface Routes {
  root: string;
  houseList: string;
  house: (houseId: string) => string;
}

export const routeConstants: Routes = {
  root: '/',
  houseList: '/houses',
  house: (houseId: string) => `/houses/${houseId}`,
};
