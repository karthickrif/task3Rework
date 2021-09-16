import React, { useState, useEffect } from 'react';
import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  CircularProgress
} from '@material-ui/core';
import { connect } from 'react-redux';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import UsersForm from '../Forms/UsersForm';
import { appendUserData, removeUserData, editUserData } from '../Action';
import  {ModifyUser} from '../Reducers/UsersReducer';

function UsersTable(props) {
  const { dispatch, data, sessionData, usersData } = props;
  const [dialogStatus, setDialogStatus] = useState({
    status: false,
    editStatus: false
  });
  const [progStatus, setProgStatus] = useState(false);

  const handleOpen = () => {
    setDialogStatus({ status: true, editStatus: false });
  };

  const handleClose = () => {
    setDialogStatus({
      status: false
    });
  };

  function handleDelete(obj) {
    dispatch(removeUserData(obj));
    dispatch(ModifyUser());
    setProgStatus(true);
    setTimeout(() => setProgStatus(false), 2000);
  }

  function handleEdit(obj) {
    setDialogStatus({
      status: true,
      dispatchStatus: false,
      dispatchValue: dialogStatus.dispatchValue,
      editStatus: true,
      editIndex: obj
    });
  }

  function showResults(values, dispatch) {
    setDialogStatus({
      status: false,
      dispatchStatus: true,
      dispatchValue: values,
      editStatus: dialogStatus.editStatus,
      editIndex: dialogStatus.editIndex
    });
    setProgStatus(true);
    setTimeout(() => setProgStatus(false), 2000);
  }

  if (
    dialogStatus.dispatchStatus != undefined &&
    dialogStatus.dispatchStatus == true
  ) {
    var userdata = dialogStatus.dispatchValue;
    if (dialogStatus.editStatus == false) {
      // console.log('Append');
      dispatch(appendUserData(userdata));
      dispatch(ModifyUser());
    } else {
      // console.log('Delete');
      dispatch(editUserData(userdata, userdata.id));
      dispatch(ModifyUser());
    }
    setDialogStatus({
      status: false,
      dispatchStatus: false,
      dispatchValue: dialogStatus.dispatchValue,
      editStatus: false
    });
  }

  return (
    <TableContainer component={Paper} className="DataTable">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Password</TableCell>
            <TableCell align="left">Role</TableCell>
            <TableCell align="left">Admin</TableCell>
            <TableCell align="left">
              <IconButton onClick={handleOpen}>
                <AddCircleOutlineIcon />
              </IconButton>
            </TableCell>
            <TableCell align="left">
              {progStatus == false ? '' : <CircularProgress className="tableProgress"/>}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersData != undefined && usersData != null
            ? usersData.map((values, index) => (
                <TableRow key={index}>
                  <TableCell align="left">{values.name}</TableCell>
                  <TableCell align="left">{values.email}</TableCell>
                  <TableCell align="left">{values.password}</TableCell>
                  <TableCell align="left">{values.role}</TableCell>
                  <TableCell align="left">{values.is_admin}</TableCell>
                  <TableCell align="left">
                    <IconButton id={index} onClick={() => handleEdit(index)}>
                      <EditOutlinedIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="left">
                    <IconButton id={index} onClick={() => handleDelete(values.id)}>
                      <DeleteOutlineIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            : ''}
          <Dialog open={dialogStatus.status} onClose={handleClose}>
            <DialogTitle>
              {dialogStatus.editStatus == true ? 'Edit User' : 'Add User'}
            </DialogTitle>
            <DialogContent>
              <UsersForm
                onSubmit={showResults}
                initialValues={usersData[dialogStatus.editIndex]}
              />
            </DialogContent>
          </Dialog>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const mapStateToProps = state => {
  return {
    data: state.LoginReducer && state.LoginReducer.loginData,
    sessionData: state.LoginReducer && state.LoginReducer.sessionData,
    usersData: state.UsersReducer && state.UsersReducer.usersData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersTable);
