import React, { useEffect } from 'react'
import { makeStyles } from '@mui/styles';

import { useDispatch, useSelector } from 'react-redux';
import { DataType, readLinkBalance, setActiveUser, setActiveUserInfo, setNetworkDetails, setContractMethods } from '../Store';
import { ethers } from "ethers";

import { getChainName , shortenIfAddress } from "@usedapp/core";

// import Web3Modal from "web3modal";
// import WalletConnectProvider from "@walletconnect/web3-provider";
// import detectEthereumProvider from '@metamask/detect-provider';

// const Web3 = require('web3');
// var Web3 = require('web3');
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';


import { useEthers } from "@usedapp/core";


const LotteryABI = require("../../abis/Lottery.json") 
const ERC20ABI = require("../../abis/TestCoin.json") 



const Header = () => {
      
    window.ethereum.on('accountsChanged', function (accounts: any) {
        dispatch(setActiveUser(accounts[0]))
    })
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const classes = useStyles();
    const dispatch = useDispatch();
    const {userInfo, networkDetail, masterContract} = useSelector((state: DataType) => state);

    const {  account, activateBrowserWallet, deactivate } = useEthers();
    console.log("account", account)


    const isConnected = account !== undefined;
    
    
    useEffect(()=> {
        // if(isConnected && account){
        //     dispatch(setActiveUser(account))
        // }
        getBlockChainData();
        // ConnectWallet();
    }, [userInfo.userAddress, account])

    const getBlockChainData = async () => {

        const lotteryContract = new ethers.Contract(masterContract.lotteryAddress , LotteryABI.abi , provider)
        const erc20Contract = new ethers.Contract(masterContract.erc20Address , ERC20ABI.abi , provider)
        dispatch(setContractMethods({lotteryMethods: lotteryContract, erc20Methods: erc20Contract}))

        const network = await provider.getNetwork()
        if(Number(network.chainId) !== 97) {
            alert("Please connect to Binance Test net to use this Dapp")
        }

        dispatch(setNetworkDetails({ id: Number(network.chainId), chain: getChainName(Number(network.chainId)) }));

        const linkBalance = await lotteryContract.linkBalance();
        const ourBalance = await await erc20Contract.balanceOf(masterContract.lotteryAddress);
        
        dispatch(readLinkBalance({
            linkBalance: Number(ethers.utils.formatEther(linkBalance)),
            ourBalance: Number(ethers.utils.formatEther(ourBalance)),
        }))

        const symbol = await erc20Contract.symbol();

        if(account){
            const balance = await erc20Contract.balanceOf(account);            
            dispatch(setActiveUserInfo({address: account, balance: Number(balance), erc20Symbol: symbol}));
        }


    }

    // const ConnectWallet = async () => {

    //     // const signer = provider.getSigner()
    //     // await provider.send("eth_requestAccounts", []);
    //     // const account = await signer.getAddress();
    //     // console.log(account)

    //     // const lotteryContract = new ethers.Contract(masterContract.lotteryAddress , LotteryABI.abi , provider)
        
    //     // const erc20Contract = new ethers.Contract(masterContract.erc20Address , ERC20ABI.abi , provider)
        
    //     // const name = await erc20Contract.name();
    //     // console.log(name)
        
    //     // const symbol = await erc20Contract.symbol();
    //     // console.log(symbol)

    //     // const balance = await erc20Contract.balanceOf(account);
    //     // console.log(Number(balance))
        
    //     // dispatch(setActiveUserInfo({address: account, balance: Number(balance), erc20Symbol: symbol}));
            

    
    // }
    
    // const ConnectWallet = async () => {

    //     console.log("ConnectWallet")
        
    //     const erc20Contract = new ethers.Contract(masterContract.erc20Address , ERC20ABI.abi , provider)          
    //     const symbol = await erc20Contract.symbol();
    //     const balance = await erc20Contract.balanceOf(account);            
    //     dispatch(setActiveUserInfo({address: account ? account:"", balance: Number(balance), erc20Symbol: symbol}));

    // }



    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: any) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  

    return (
        <div className={classes.headerContainer}>

            <div className={classes.headerElement1}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={(e) => handleClick(e)}                
            >
                    <MenuIcon />
            </div>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{ 'aria-labelledby': 'basic-button' }}
                >
                    <MenuItem onClick={handleClose}>ANONYMOUS</MenuItem>
                    <MenuItem onClick={handleClose}>JACKPOT</MenuItem>
                    <MenuItem onClick={handleClose}>LIFETIME </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose}>Whitepaper</MenuItem>
                    <MenuItem onClick={handleClose}>Social Links</MenuItem>
                    <MenuItem onClick={handleClose}>Audit Reports</MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose}>LINK balance: {masterContract.linkBalance}</MenuItem>
                    <MenuItem onClick={handleClose}>Our balance: {masterContract.ourBalance}</MenuItem>

                </Menu>

            <div className={classes.headerElement2}>
                LOGO
            </div>

            <div className={classes.headerElement3} >
                {
                    isConnected ? (
                        <Button sx={{color: "#fff", fontSize: "16px", fontWeight: "500"}} 
                        onClick={deactivate}>
                        Disconnect
                        </Button>
                    ) : (
                        <Button sx={{color: "#fff", fontSize: "16px", fontWeight: "500"}} 
                        onClick={() => activateBrowserWallet()}>
                        <img 
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png"
                            alt="metamask" 
                            width="50px"
                            height="50px"
                            />
                        </Button>
                    )
                }
            </div>

        </div>
    )
}

export default Header

const useStyles = makeStyles({
    headerContainer: {
        
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        //   border: "1px solid black",

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
        width: "200px",
        // cursor: "pointer"
        cursor: "pointer"


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
        cursor: "pointer",
        width: "200px",

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
  