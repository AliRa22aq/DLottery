import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import SumbitALottery from './components/SumbitALottery';
import UpcomingLotteries from './components/UpcomingLotteries';
import LotteryResults from './components/LotteryResults';
import { makeStyles } from '@mui/styles';


function App() {

  const classes = useStyles();

  return (
    <div className={classes.rootMian}>
      <div className={classes.mianContainer}>
        <Header />
        <SumbitALottery />

        <div className={classes.halfContainer}>
          <UpcomingLotteries />
          <LotteryResults />
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default App;

const useStyles = makeStyles({
  rootMian: {
    // border: "1px solid black",
    background: "#fff",
    height: "99vh",
    width: "100%",

  },
  mianContainer: {
    // border: "1px solid black",
    padding: "20px 0px",
    width: "90%",
    margin: "auto",
  },

  halfContainer: {
    // border: "1px solid black",
    display: "flex",
    justifyContent: "space-between",
    "@media (max-width: 900px)": {
      display: "block",
      // justifyContent: "none",


    }



  }

});
