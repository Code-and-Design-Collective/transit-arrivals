export interface ArrivalsResponse {
  resultSet: {
    detour: object[];
    arrival: object[];
    queryTime: number;
    location: object[];
  };
}

export interface ArrivalsResultSet {
  detour: object[];
  arrival: object[];
  queryTime: number;
  location: object[];
}

// export interface StopArrivals {
//   detour: {
//     info_link_url: string;
//     end: number;
//     system_wide_flag: boolean;
//     id: number;
//     header_text: string;
//     system_wide_message: any;
//     begin: number;
//     desc: string;
//   }[];
//   arrival: {
//     routeColor: string;
//     scheduled: number;
//     shortSign: string;
//     estimated: number;
//     detoured: boolean;
//     dir: number;
//     blockID: number;
//     route: number;
//     nextBusFeed: boolean;
//     routeSubType: string;
//     fullSign: string;
//     streetCar: boolean;
//     id: string;
//     newTrip: boolean;
//     locid: number;
//     status: string;
//   }[];
//   queryTime: number;
//   location: {
//     lng: number;
//     passengerCode: string;
//     id: number;
//     dir: string;
//     lat: number;
//     desc: string;
//   }[];
// }