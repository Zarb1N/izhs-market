export interface IDeviceState {
  id: number;
  device_id: string;
  genius_number: number;
  name: string;
  number: string;
  applications_houses_id: number;
  applications_services_id: number[];
  stories_id: number[];
  promocodes_id: number[];
  viewed_houses_id: number[];
  favourites_houses_id: number[];
  image: IImage | null;
}

export interface IMeta {
  [key: string]: string
}

export interface IImage {
  path: string;
  name: string;
  type: string;
  size: number;
  mime: string;
  url: string;
  meta: IMeta;
}