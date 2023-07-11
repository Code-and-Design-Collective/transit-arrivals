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
