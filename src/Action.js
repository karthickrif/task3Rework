const GET_LOGINDATA = 'GetLoginData';
const GET_CLIENTDATA = 'GetClientData';
const GET_CASESDATA = 'GetCasesData';
const GET_USERSDATA = 'GetUsersData';

export function GetLoginData(val) {
  return {
    type: GET_LOGINDATA,
    value: val
  };
}

export function getClientData(val) {
  return {
    type: GET_CLIENTDATA,
    value: val
  };
}

export function getCasesData(val) {
  return {
    type: GET_CASESDATA,
    value: val
  };
}

export function getUsersData(val) {
  return {
    type: GET_USERSDATA,
    value: val
  };
}

export function appendClientData(val) {
  return {
    type: 'AppendClientData',
    value: [val]
  };
}

export function removeClientData(val) {
  return {
    type: 'removeClientData',
    value: [val]
  };
}

export function editClientData(val, index) {
  // console.log('EditAction', val, index);
  return {
    type: 'editClientData',
    value: val,
    index: index
  };
}

export function appendCasesData(val) {
  return {
    type: 'AppendCasesData',
    value: [val]
  };
}

export function removeCasesData(val) {
  return {
    type: 'removeCasesData',
    value: [val]
  };
}

export function editCasesData(val, index) {
  // console.log('EditAction', val, index);
  return {
    type: 'editCasesData',
    value: val,
    index: index
  };
}

export function appendUserData(val) {
  return {
    type: 'AppendUserData',
    value: [val]
  };
}

export function removeUserData(val) {
  return {
    type: 'RemoveUserData',
    value: [val]
  };
}

export function editUserData(val, index) {
  // console.log('EditAction', val, index);
  return {
    type: 'EditUserData',
    value: val,
    index: index
  };
}


export function getUserData(val) {
  return {
    type: GET_USERDATA,
    value: val
  };
}
