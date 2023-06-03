import { Dispatcher } from "flux";
import GenericService from "services/repository";
import Constants from "./constants";

var AppDispatcher = new Dispatcher();

class Actions {
  constructor(props) {
    this.service = new GenericService({ endpoint: props.endpoint });
    this.object = props.objectType;
  }

  findItems = () => {
    this.service.all().then((result) => {
      if (result.statusText != "OK") {
        console.error(result.data);
      } else {
        AppDispatcher.dispatch({
          actionType: Constants.FIND_ALL_ITEM + "_" + this.object,
          items: result.data,
        });
      }
    });
  };
  pagedItems = (pagingInfor) => {
    this.service.paged(pagingInfor).then((result) => {
      if (result.statusText != "OK") {
        console.error(result.data);
      } else {
        AppDispatcher.dispatch({
          actionType: Constants.PAGED_ITEM + "_" + this.object,
          pagingObject: result.data,
        });
      }
    });
  };
  findItem = (id) => {
    this.service.getSingle(id).then((result) => {
      if (result.statusText != "OK") {
        console.error(result.data);
      } else {
        AppDispatcher.dispatch({
          actionType: Constants.FIND_SINGLE_ITEM + "_" + this.object,
          item: result.data,
        });
      }
    });
  };
  showItems = (items) => {
    AppDispatcher.dispatch({
      actionType: Constants.SHOW_ALL_ITEM + "_" + this.object,
      items: items,
    });
  };
  showItem = (item) => {
    AppDispatcher.dispatch({
      actionType: Constants.SHOW_SINGLE_ITEM + "_" + this.object,
      item: item,
    });
  };
  addItem = (item) => {
    this.service.addItem(item).then((result) => {
      if (result.statusText != "OK") {
        console.error(result.data);
      } else {
        AppDispatcher.dispatch({
          actionType: Constants.ADD_ITEM + "_" + this.object,
          item: item,
        });
      }
    });
  };
  updateItem = (id, item) => {
    this.service.update(id, item).then((result) => {
      if (result.statusText != "OK") {
        console.error(result.data);
      } else {
        AppDispatcher.dispatch({
          actionType: Constants.UPDATE_ITEM + "_" + this.object,
          item: item,
        });
      }
    });
  };
  removeItem = (id) => {
    // this.service.delete(id).then(result => {
    //     if(result.statusText != 'OK'){
    //         console.log(result.data);
    //     }
    //     else{
    //         AppDispatcher.dispatch({
    //             actionType: Constants.REMOVE_ITEM + "_" + this.object,
    //             index: id
    //         });
    //     }

    // });
    AppDispatcher.dispatch({
      actionType: Constants.REMOVE_ITEM + "_" + this.object,
      index: id,
    });
  };
  increaseItem = (index) => {
    AppDispatcher.dispatch({
      actionType: Constants.INCREASE_ITEM + "_" + this.object,
      index: index,
    });
  };
  decreaseItem = (index) => {
    AppDispatcher.dispatch({
      actionType: Constants.DECREASE_ITEM + "_" + this.object,
      index: index,
    });
  };
}

export default Actions;
