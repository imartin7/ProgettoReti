import _get from 'lodash/get';
import _map from 'lodash/map';

export const user = {
  id:     null,
  name:   "", 
  email:  "",
  image:  "",
  token:  null,
  feed:   {
    totalPages: 0,
    currentPage: 0,
    images: []
  }
}

export const reducers = (state=user, action) => {
  switch(action.type) {
    case "SET_USER_DATA": 
      return {
        ...state,
        id:     _get(action, 'user.id'),
        name:   _get(action, 'user.name'),
        lastname:   _get(action, 'user.lastname'),
        username:   _get(action, 'user.username'),
        email:  _get(action, 'user.email'),
        image:  _get(action, 'user.image'),
        token:  _get(action, 'user.token')
      }
    case "CLEAN_USER_DATA":
      return user
    case "SET_USER_FEED":
      return {
        ...state,
        feed: {
          ...state.feed,
          images: _map(_get(action, 'user'), (image) => {
            return _get(image, "image")
          })
        }
      }
    default:
      return state;
  }
}

export default reducers;