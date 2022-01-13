import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { shortenIfAddress } from "@usedapp/core";
import { useDispatch, useSelector } from 'react-redux';
import { decreaseCount ,increaseCount, LotteryData, DataType, addActiveLotteries, setActiveUserInfo, setNetworkDetails, setContractMethods } from '../Store';
import CircularProgress from '@mui/material/CircularProgress';


interface Column {
  id: 'id' | 'prize' | 'winner';
  label: string;
  minWidth: number;
  align?: 'right' | "center";
  format?: (value: number) => string;
}

let columns: readonly Column[] = [
  { id: 'id', label: 'ID', minWidth: 50, align: 'center' },
  { id: 'prize', label: "Prize", minWidth: 50, align: 'center' },
  { id: 'winner', label: "Winner", minWidth: 200, align: 'center' },
];

interface Data {
  id: number;
  prize: string;
  winner: string;
  status: "Claimed" |"Not Claimed" ;
}


const myAddress = "0xE813d775f33a97BDA25D71240525C724423D4Cd0";


// let data = [
//   {
//     id: 1,
//     prize: "100",
//     winner: "0xE813d775f33a97BDA25D71240525C724423D4Cd0",
//   },
//   {
//     id: 2,
//     prize: "100",
//     winner: myAddress,
//   },
//   {
//     id: 3,
//     prize: "100",
//     winner: "0x17cb493156707D8b8CA03DD6cbf3c034f4513497",
//   },
//   {
//     id: 4,
//     prize: "100",
//     winner: "0x17cb493156707D8b8CA03DD6cbf3c034f4513497",
//   },
//   { 
//     id: 5,
//     prize: "100",
//     winner: "0x17cb493156707D8b8CA03DD6cbf3c034f4513497",
//   },
//   {
//     id: 6,
//     prize: "100",
//     winner: "0x17cb493156707D8b8CA03DD6cbf3c034f4513497",
//   },
// ];


export const LotteryTable = () => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const {lotteryData, networkDetail, masterContract} = useSelector((state: DataType) => state);
  console.log("All ", lotteryData.allLotteries)


  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };



  
  
  if(!lotteryData.allLotteries){
    return (
      <div style={{border: "0px solid black", height: "400px", width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}> <CircularProgress size={50} sx={{color: "#fff"}} /> </div>
      )
    }
    
    console.log( "Contains ",  lotteryData?.allLotteries?.some((lottery) => Number(lottery.staus) === 1) )

    const drawExists = lotteryData?.allLotteries?.some((lottery) => Number(lottery.staus) === 1);

    if(!drawExists){
      return(
        <div>No Draw Result Exists </div>
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
            {lotteryData.allLotteries && lotteryData.allLotteries
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((lottery) => (
                <>
                {
                  Number(lottery.staus) === 1 && (
                    <TableRow
                      key={Number(lottery.id)}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center">{Number(lottery.id)}</TableCell>
                      <TableCell align="center">{Number(lottery.prize)}</TableCell>
                      <TableCell align="center">{lottery.winner}</TableCell>
                    </TableRow>
                  )
                }
                </>
              ))}
          </TableBody>


        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={lotteryData?.allLotteries?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
