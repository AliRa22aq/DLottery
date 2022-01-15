import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BigNumber } from 'ethers'
// import web3 from 'web3';

interface MasterContract {
  lotteryAddress: string,
  lotteryMethods: any,
  erc20Address: string,
  erc20Symbol: string,
  erc20Methods: any,
  linkBalance: number | null
  ourBalance: number | null
}

interface NetworkDetail {
  id: number,
  chain: string
}

interface UserInfo {
  userAddress: string,
  userBalance: number,
}

export interface LotteryData {
  id: BigNumber;
  accumulatedFunds: BigNumber;
  countOfParticipants: BigNumber | Number;
  countOfTickets: BigNumber | Number;
  endingtime: BigNumber;
  owner: string;
  ownerCommision: BigNumber;
  priceOfTicket: BigNumber;
  prize: BigNumber;
  status: number
  winner: string;
  winnerIndex: BigNumber;
  count: number;
}

export interface DataType {
  networkDetail:NetworkDetail,
  userInfo : UserInfo,
  loading: boolean,
  transectionProgress: boolean,
  masterContract: MasterContract,
  lotteryData: {
    allLotteries: LotteryData[] | null,
    activeLottries: LotteryData[] | null
  }
} 


const initialState: DataType = {
  networkDetail : {
    id: 0,
    chain: "",
  },
  userInfo : {
    userAddress: "",
    userBalance: 0,
  },
  loading: false,
  transectionProgress: false,
  masterContract: {
    lotteryAddress: "0xa57B160D99Af7fb60448bb2733326c84cDf6A23C",
    lotteryMethods: null,
    erc20Address: "0x78D85b6CA607e628f2981198EDF0f28E7A571E5f",
    erc20Symbol: "",
    erc20Methods: null,
    linkBalance: null,
    ourBalance: null
  
  },
  lotteryData: {
    allLotteries:  null,
    activeLottries: null
  }}

const dataSlice = createSlice({
  name: "Lottery",
  initialState,
  reducers: {
    clearState(state) {
      return initialState;
    },
    
    setActiveUserInfo(state, { payload }: PayloadAction<{address: string, balance: number, erc20Symbol: string}>) {
      state.userInfo.userAddress = payload.address;
      state.userInfo.userBalance = payload.balance;
      state.masterContract.erc20Symbol = payload.erc20Symbol
    },
    setActiveUser(state, { payload }: PayloadAction<string>){
      state.userInfo.userAddress = payload;
    },
    setNetworkDetails(state, { payload }: PayloadAction<NetworkDetail>) {
      state.networkDetail.id = payload.id;
      state.networkDetail.chain = payload.chain;
    },
    setLoading(state, { payload }: PayloadAction<boolean>) {
      state.loading = payload
    },
    setTransactionProgress(state, { payload }: PayloadAction<boolean>) {
      state.transectionProgress = payload
    },
    setContractMethods(state, { payload }: PayloadAction<{lotteryMethods: any, erc20Methods: any}>) {
      state.masterContract.lotteryMethods = payload.lotteryMethods
      state.masterContract.erc20Methods = payload.erc20Methods
    },

    addActiveLotteries(state, { payload }: PayloadAction<LotteryData>) {
      if(state.lotteryData.activeLottries === null){
        state.lotteryData.activeLottries = [payload]
      }
      else {
        state.lotteryData.activeLottries.push(payload)
      }
    },

    addAllLotteries(state, { payload }: PayloadAction<LotteryData>) {
      if(state.lotteryData.allLotteries === null){
        state.lotteryData.allLotteries = [payload]
      }
      else {
        state.lotteryData.allLotteries.push(payload)
      }
    },

    fetchLotteryData(state, { payload }: PayloadAction<LotteryData>) {
      state.lotteryData?.activeLottries?.map((lottery) => {
        if(Number(lottery.id) === Number(payload.id)){
          lottery.countOfParticipants = payload.countOfParticipants;
          lottery.countOfTickets = payload.countOfTickets;
          lottery.status = payload.status
        }
      })

    },
    
    
    addTickets(state, { payload }: PayloadAction<{id: number, tickets: number}>) {
        state.lotteryData?.activeLottries?.map((lottery) => {
          if(Number(lottery.id) === payload.id){
            lottery.countOfTickets = Number(lottery.countOfTickets) + Number(payload.tickets);
            lottery.countOfParticipants = Number(lottery.countOfParticipants) + 1 
          }
        })
    },

    
    readLinkBalance(state, {payload}: PayloadAction<{linkBalance: number, ourBalance: number}>){
      state.masterContract.linkBalance = payload.linkBalance;
      state.masterContract.ourBalance = payload.ourBalance;
    },

    increaseCount(state, { payload }: PayloadAction<number>) {
      // console.log("inside store")
      state.lotteryData.activeLottries && state.lotteryData.activeLottries.map((lottery) => {
          if(Number(lottery.id) == payload && lottery.count < 10){
            lottery.count++
          }
        })
    },
    
    decreaseCount(state, { payload }: PayloadAction<number>) {
      state.lotteryData.activeLottries && state.lotteryData.activeLottries.map((lottery) => {
          if(Number(lottery.id) === payload && lottery.count > 0){
            lottery.count--
          }
        })
    },


  }


});




// Extract the action creators object and the reducer
const { actions, reducer } = dataSlice
// Extract and export each action creator by name
export const { fetchLotteryData, addTickets, setActiveUser, addAllLotteries, readLinkBalance, decreaseCount ,increaseCount, addActiveLotteries, setContractMethods, clearState, setActiveUserInfo, setNetworkDetails, setLoading, setTransactionProgress } = actions
// Export the reducer, either as a default or named export
export default reducer
