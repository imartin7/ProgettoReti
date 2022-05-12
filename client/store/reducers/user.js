
export const user = {
  id:     null,
  name:   "", 
  email:  "",
  image:  "",
  token:  null
}

export const reducers = (state=user, action) => {
  //console.log("TEST", action);
  switch(action.type) {
    case "SET_USER_DATA": 
      return {
        ...state,
        id:     _get(action, 'id'),
        name:   _get(action, 'name'),
        email:  _get(action, 'email'),
        image:  _get(action, 'image'),
        token:  _get(action, 'token')
      }
    default:
      return state;
  }
}

export default reducers;