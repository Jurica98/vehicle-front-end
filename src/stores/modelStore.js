import { observable, action, makeObservable } from "mobx";
import axios from "axios";

class ModelStore {
  constructor() {
    makeObservable(this, {
      dataModel: observable,
      getData: action,
      saveData: action,
      deleteData: action,
      orderBy: action,
      getModelList: action,
    });
  }

  dataModel = [];

  getData = () => {
    axios
      .get("http://localhost:5161/api/VehicleModel/VehicleModels")
      .then((result) => {
        this.dataModel = result.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  saveData = (abrv, name, vehicleMakeEntityId) => {
    const url = "http://localhost:5161/api/VehicleModel";
    const dataModel = {
      name: name,
      abrv: abrv,
      vehicleMakeEntityId: vehicleMakeEntityId,
    };
    axios
      .post(url, dataModel)
      .then((result) => {
        this.getData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  deleteData = (id) => {
    if (window.confirm("Confirm to delete") === true) {
      axios
        .delete(`http://localhost:5161/api/VehicleModel/${id}`)
        .then((result) => {
          this.getData();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  orderBy = (ascendingOrder) => {
    axios
      .get(
        `http://localhost:5161/api/VehicleModel/VehicleModelsOrderBy?ascending=${ascendingOrder}`
      )
      .then((result) => {
        this.dataModel = result.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getModelList = (name) => {
    try {
      axios
        .get(`http://localhost:5161/api/VehicleModel/VehicleModelsFilterBy?name=${name}`)
        .then((result) => {
          this.dataModel = result.data;
        });
    } catch (error) {
      console.log(error);
    }
  };

  getPaged = (pageNumber, pageSize) => {
    try {
      axios
        .get(
          `http://localhost:5161/api/VehicleModel/PagedVehicleModels?PageNumber=${pageNumber}&PageSize=${pageSize}`
        )
        .then((result) => {
          this.dataModel = result.data;
        });
    } catch (error) {
      console.log(error);
    }
  };
}

const modelStore = new ModelStore();

export default modelStore;
