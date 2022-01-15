import React, { useEffect } from 'react'
import { makeStyles } from '@mui/styles';

import { useDispatch, useSelector } from 'react-redux';
import { DataType, readLinkBalance, setActiveUser, setActiveUserInfo, setNetworkDetails, setContractMethods } from '../Store';
import { ethers } from "ethers";

import { getChainName, shortenIfAddress } from "@usedapp/core";
import logo from '../assests/logo.png'
import logo2 from '../assests/logo2.png'
import Discord from '../assests/Discord.svg'
import Telegram from '../assests/Telegram.svg'
import Twitter from '../assests/Twitter.svg'


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
import Badge from '@mui/material/Badge';
import Link from '@mui/material/Link';


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
    const { userInfo, networkDetail, masterContract } = useSelector((state: DataType) => state);

    const { account, activateBrowserWallet, deactivate } = useEthers();
    const isConnected = account !== undefined;


    useEffect(() => {
        getBlockChainData();
    }, [userInfo.userAddress, account])

    const getBlockChainData = async () => {

        const lotteryContract = new ethers.Contract(masterContract.lotteryAddress, LotteryABI.abi, provider)
        const erc20Contract = new ethers.Contract(masterContract.erc20Address, ERC20ABI.abi, provider)
        dispatch(setContractMethods({ lotteryMethods: lotteryContract, erc20Methods: erc20Contract }))

        const network = await provider.getNetwork()
        if (Number(network.chainId) !== 97) {
            alert("Please connect to Binance Test net to use this Dapp")
        }

        dispatch(setNetworkDetails({ id: Number(network.chainId), chain: getChainName(Number(network.chainId)) }));

        const linkBalance = await lotteryContract.linkBalance();
        const ourBalance = await await erc20Contract.balanceOf(masterContract.lotteryAddress);
        const charity = await await lotteryContract.charityBalance();

        dispatch(readLinkBalance({
            linkBalance: Number(ethers.utils.formatEther(linkBalance)),
            ourBalance: Number(ethers.utils.formatEther(ourBalance)),
            charity: Number(charity)
        }))

        const symbol = await erc20Contract.symbol();

        if (account) {
            const balance = await erc20Contract.balanceOf(account);
            dispatch(setActiveUserInfo({ address: account, balance: Number(balance), erc20Symbol: symbol }));
        }
    }

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
                <Link href="/" sx={{ textDecoration: "none", color: "#000" }} >
                    <MenuItem onClick={handleClose}>ANONYMOUS</MenuItem>
                </Link>

                <MenuItem> JACKPOT  <span style={{ color: "#ff0000", marginLeft: "5px" }}> (coming soon) </span> </MenuItem>
                <MenuItem> LIFETIME <span style={{ color: "#ff0000", marginLeft: "5px" }}> (coming soon) </span> </MenuItem>
                <Divider />

                <Link
                    href="https://gateway.pinata.cloud/ipfs/QmahBD58Twv1hjyEvDiY6EZLWXjfuA6U5FVJYKQ9HG3jub?preview=1"
                    target='_blank'
                    sx={{ textDecoration: "none", color: "#000" }}
                >

                    <MenuItem onClick={handleClose}>Audit Reports</MenuItem>

                </Link>

                <Link
                    href="https://gateway.pinata.cloud/ipfs/QmTfHqxpnpEjVc8KTJue6yr6DEEg3QkfjguWtfmYgUHV76?preview=1"
                    target='_blank'
                    sx={{ textDecoration: "none", color: "#000" }}
                >

                    <MenuItem onClick={handleClose}> Whitepaper </MenuItem>

                </Link>

                <Divider />

                <Link
                    href="https://discord.gg/5YMTMbw9m4"
                    target='_blank'
                    sx={{ textDecoration: "none", color: "#000" }}
                >
                    {/* <MenuItem onClick={handleClose}>Discord </MenuItem> */}
                    <MenuItem onClick={handleClose}> <img src={Discord} alt="Discord" height="30px" width="30px" />
                        <span style={{ marginLeft: "5px" }}>Discord  </span>
                    </MenuItem>
                </Link>

                <Link
                    href="https://twitter.com/bedecent_lotto"
                    target='_blank'
                    sx={{ textDecoration: "none", color: "#000" }}
                >
                    {/* <MenuItem onClick={handleClose}>Discord </MenuItem> */}
                    <MenuItem onClick={handleClose}> <img src={Twitter} alt="Twitter" height="30px" width="30px" />
                        <span style={{ marginLeft: "5px" }}> Twitter </span>
                    </MenuItem>
                </Link>

                <Link
                    href="https://t.me/+XzZEgDhlmKA3OWM1"
                    target='_blank'
                    sx={{ textDecoration: "none", color: "#000" }}
                >
                    {/* <MenuItem onClick={handleClose}>Discord </MenuItem> */}
                    <MenuItem onClick={handleClose}> <img src={Telegram} alt="Telegram" height="30px" width="30px" />
                        <span style={{ marginLeft: "5px" }}>Telegram  </span>
                    </MenuItem>
                </Link>

                <Divider />

                <MenuItem> LINK balance: {masterContract.linkBalance}</MenuItem>
                {/* <MenuItem> Our balance: {masterContract.ourBalance}</MenuItem> */}
                <MenuItem> Charity balance: {masterContract.charity}</MenuItem>

            </Menu>

            <div className={classes.headerElement2}>
                <img src={logo} alt="LOGO" width="70px" height="70px" />
                <img src={logo2} alt="LOGO" width="140px" height="70px" />
            </div>

            <div className={classes.headerElement3} >
                {
                    isConnected ? (
                        <Button
                            variant='contained'
                            // sx={{bgcolor:"#ffb409", color: "#fff", fontSize: "16px", fontWeight: "500", borderRadius: 0}} 
                            sx={{
                                bgcolor: "#ffb409",
                                fontSize: "10px",
                                color: "#000",
                                height: "30px",
                                width: "100px",
                                borderRadius: 0,
                                '&:hover': { bgcolor: "#737473", color: "#fff", borderColor: "transparent" }
                            }}
                            onClick={deactivate}
                        >
                            Disconnect
                        </Button>
                    ) : (
                        <Button sx={{ color: "#fff", fontSize: "16px", fontWeight: "500" }}
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

        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        background: "#000",
        boxShadow: '0 3px 5px 2px rgba(255, 180, 9, 0.3)',

        border: 0,
        //   border: "1px solid black",

        borderRadius: 3,
        color: 'white',
        fontSize: "16px",
        fontWeight: "600",
        height: 52,
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
    },
    link: {
        textDecoration: "none", color: "#000"
    }
});
