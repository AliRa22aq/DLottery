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
          <Box
            noValidate
            component="form"
            sx={{
              // display: 'flex',
              // flexDirection: 'column',
              // m: 'auto',
              width: '500px',
            }}
          >
          <DialogContentText sx={{display: "flex", justifyContent: "center", margin: "20px", color: "red"}}>
            Disclaimer
          </DialogContentText>
            <ul>
              <li style={{marginBottom: "10px"}}> 
                Official drawing results used in the validation and payment of winning tickets are done through VRF Chainlink and are
                recorded on the blockchain. 
              </li>
              
              <li style={{marginBottom: "10px"}}> 
                BeDecent Lottery has been audited by an independent auditing firm. In the case of a discrepancy
                between the information provided in this publication and the official drawing results, the official drawing
                results shall prevail.
              </li>

              <li style={{marginBottom: "10px"}}>
                While every effort is made to ensure its accuracy, the information provided in this contract is
                official but we are trying to make it more stable so use it moderately may contain errors. 
              </li>
            </ul>
            

            

          </Box>
        </DialogContent>

        </Dialog>

      </div>
  
    )
}

export default Footer

const useStyles = makeStyles({
    footerContainer: {
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        background: "#000",
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 180, 9, 0.3)',
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
  