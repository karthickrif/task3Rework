import _ from 'lodash';
import Object from 'lodash/Object';
import Array from 'lodash/Array';
import { getClientData,getCasesData,getUsersData} from '../Action';
import axios from 'axios';
const clientState = {
  clientData: []
};
var method,formData;
const ClientReducer = (state = clientState, action) => {
  switch (action.type) {
    case 'GetClientData':
      return {
        clientData: action.value
      };
    case 'AppendClientData':
      var temp = _.concat(state.clientData, action.value);
      method = "POST";
      formData = action.value;
      GetClientTable()
      return {
        clientData: temp,
        method : "POST",
        formData : action.value,
      };
    case 'removeClientData':
      var item = state.clientData.splice(action.value, 1);
      temp = _.remove(state.clientData, function(n) {
        return _.find(item);
      });
      return {
        clientData: temp
      };
    case 'editClientData':
      let updatedState = _.map(state.clientData, (stateItem, index) => {
        if (index == action.index) {
          stateItem = action.value;
        }
        return stateItem;
      });
      return {
        clientData: updatedState
      };
    default:
      return state;
  }
};
export default ClientReducer;

const GetClientTable = () => (dispatch, getState) => {
  const token = getState().LoginReducer.authToken;
  const method = getState().ClientReducer.method;
  console.log("GetUserTable",method);
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
export default GetClientTable;