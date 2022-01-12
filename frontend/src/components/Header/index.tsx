import React, { useEffect } from 'react'
import { makeStyles } from '@mui/styles';

import { useDispatch, useSelector } from 'react-redux';
import { DataType, setActiveUserInfo, setNetworkDetails, setContractMethods } from '../Store';
import { ethers } from "ethers";

import { getChainName , shortenIfAddress } from "@usedapp/core";

import Web3Modal from "web3modal";
// import WalletConnectProvider from "@walletconnect/web3-provider";
import detectEthereumProvider from '@metamask/detect-provider';

// const Web3 = require('web3');
// var Web3 = require('web3');


const LotteryABI = require("../../abis/Lottery.json") 
const ERC20ABI = require("../../abis/TestCoin.json") 



const Header = () => {
      
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const dispatch = useDispatch();
    // let web3: any;
    const {userInfo, networkDetail, masterContract} = useSelector((state: DataType) => state);


    // console.log(userAddress)
    // console.log(networkDetail)
    console.log(masterContract)


    const classes = useStyles();


    useEffect(()=> {
        ConnectWallet();
    }, [])


    const ConnectWallet = async () => {


        const signer = provider.getSigner()
        await provider.send("eth_requestAccounts", []);
        const account = await signer.getAddress();
        console.log(account)

        const network = await provider.getNetwork()
        console.log("network ID:", network.chainId);
        console.log("network Name:", network.name);

        
        const lotteryContract = new ethers.Contract(masterContract.lotteryAddress , LotteryABI.abi , provider)
        const erc20Contract = new ethers.Contract(masterContract.erc20Address , ERC20ABI.abi , provider)
        console.log(lotteryContract)
        console.log(erc20Contract) 
        dispatch(setContractMethods({lotteryMethods: lotteryContract, erc20Methods: erc20Contract}))
        
        
        const name = await erc20Contract.name();
        console.log(name)
        
        const symbol = await erc20Contract.symbol();
        console.log(symbol)

        const balance = await erc20Contract.balanceOf(account);
        console.log(Number(balance))
        
        dispatch(setActiveUserInfo({address: account, balance: Number(balance), erc20Symbol: symbol}));
        dispatch(setNetworkDetails({ id: Number(network.chainId), chain: getChainName(Number(network.chainId)) }));
            
    }
  
  



    return (
        <div className={classes.headerContainer}>
            <div className={classes.headerElement1}>
                Menu
            </div>
            <div className={classes.headerElement2}>
                LOGO
            </div>

            {
                userInfo.userAddress ? 
                <div className={classes.usernameContainer} >
                    <div className={classes.chainName}>
                        {networkDetail.chain}
                    </div>
                    <div className={classes.username}>
                        {shortenIfAddress(userInfo.userAddress)}
                    </div>
                </div> 
                :
                <div className={classes.headerElement3} onClick={ConnectWallet}>
                    Connect
                </div>
            }

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
        // justifyContent: "center",
        alignItems: "center",
        width: "200px"

    },
    headerElement2: {
        // border: "1px solid black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "200px"
    },
    headerElement3: {
        // border: "1px solid black",
        display: "flex",
        alignItems: "center",
        justifyContent: "end",
        cursor: "pointer"
    },
    usernameContainer: {
        // border: "1px solid black",
        alignItems: "center",
        display: "flex",
        justifyContent: "end",

        width: "200px"
    },
    username: {
        // border: "1px solid black",
        marginLeft: "10px",
        
    },
    chainName: {
        "@media (max-width: 900px)": {
            display: "none"
        }
        // border: "1px solid black",

    }
  });
  