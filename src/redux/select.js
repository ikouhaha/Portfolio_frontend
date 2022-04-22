
//selected dog
const LOAD_DOG = 'select/loadDog';
const RESET_DOG = 'select/reset';


export function selectDog(dog) {
  return {
    type: LOAD_DOG,
    value: dog
  }
}

export function resetDog() {
  return {
    type: RESET_DOG

  }
}


const initialState = { 
   dog:{breed: { weight: {}, height: {} }}
 };

export default function reducer(state = initialState, action) {
  //console.log(action)
  switch (action.type) {
    case LOAD_DOG:

      return Object.assign(
        {},
        state.dog,
        action.value
      );
    case RESET_DOG:

      return Object.assign(
        {},
        state.dog,
        {breed: { weight: {}, height: {} }}
      );


    default:
      return state;
  }
}