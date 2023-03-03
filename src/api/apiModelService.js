import axios from "axios";

const API_URL = "http://localhost:5161/api/";

export const getVehicleModels = () => {
  return axios.get(`${API_URL}VehicleModel/VehicleModels`);
};

export const postVehicleModel = (dataModel) => {
  return axios.post(`${API_URL}VehicleModel`, dataModel);
};

export const deleteVehicleModel = (id) => {
  return axios.delete(`${API_URL}VehicleModel/${id}`);
};

export const getVehicleModelsOrderBy = (ascendingOrder) => {
  return axios.get(
    `${API_URL}VehicleModel/VehicleModelsOrderBy?ascending=${ascendingOrder}`
  );
};

export const getVehicleModelsFilterBy = (name) => {
  return axios.get(
    `${API_URL}VehicleModel/VehicleModelsFilterBy?name=${name}`
  );
};

export const getPagedVehicleModels = (pageNumber, pageSize) => {
  return axios.get(
    `${API_URL}VehicleModel/PagedVehicleModels?PageNumber=${pageNumber}&PageSize=${pageSize}`
  );
};
