import React from 'react'
import { makeStyles } from '@mui/styles';

const LotteryResults = () => {

    const classes = useStyles();

    return (
        <div className={classes.lotteryResultsContainer}>
            LotteryResults
        </div>
    )
}

export default LotteryResults

const useStyles = makeStyles({
    lotteryResultsContainer: {
    //   border: "1px solid black",
    width: "45%",

    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    fontSize: "16px",
    fontWeight: "600",
    height: 450,
    // margin: "5px",

    padding: '10px 20px',
    marginTop: "20px",
    "@media (max-width: 900px)": {
      // border: "1px solid black",
        width: "100%",
        padding: '10px 0px'
    },
  }
});
  