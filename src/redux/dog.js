import { setLocalStorageItem, getLocalStorageItem } from "../common/utils";

const LOAD = 'dog/load';
const RESET = 'dog/reset';




export function load(val) {

  return {
    type: LOAD,
    value: val
  }
}


export function reset() {
  return {
    type: RESET

  }
}


const initialState = {
  breed:
  {
    weight: {},
    height: {}
  }
};

export default function reducer(state = initialState, action) {
  //console.log(action)
  switch (action.type) {
    case LOAD:

      return Object.assign(
        {},
        state,
        action.value
      );
    case RESET:

      return Object.assign(
        {},
        state,
        initialState
      );


    default:
      return state;
  }
}