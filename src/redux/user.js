import { setLocalStorageItem, getLocalStorageItem } from "../common/utils";

const LOAD = 'user/load';
const RESET = 'user/reset';


export function load(user) {
  setLocalStorageItem("user", user)
  return {
    type: LOAD,
    value: user
  }
}

export function reset() {
  localStorage.clear()
  console.log("reset")
  return {
    type: RESET

  }
}


const initialState = {
  isLogin: false,
  token: '',
};

export default function reducer(state = getLocalStorageItem("user") || initialState, action) {
  //console.log(action)
  switch (action.type) {
    case LOAD:

      return Object.assign(
        {},
        state,
        action.value
      );
    case RESET:   
      return initialState;


    default:
      return state;
  }
}