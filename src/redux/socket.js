import { setLocalStorageItem, getLocalStorageItem } from "../common/utils";

const LOAD = 'socket/load';
const RESET = 'socket/reset';


export function load(socket) {
  setLocalStorageItem("socket", socket)
  return {
    type: LOAD,
    value: socket
  }
}

export function reset() {
  localStorage.clear()
  return {
    type: RESET

  }
}


const initialState = {
  isLogin: false,
  token: '',
  
};

export default function reducer(state = getLocalStorageItem("socket") || initialState, action) {
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