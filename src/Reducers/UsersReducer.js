import _ from 'lodash';
import Object from 'lodash/Object';
import Array from 'lodash/Array';
const usersState = {
  usersData : []
};

const UsersReducer = (state = usersState, action) => {
  switch (action.type) {
    case 'GetUsersData':
      return {
        usersData: action.value
      };
    case 'AppendUserData':
      var temp = _.concat(state.usersData,action.value);
      // console.log(temp);
      // console.log(JSON.stringify(temp));
      return {
        usersData: temp,
      };
    case "RemoveUserData":
      var item = state.usersData.splice(action.value,1);
      temp = _.remove(state.usersData,function(n){
        return _.find(item);
        });
      return{
        usersData: temp,
      }
      case 'EditUserData':
        let updatedState = _.map(state.usersData, (stateItem, index) => {
          if (index == action.index) {
            stateItem = action.value;
          }
          return stateItem;
        });
        return {
          usersData: updatedState
        };
      
    default:
      return state;
  }
};
export default UsersReducer;
