import React from 'react'
import { makeStyles } from '@mui/styles';


const SumbitALottery = () => {

    const classes = useStyles();
    
    return (
        <div className={classes.submitContainer}>
            
            <div className={classes.submitElement1}>
                <input type="number" placeholder='Price' className={classes.inputContainer}/>
                <input type="date" placeholder='Deadline' className={classes.inputContainer}/>
                <button className={classes.buttonContainer}>  Launch </button>
            </div>
            
            <div className={classes.submitElement2}>
                Your balance: 2500000 OURs
            </div>

        </div>
    )
}

export default SumbitALottery;


const useStyles = makeStyles({
    submitContainer: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      fontSize: "16px",
      fontWeight: "600",
      height: 48,
      padding: '10px 20px',
      marginTop: "20px",
      display: "flex",
      justifyContent: "space-between",
      "@media (max-width: 900px)": {
        display: "block",
        height: 100,
    }

    },
    submitElement1: {
        // border: "1px solid black",
        display: "flex",
        padding: "0px",
        alignItems: "center",
        "@media (max-width: 900px)": {
            // border: "1px solid red",
            // display: "flex",
            marginTop: "10px"

        },
    },
    inputContainer: {
        // border: "1px solid black",
        height: "30px",
        width: "200px",
        marginRight: "10px",
        "@media (max-width: 900px)": {
            // border: "1px solid black",
            width: "100%",
        }

    },
    buttonContainer: {
        // border: "1px solid black",
        height: "30px",
        width: "100px",
    },
    submitElement2: {
        // border: "1px solid black",
        display: "flex",
        alignItems: "center",
        "@media (max-width: 900px)": {
            // border: "1px solid black",
            width: "100%",
            height: "50px",
            justifyContent: "center",
            marginTop: "10px"

        }
    },

  });
  
