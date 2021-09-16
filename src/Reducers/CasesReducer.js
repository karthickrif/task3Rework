import _ from 'lodash';
import Object from 'lodash/Object';
import Array from 'lodash/Array';
import axios from 'axios';
import {
  getCasesData,
  appendCasesData,
  removeCasesData,
  editCasesData
} from '../Action';
const casesState = {
  casesData: []
};

const CasesReducer = (state = casesState, action) => {
  switch (action.type) {
    case 'GetCasesData':
      return {
        casesData: action.value
      };
    case 'AppendCasesData':
      var temp = _.concat(state.casesData, action.value);
      return {
        casesData: temp
      };
    case 'removeCasesData':
      var item = state.casesData.splice(action.value, 1);
      temp = _.remove(state.casesData, function(n) {
        return _.find(item);
      });
      return {
        casesData: temp
      };
    case 'editCasesData':
      let updatedState = _.map(state.casesData, (stateItem, index) => {
        if (index == action.index) {
          stateItem = action.value;
        }
        return stateItem;
      });
      return {
        casesData: updatedState
      };

    default:
      return state;
  }
};
export default CasesReducer;

export const GetCasesTable = () => (dispatch, getState) => {
  const token = getState().LoginReducer.authToken;
  axios({
    url: 'https://staging-api.esquiretek.com/cases',
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
      // console.log(error);
    });
};
