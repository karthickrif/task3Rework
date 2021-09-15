import _ from 'lodash';
import Object from 'lodash/Object';
import Array from 'lodash/Array';
const clientState = {
  clientData: []
};

const ClientReducer = (state = clientState, action) => {
  switch (action.type) {
    case 'GetClientData':
      return {
        clientData: action.value
      };
    case 'AppendClientData':
      var temp = _.concat(state.clientData, action.value);
      return {
        clientData: temp
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
