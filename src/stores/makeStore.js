import { observable, action, makeObservable } from 'mobx';
import { getVehicleMakes, postVehicleMake, deleteVehicleMake, getVehicleMakesOrderBy, getVehicleMakesFilterBy, getPagedVehicleMakes } from '../api/apiMakeService';

class MakeStore {
  constructor() {
    makeObservable(this, {
      data: observable,
      getData: action,
      saveData: action,
      deleteData: action,
      orderBy: action,
      getMakeList: action,
    });
  }

  data = [];

  getData = () => {
    getVehicleMakes()
      .then((result) => {
        this.data = result.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  saveData = (abrv, name) => {
    const data = {
      abrv: abrv,
      name: name,
    };
    postVehicleMake(data)
      .then((result) => {
        this.getData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  deleteData = (id) => {
    if (window.confirm('Confirm to delete') === true) {
      deleteVehicleMake(id)
        .then((result) => {
          this.getData();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  orderBy = (ascendingOrder) => {
    getVehicleMakesOrderBy(ascendingOrder)
      .then((result) => {
        this.data = result.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getMakeList = (name) => {
    try {
      getVehicleMakesFilterBy(name)
        .then((result) => {
          this.data = result.data;
        });
    } catch (error) {
      console.log(error);
    }
  };

  getPaged = (pageNumber, pageSize) => {
    try {
      getPagedVehicleMakes(pageNumber, pageSize)
        .then((result) => {
          this.data = result.data;
        });
    } catch (error) {
      console.log(error);
    }
  };
}

const makeStore = new MakeStore();

export default makeStore;
