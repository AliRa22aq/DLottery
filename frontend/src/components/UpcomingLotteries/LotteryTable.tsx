import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { fetchLotteryData, addTickets, decreaseCount, increaseCount, LotteryData, DataType } from '../Store';
import { useDispatch, useSelector } from 'react-redux';
import Countdown from "react-countdown";
import { ethers } from "ethers";

interface Column {
  id: 'id' | 'price' | 'time' | 'contributions' | 'funds' | 'button';
  label: string;
  minWidth: number;
  align?: 'right' | "center";
  format?: (value: number) => string;
}

let columns: readonly Column[] = [
  { id: 'id', label: 'ID', minWidth: 50, align: 'center' },
  { id: 'price', label: "Price", minWidth: 50, align: 'center' },
  { id: 'contributions', label: "Participants/Tickets", minWidth: 50, align: 'center' },
  {
    id: 'time',
    label: 'Time Left',
    minWidth: 50,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'button',
    label: '',
    minWidth: 50,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US')
  },

];



export const LotteryTable = () => {

  const dispatch = useDispatch();
  const { lotteryData, userInfo, masterContract } = useSelector((state: DataType) => state);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const increaseCountFn = (id: number) => {
    dispatch(increaseCount(id))
  }

  const decreaseCountFn = (id: number) => {
    dispatch(decreaseCount(id))
  }

  const buyTicket = async (id: number, count: number, price: number) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    if (userInfo.userAddress === "") {
      alert("Please connect wallet")
      throw ("ERROR");
    }

    const totalCost = count * price;

    if (userInfo.userBalance < totalCost) {
      alert("Not Enough balance")
      throw ("ERROR");
    }

    const res = window.confirm(`Approve ${totalCost} OURs for ${count} tickets`)
    if (res) {
      const signer = provider.getSigner()
      const approveTokens = masterContract.erc20Methods.connect(signer);
      const buy = masterContract.lotteryMethods.connect(signer);

      try {
        const tx1 = await approveTokens.approve(masterContract.lotteryAddress, totalCost);
        let receipt1 = await tx1.wait();
        // console.log(receipt1);

        const tx2 = await buy.buyATicket(id, count);
        let receipt2 = await tx2.wait();

        const refreshedLotteryData = await masterContract.lotteryMethods.lotteryInfo(id)
        dispatch(fetchLotteryData(refreshedLotteryData));

      }
      catch (e) {
        console.log(e)
      }

    }

  }

  const endALottery = async (id: number) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    console.log(masterContract.linkBalance)

    if (Number(masterContract?.linkBalance) < 0.1) {
      alert("Ask owner to topup LINK Tokens to find randomness");
      return;
    }

    const signer = provider.getSigner()
    const end = masterContract.lotteryMethods.connect(signer);
    try {
      const tx1 = await end.endALottery();
      let receipt1 = await tx1.wait();
      const refreshedLotteryData = await masterContract.lotteryMethods.lotteryInfo(id)
      dispatch(fetchLotteryData(refreshedLotteryData));
    }
    catch (e) {
      console.log(e)
    }

  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      // Render a completed state
      return <div style={{ fontSize: "12px", fontWeight: 500 }}> Expired </div>;
    } else {
      // Render a countdown
      return (
        <div style={{ fontSize: "12px", fontWeight: 500 }}> {days}:{hours}:{minutes}:{seconds} </div>
      )
    }
  };

  if (!lotteryData.activeLottries) {
    return (
      <div style={{ border: "0px solid black", height: "400px", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        No Active Lottery
      </div>
    )
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 350 }}>

        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody sx={{ border: "1px solid black" }}>

            {
              lotteryData?.activeLottries && lotteryData?.activeLottries
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((lottery: LotteryData) => (
                  <TableRow
                    key={Number(lottery.id)}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell sx={{ border: "0px solid black", fontSize: '10px' }} align="center">{Number(lottery.id)}</TableCell>
                    {/* <TableCell sx={{ border: "0px solid black", fontSize: '10px'}} align="center">{ Number(ethers.utils.formatEther(lottery.priceOfTicket)) } {masterContract.erc20Symbol} </TableCell> */}
                    <TableCell sx={{ border: "0px solid black", fontSize: '10px' }} align="center">{Number(lottery.priceOfTicket)} {masterContract.erc20Symbol} </TableCell>
                    <TableCell sx={{ border: "0px solid black", fontSize: '10px' }} align="center">{`${Number(lottery.countOfParticipants)}/${Number(lottery.countOfTickets)}`}</TableCell>
                    <TableCell sx={{ border: "0px solid black", fontSize: '10px' }} align="center"> <Countdown date={Number(lottery.endingtime) * 1000} renderer={renderer} /> </TableCell>

                    <TableCell align="center" >

                      {
                        lottery.status === 0 &&
                        Date.now() < Number(lottery.endingtime) * 1000 && (
                          <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>

                            <span onClick={() => decreaseCountFn(Number(lottery.id))} style={{ cursor: "pointer", fontSize: "16px", marginRight: "2px" }}> - </span>

                            <Button
                              variant='contained'
                              onClick={() => buyTicket(Number(lottery.id), lottery.count, Number(lottery.priceOfTicket))}
                              sx={{
                                bgcolor: "#ffb409", fontSize: "8px", color: "#000", width: "30px", borderRadius: 0,
                                '&:hover': { bgcolor: "#737473", color: "#fff", borderColor: "transparent" }
                              }}>
                              Buy {lottery.count}
                            </Button>

                            <span onClick={() => increaseCountFn(Number(lottery.id))} style={{ cursor: "pointer", fontSize: "16px", marginLeft: "2px" }}> + </span>

                          </div>
                        )
                      }

                      {
                        lottery.status === 0 &&
                        Date.now() > Number(lottery.endingtime) * 1000 &&
                        lottery.owner.toLowerCase() === userInfo.userAddress.toLowerCase() && (
                          <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
                            <Button
                              variant='contained'
                              onClick={() => endALottery(Number(lottery.id))}
                              sx={{
                                bgcolor: "#ffb409", fontSize: "8px", color: "#000", width: "30px", borderRadius: 0,
                                '&:hover': { bgcolor: "#737473", color: "#fff", borderColor: "transparent", }
                              }}>
                              END
                            </Button>
                          </div>
                        )

                      }

                      {
                        lottery.status === 1 &&
                        Date.now() > Number(lottery.endingtime) * 1000 &&
                        lottery.owner.toLowerCase() === userInfo.userAddress.toLowerCase() &&

                        (
                          <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
                            <Button
                              variant='contained'
                              sx={{
                                bgcolor: "#ffb409", fontSize: "8px", color: "#000", width: "30px", borderRadius: 0,
                                '&:hover': { bgcolor: "#737473", color: "#fff", borderColor: "transparent", }
                              }}>
                              Processing
                            </Button>
                          </div>
                        )

                      }

                    </TableCell>
                  </TableRow>
                ))
            }

          </TableBody>


        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={lotteryData?.activeLottries?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
