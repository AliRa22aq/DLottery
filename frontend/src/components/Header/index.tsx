import React from 'react'
import { makeStyles } from '@mui/styles';

const Header = () => {

    const classes = useStyles();

    return (
        <div className={classes.headerContainer}>
            <div className={classes.headerElement1}>
                Menu
            </div>
            <div className={classes.headerElement2}>
                LOGO
            </div>
            <div className={classes.headerElement3}>
                Connect
            </div>
        </div>
    )
}

export default Header

const useStyles = makeStyles({
    headerContainer: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      fontSize: "16px",
      fontWeight: "600",
      height: 48,
      padding: '10px 20px',
      margin: "0px 00px",
      display: "flex",
      justifyContent: "space-between",

    },
    headerElement1: {
        // border: "1px solid black",
        display: "flex",
        // justifyContent: "start",
        alignItems: "center"
    },
    headerElement2: {
        // border: "1px solid black",
        display: "flex",
        // justifyContent: "center",
        alignItems: "center"
    },
    headerElement3: {
        // border: "1px solid black",
        display: "flex",
        // justifyContent: "end",
        alignItems: "center"
    },
  });
  