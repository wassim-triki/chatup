import {
  LOGIN_USER,
  LOGOUT_USER,
  ACCEPT_REQUEST,
  RECEIVE_REQUEST,
  SEND_REQUEST,
  ACCEPTED_REQUEST,
} from './UserActions';
import { initialState } from './UserState';
const userReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...action.payload,
      };
    case LOGOUT_USER:
      return {
        ...initialState,
      };
    case ACCEPT_REQUEST:
      return {
        ...state,
        user: {
          ...state.user,
          contacts: [...state.user.contacts, action.payload],
          receivedRequests: state.user.receivedRequests.filter(
            (id) => id !== action.payload
          ),
        },
      };
    case ACCEPTED_REQUEST:
      return {
        ...state,
        user: {
          ...state.user,
          contacts: [...state.user.contacts, action.payload],
          sentRequests: state.user.sentRequests.filter(
            (id) => id !== action.payload
          ),
        },
      };
    case RECEIVE_REQUEST:
      return {
        ...state,
        user: {
          ...state.user,
          receivedRequests: [action.payload, ...state.user.receivedRequests],
        },
      };

    case SEND_REQUEST:
      return {
        ...state,
        user: {
          ...state.user,
          sentRequests: [action.payload, ...state.user.sentRequests],
        },
      };
    default:
      return state;
  }
};

export default userReducer;
