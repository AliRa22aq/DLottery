import React, { useEffect } from 'react'
import { makeStyles } from '@mui/styles';
import { LotteryTable } from './LotteryTable';
import { ethers } from "ethers";
import { useDispatch, useSelector } from 'react-redux';
import { addAllLotteries, DataType, LotteryData } from '../Store';
const LotteryABI = require("../../abis/Lottery.json")
// const ERC20ABI = require("../../abis/TestCoin.json") 


const LotteryResults = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const { masterContract } = useSelector((state: DataType) => state);
    
    useEffect(() => {
        fetchAllLotteriesData();
    }, [])
    
    const fetchAllLotteriesData = async () => {
        
        let provider
        
        try{
            provider = new ethers.providers.Web3Provider(window.ethereum);
        }
        catch(e){
            // console.log(e)
            throw("No provider available")
        }


        const lotteryContract = new ethers.Contract(masterContract.lotteryAddress, LotteryABI.abi, provider)
        const counts = await lotteryContract.lotteriesCount();

        for (let i = Number(counts); i > 0; i--) {
            let lotteryInformation = await lotteryContract.lotteryInfo(i);
            const lotteryData: LotteryData = {
                id: lotteryInformation.id,
                accumulatedFunds: lotteryInformation.accumulatedFunds,
                countOfParticipants: lotteryInformation.countOfParticipants,
                countOfTickets: lotteryInformation.countOfTickets,
                endingtime: lotteryInformation.endingtime,
                owner: lotteryInformation.owner,
                ownerCommision: lotteryInformation.ownerCommision,
                priceOfTicket: Number(ethers.utils.formatEther(lotteryInformation.priceOfTicket)),
                prize: Number(ethers.utils.formatEther(lotteryInformation.prize)),
                status: lotteryInformation.status,
                winner: lotteryInformation.winner,
                winnerIndex: lotteryInformation.winnerIndex,
                count: 1
            }
            dispatch(addAllLotteries(lotteryInformation))
        }

    }


    return (
        <div className={classes.UpcomingLotteriesContainer}>

            <div className={classes.UpcomingLotteriesHeader}>

                <div className={classes.headerText}>
                    Draw Results
                </div>

            </div>

            <div className={classes.UpcomingLotteriesBody}>
                <LotteryTable />
            </div>

        </div>
    )
}

export default LotteryResults

const useStyles = makeStyles({
    UpcomingLotteriesContainer: {
        //   border: "1px solid black",
        width: "45%",
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        background: "#000",
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 180, 9, 0.3)',
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
