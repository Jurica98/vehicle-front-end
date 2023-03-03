import { observable, action, makeObservable } from "mobx";
import { getVehicleModels, postVehicleModel, deleteVehicleModel, getVehicleModelsOrderBy, getVehicleModelsFilterBy, getPagedVehicleModels} from '../api/apiModelService';

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
    getVehicleModels()
      .then((result) => {
        this.dataModel = result.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  saveData = (abrv, name, vehicleMakeEntityId) => {
    const dataModel = {
      name: name,
      abrv: abrv,
      vehicleMakeEntityId: vehicleMakeEntityId,
    };
      postVehicleModel(dataModel)
      .then((result) => {
        this.getData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  deleteData = (id) => {
    if (window.confirm("Confirm to delete") === true) {
      deleteVehicleModel(id)
        .then((result) => {
          this.getData();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  orderBy = (ascendingOrder) => {
    getVehicleModelsOrderBy(ascendingOrder)
      .then((result) => {
        this.dataModel = result.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getModelList = (name) => {
    try {
      getVehicleModelsFilterBy(name)
        .then((result) => {
          this.dataModel = result.data;
        });
    } catch (error) {
      console.log(error);
    }
  };

  getPaged = (pageNumber, pageSize) => {
    try {
      getPagedVehicleModels(pageNumber, pageSize)
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
