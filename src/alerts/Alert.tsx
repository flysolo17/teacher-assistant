import React, { useState } from 'react'
import {Snackbar ,Button,IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface AlertPageProps {
    message : string,
    open : boolean,
}
 
const AlertPage: React.FunctionComponent<AlertPageProps> = (props) => {
    const {message ,open } = props;
    return ( 
     <Snackbar
        open={open}
        autoHideDuration={6000}
        message={message}

      />
    );
};
 
export default AlertPage;