import axios from 'axios';

const BASE_URL = 'http://localhost:5161/api';

export const getVehicleMakes = () => {
  return axios.get(`${BASE_URL}/VehicleMakes`);
};

export const postVehicleMake = (data) => {
  return axios.post(`${BASE_URL}/PostVehicleMake`, data);
};

export const deleteVehicleMake = (id) => {
  return axios.delete(`${BASE_URL}/${id}`);
};

export const getVehicleMakesOrderBy = (ascendingOrder) => {
  return axios.get(`${BASE_URL}/VehicleMakesOrderBy?ascending=${ascendingOrder}`);
};

export const getVehicleMakesFilterBy = (name) => {
  return axios.get(`${BASE_URL}/VehicleMakesFilterBy?name=${name}`);
};

export const getPagedVehicleMakes = (pageNumber, pageSize) => {
  return axios.get(`${BASE_URL}/PagedVehicleMakes?PageNumber=${pageNumber}&PageSize=${pageSize}`);
};