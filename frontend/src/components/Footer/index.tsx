import React from 'react'
import { makeStyles } from '@mui/styles';

const Footer = () => {

    const classes = useStyles();

    return (
        <div className={classes.footerContainer}>
            Disclaimer
        </div>
    )
}

export default Footer

const useStyles = makeStyles({
    footerContainer: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    //   border: "1px solid black",
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
      alignItems: "center"

    },
  });
  