import { getClientData,getCasesData,getUsersData} from '../Action';
import axios from 'axios';
const initialState = {
  loginData: {}
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GetLoginData':
      return {
        loginData: action.value
      };
    case 'ReceiveApiData':
      return {
        loginData: state.loginData,
        sessionData: action.value
      };
    case 'ReceiveAuthToken':
      return {
        loginData: state.loginData,
        sessionData: state.sessionData,
        authToken: action.value
      };
    case 'FailedAuthToken':
      return {
        loginData: state.loginData,
        sessionData: state.sessionData,
        authToken: state.authToken,
        authStatus : action.status,
        authStatusData : action.value,
      };
    default:
      return state;
  }
};
export default LoginReducer;

export const GetClientTable = () => (dispatch, getState) => {
  const token = getState().LoginReducer.authToken;
  // console.log("GetUserTable",token);
  axios({
    method: 'GET',
    url:'https://staging-api.esquiretek.com/clients',
    headers: {
      authorization: token
    }
  })
    .then(response => {
      // console.log('GetUserTable_response', response);
      dispatch(getClientData(response.data));
    })
    .catch(error => {
      console.log("err",error);
    });
};

export const GetCasesTable = () => (dispatch, getState) => {
  const token = getState().LoginReducer.authToken;
  // console.log("GetUserTable",token);
   axios({url : 'https://staging-api.esquiretek.com/cases',
    method: 'GET',
    headers: {
      authorization: token
    }
  })
    .then(response => {
      // console.log('GetCasesTable_response', response);
      dispatch(getCasesData(response.data));
    })
    .catch(error => {
      console.log(error);
    });
};

export const GetUsersTable = () => async (dispatch, getState) => {
  const token = getState().LoginReducer.authToken;
  // console.log("GetUserTable",token);
   axios({url : 'https://staging-api.esquiretek.com/users',
    method: 'GET',
    headers: {
      authorization: token
    }
  })
    .then(response => {
      // console.log('GetCasesTable_response', response);
      dispatch(getUsersData(response.data));
    })
    .catch(error => {
      console.log(error);
    });
};