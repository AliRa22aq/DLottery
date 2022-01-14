import React, { useEffect } from 'react'
import { makeStyles } from '@mui/styles';
import { LotteryTable } from './LotteryTable';
import ToggleButtons from '../ToggleButton';
import { ethers } from "ethers";
import { useDispatch, useSelector } from 'react-redux';
import { readLinkBalance, LotteryData, DataType, addActiveLotteries } from '../Store';

const LotteryABI = require("../../abis/Lottery.json") 
const ERC20ABI = require("../../abis/TestCoin.json") 

const UpcomingLotteries = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const classes = useStyles();
    const dispatch = useDispatch();
    const {lotteryData, userInfo, networkDetail, masterContract} = useSelector((state: DataType) => state);

    useEffect(() => {

        const fetchData = async () => {       
                
                const lotteryContract = new ethers.Contract(masterContract.lotteryAddress , LotteryABI.abi , provider)
                console.log(lotteryContract)

                const counts = await lotteryContract.lotteriesCount();
                // console.log("Lotteries Count", Number(counts))
        
                const activeLotteries = await lotteryContract.listOfActiveLotteriesID();
                
                let activeLotteriesList: any = [];
                
                activeLotteries.map( async (id: any) => {
                    activeLotteriesList.push(Number(id));
                    
                    let lotteryInformation = await lotteryContract.lotteryInfo(id);
                    let newInfo = {...lotteryInformation, count: 1};

                    // console.log("lotteryInformation", lotteryInformation)
                    dispatch(addActiveLotteries(newInfo))
                })

                // const linkBalance = await lotteryContract.linkBalance();
                // const ourBalance = await 
                
                // console.log("linkBalance", Number(ethers.utils.formatEther(linkBalance)))

                // dispatch(readLinkBalance(Number(ethers.utils.formatEther(linkBalance))))
          
                
        
        }
        
        fetchData();

    }, [])


 
    return (
        <div className={classes.UpcomingLotteriesContainer}>

            <div className={classes.UpcomingLotteriesHeader}>
                <div className={classes.headerText}>
                Upcoming Lotteries

                </div>

                {/* <div className={classes.toggleButtonsContainer}>
                    <ToggleButtons text1='Active' text2='All' />
                </div> */}


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
        border: "1px solid #5f5656",  
        borderRadius: "0px",
        height: "30px",
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
  