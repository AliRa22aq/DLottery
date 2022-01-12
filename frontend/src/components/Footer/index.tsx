import React from 'react'
import { makeStyles } from '@mui/styles';

import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



const Footer = () => {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  

    


    return (
      <div>
         
          <div className={classes.footerContainer} >
            <div onClick={handleClickOpen} className={classes.disclaimer}>
               Disclaimer
            </div>
          </div>
          

        <Dialog
          sx={{border: "0px solid black"}}
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          >

<DialogContent>
          <DialogContentText>
            Disclaimer
          </DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: '500px',
            }}
          >

            Hello 
          </Box>
        </DialogContent>

        </Dialog>

      </div>
  
    )
}

export default Footer

const useStyles = makeStyles({
    footerContainer: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      fontSize: "16px",
      fontWeight: "600",
      height: 48,
      padding: '10px 20px',
      marginTop: "20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    disclaimer: {
      // border: "1px solid black",
      cursor: "pointer"
      
    }
  });
  