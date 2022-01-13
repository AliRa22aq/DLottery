import React, {useState} from 'react'
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { ethers } from "ethers";
import Tooltip from '@mui/material/Tooltip';
// import Web3 from "web3"
import { setActiveUserInfo, setNetworkDetails, setContractMethods, DataType } from '../Store';

const lotteryABI = require("../../abis/Lottery.json")

const SumbitALottery = () => {

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.on("network", (newNetwork, oldNetwork) => {
        if (oldNetwork) {
            window.location.reload();
        }
    });


    // const web3 = new Web3(window.ethereum);

    const classes = useStyles();
    const dispatch = useDispatch();
    const {userInfo, networkDetail, masterContract} = useSelector((state: DataType) => state);
    const {lotteryMethods, lotteryAddress} = masterContract;

    const [price, setPrice] = useState<number>(0);
    // const date  = (new Date).getTime(); 
    // console.log(date);

    const [date, setDate] = useState<number>((new Date).getTime());

    const handlePriceChange = (e: any) => {
        // console.log(e)
        setPrice(e)
    }
    
    const handleDateChange = (e: any) => {
        // console.log( (new Date(e)).getTime())
        setDate(e)
    }

    const launchLottery = async () => {

        if(!price && !date) {return;}

        const expiryData = ((new Date(date)).getTime()/1000).toFixed()    ;  

        console.log(price)
        console.log(expiryData)
        console.log(lotteryMethods);

        const signer = provider.getSigner()
        const launchWithSigner = lotteryMethods.connect(signer);

        try {
            let tx = await launchWithSigner.startALottery(price, expiryData);
            let receipt = await tx.wait();
            console.log(receipt);

        }
        catch(e: any){
            alert(e.data.message)
        }

    }
    
    return (
        <div className={classes.submitContainer}>
            
            <div className={classes.submitElement1}>
                <input type="number" value={price} onChange={(e)=> handlePriceChange(e.target.value)} placeholder='Price' className={classes.inputContainer}/>
                <input type="datetime-local" value={date} onChange={(e)=> handleDateChange(e.target.value)} placeholder='Deadline' className={classes.inputContainer}/>

                <Tooltip title="You need to hold atleasr 10,000 Tokens to start a lottery">
                    <button onClick={launchLottery}  className={classes.buttonContainer}>  Launch </button>
                </Tooltip>

            </div>
            
            {
                masterContract.erc20Symbol && (
                    <div className={classes.submitElement2}>
                        Your balance: {userInfo.userBalance} {masterContract.erc20Symbol}
                    </div>
                )
            }

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
  
