import React from 'react'
import { makeStyles } from '@mui/styles';
import { LotteryTable } from './LotteryTable';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


const UpcomingLotteries = () => {

    const classes = useStyles();

    const [alignment, setAlignment] = React.useState('active');

    const handleChange = (
      event: React.MouseEvent<HTMLElement>,
      newAlignment: string,
    ) => {
      setAlignment(newAlignment);
    };
  
    return (
        <div className={classes.UpcomingLotteriesContainer}>

            <div className={classes.UpcomingLotteriesHeader}>
                <div className={classes.headerText}>
                Upcoming Lotteries

                </div>

                <div className={classes.toggleButtonsContainer}>

                <ToggleButtonGroup
                    // sx={{border: "1px solid black"}}
                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                    >
                    <ToggleButton sx={{height: "30px", color: "white", fontSize: "12px", fontWeight: "500"}} value="active">Active</ToggleButton>
                    <ToggleButton sx={{height: "30px", color: "white", fontSize: "12px", fontWeight: "500"}} value="all">ALL</ToggleButton>
                </ToggleButtonGroup>
                </div>


            </div>

            <div className={classes.UpcomingLotteriesBody}>
                <LotteryTable />
            </div>
            
        </div>
    )
}

export default UpcomingLotteries

const useStyles = makeStyles({

    
    UpcomingLotteriesContainer: {
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
      padding: '10px 20px',
      marginTop: "20px",
    //   margin: "5px",
      "@media (max-width: 900px)": {
        // border: "1px solid black",
          width: "100%",
          padding: '10px 0px',
    }
    },
    UpcomingLotteriesHeader: {
        // border: "1px solid black",
        height: "50px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",  
        "@media (max-width: 900px)": {
            // border: "1px solid black",
              padding: '10px 10px',
        }
    },
    headerText: {
        // border: "1px solid black",
        
    },
    toggleButtonsContainer: {
        border: "1px solid #525252",  
        borderRadius: "5px"
        // color: 'white',
        // fontSize: "16px",
        // fontWeight: "600",
        
    },
    toggleButtons: {
        // border: "1px solid #fff",  
        height: "30px",
  
    },
    UpcomingLotteriesBody: {
        // border: "1px solid black",
        // height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
  
  });
  