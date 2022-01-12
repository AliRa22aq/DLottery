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

interface Column {
  id: 'id' | 'prize' | 'winner' | 'status' | 'button';
  label: string;
  minWidth: number;
  align?: 'right' | "center";
  format?: (value: number) => string;
}

let columns: readonly Column[] = [
  { id: 'id', label: 'ID', minWidth: 50, align: 'center' },
  { id: 'prize', label: "Prize", minWidth: 50, align: 'center' },
  { id: 'winner', label: "Winner", minWidth: 50, align: 'center' },
  {
    id: 'status',
    label: 'Status',
    minWidth: 100,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'button',
    label: '',
    minWidth: 100,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US')
  },

];

interface Data {
  id: number;
  prize: string;
  winner: string;
  status: "Claimed" |"Not Claimed" ;
}


const myAddress = "0xE813d775f33a97BDA25D71240525C724423D4Cd0";


let data = [
  {
    id: 1,
    prize: "100",
    winner: "0xE813d775f33a97BDA25D71240525C724423D4Cd0",
    status: "Claimed",
  },
  {
    id: 2,
    prize: "100",
    winner: myAddress,
    status: "Not Claimed",
  },
  {
    id: 3,
    prize: "100",
    winner: "0x17cb493156707D8b8CA03DD6cbf3c034f4513497",
    status: "Not Claimed",
  },
  {
    id: 4,
    prize: "100",
    winner: "0x17cb493156707D8b8CA03DD6cbf3c034f4513497",
    status: "Not Claimed",
  },
  { 
    id: 5,
    prize: "100",
    winner: "0x17cb493156707D8b8CA03DD6cbf3c034f4513497",
    status: "Not Claimed",
  },
  {
    id: 6,
    prize: "100",
    winner: "0x17cb493156707D8b8CA03DD6cbf3c034f4513497",
    status: "Not Claimed",
  },
];


export const LotteryTable = () => {

  const [rows, setRows] = useState(data);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  // const increaseCount = (id: number) => {
  //   setRows((rows) =>
  //     rows.map((row) => {
  //       if (row.count < 10 && row.id === id) {
  //         return {
  //           ...row,
  //           count: row.count++
  //         }
  //       }
  //       else {
  //         return {
  //           ...row
  //         }
  //       }
  //     })
  //   )
  // }

  // const decreaseCount = (id: number) => {
  //   setRows((rows) =>
  //     rows.map((row) => {
  //       if (row.count > 0 && row.id === id) {
  //         return {
  //           ...row,
  //           count: row.count--
  //         }
  //       }
  //       else {
  //         return {
  //           ...row
  //         }
  //       }
  //     })
  //   )
  // }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="center">{row.prize}</TableCell>
                  <TableCell align="center">{shortenIfAddress(row.winner)}</TableCell>
                  <TableCell align="center">{row.status}</TableCell>
                  <TableCell align="center" >

                    {
                      row.status === "Not Claimed" && row.winner === myAddress && (
                        <div style={{display: "flex", justifyContent: "space-evenly", alignItems: "center"}}>
                          <Button variant='contained' 
                          sx={{ 
                              bgcolor: "#ff6565", 
                              fontSize: "8px", 
                              width: "30px", 
                              borderRadius: 0 ,
                              '&:hover': { 
                                bgcolor: "#737473",
                                color: "#fff",
                                borderColor: "transparent",
                                }
                
                            }}>
                               Claim
                          </Button>
                        </div>
                      )
                    }

                  </TableCell>

                </TableRow>
              ))}
          </TableBody>


        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
