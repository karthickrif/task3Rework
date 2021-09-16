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
  CircularProgress,
} from '@material-ui/core';
import GetUserTable from '../Reducers/Reducer';
import { connect } from 'react-redux';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { reduxForm, Field } from 'redux-form';
import ClientForm from '../Forms/ClientForm';
import { appendClientData, removeClientData, editClientData } from '../Action';
import { ModifyClient } from '../Reducers/ClientReducer';

function ClientsTable(props) {
  const { dispatch, data, sessionData, clientData } = props;
  const [dialogStatus, setDialogStatus] = useState({
    status: false,
    editStatus: false,
  });
  const [progStatus, setProgStatus] = useState(false);

  const handleOpen = () => {
    setDialogStatus({ status: true, editStatus: false });
  };

  const handleClose = () => {
    setDialogStatus({
      status: false,
    });
  };

  function handleDelete(obj) {
    console.log('Index', obj);
    dispatch(removeClientData(obj));
    dispatch(ModifyClient());
    setProgStatus(true);
    setTimeout(() => setProgStatus(false), 2000);
  }

  function handleEdit(obj) {
    setDialogStatus({
      status: true,
      dispatchStatus: false,
      dispatchValue: dialogStatus.dispatchValue,
      editStatus: true,
      editIndex: obj,
    });
  }

  function showResults(values, dispatch) {
    setDialogStatus({
      status: false,
      dispatchStatus: true,
      dispatchValue: values,
      editStatus: dialogStatus.editStatus,
      editIndex: dialogStatus.editIndex,
    });
    setProgStatus(true);
    setTimeout(() => setProgStatus(false), 2000);
  }

  if (
    dialogStatus.dispatchStatus != undefined &&
    dialogStatus.dispatchStatus == true
  ) {
    var clientdata = dialogStatus.dispatchValue;
    if (dialogStatus.editStatus == false) {
      // console.log('Append');
      dispatch(appendClientData(clientdata));
      dispatch(ModifyClient());
    } else {
      // console.log('Delete');
      dispatch(editClientData(clientdata, clientdata.id));
      dispatch(ModifyClient());
    }
    setDialogStatus({
      status: false,
      dispatchStatus: false,
      dispatchValue: dialogStatus.dispatchValue,
      editStatus: false,
    });
  }

  return (
    <TableContainer component={Paper} className="DataTable">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Phone</TableCell>
            <TableCell align="left">Address</TableCell>
            <TableCell align="left">Dob</TableCell>
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
          {clientData != undefined && clientData != null
            ? clientData.map((values, index) => (
                <TableRow key={index}>
                  <TableCell align="left">{values.name}</TableCell>
                  <TableCell align="left">{values.email}</TableCell>
                  <TableCell align="left">{values.phone}</TableCell>
                  <TableCell align="left">{values.address}</TableCell>
                  <TableCell align="left">{values.dob}</TableCell>
                  <TableCell align="left">
                    <IconButton id={index} onClick={() => handleEdit(index)}>
                      <EditOutlinedIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="left">
                    <IconButton
                      id={index}
                      onClick={() => handleDelete(values.id)}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            : ''}
          <Dialog open={dialogStatus.status} onClose={handleClose}>
            <DialogTitle>
              {dialogStatus.editStatus == true ? 'Edit Client' : 'Add Client'}
            </DialogTitle>
            <DialogContent>
              <ClientForm
                onSubmit={showResults}
                initialValues={clientData[dialogStatus.editIndex]}
              />
            </DialogContent>
          </Dialog>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.LoginReducer && state.LoginReducer.loginData,
    sessionData: state.LoginReducer && state.LoginReducer.sessionData,
    clientData: state.ClientReducer && state.ClientReducer.clientData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientsTable);
