const LOGIN_SUCCESS = 'user/loginSuccess';
const LOGOUT_SUCCESS = 'user/logoutSuccess';


export function login(user){
  return {
    type: LOGIN_SUCCESS,
    value:user
  }
}

export function logout(){
  return {
    type: LOGOUT_SUCCESS
    
  }
}

const initialState = {
  firstName:"",
  lastName:"",
  avator:"",
  accessToken:""
};

export default function reducer(state = initialState, action){
  //console.log(action)
  switch (action.type){
  case LOGIN_SUCCESS:
    return Object.assign(
      {},
      state,
      action.value
    );
  case LOGOUT_SUCCESS:
    return Object.assign(
      {},
      state,
      initialState
    );


  default:
    return state;
  }
}