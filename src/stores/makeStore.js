import { observable, action, makeObservable } from "mobx";
import axios from "axios";

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
    axios
      .get("http://localhost:5161/api/VehicleMakes")
      .then((result) => {
        this.data = result.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  saveData = (abrv, name) => {
    const url = "http://localhost:5161/api/PostVehicleMake";
    const data = {
      abrv: abrv,
      name: name,
    };
    axios
      .post(url, data)
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
        .delete(`http://localhost:5161/api/${id}`)
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
        `http://localhost:5161/api/VehicleMakesOrderBy?ascending=${ascendingOrder}`
      )
      .then((result) => {
        this.data = result.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getMakeList = (name) => {
    try {
      axios
        .get(`http://localhost:5161/api/VehicleMakesFilterBy?name=${name}`)
        .then((result) => {
          this.data = result.data;
        });
    } catch (error) {
      console.log(error);
    }
  };

  getPaged = (pageNumber, pageSize) => {
    try {
      axios
        .get(
          `http://localhost:5161/api/PagedVehicleMakes?PageNumber=${pageNumber}&PageSize=${pageSize}`
        )
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
