import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

interface Column {
  id: 'id' | 'price' | 'time' | 'status'  |'button';
  label: string;
  minWidth?: number;
  align?: 'right' | "center";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'id', label: 'ID', minWidth: 80, align: 'center' },
  { id: 'price', label: "Price", minWidth: 80, align: 'center' },
  { id: 'status', label: "Status", minWidth: 80, align: 'center' },
  {
    id: 'time',
    label: 'Time Left',
    minWidth: 80,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'button',
    label: '',
    minWidth: 80,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },

];

interface Data {
  id: string;
  price: string;
  status: string;
  time: number;
}

function createData(
  id: string,
  price: string,
  status: string,
  time: number,
): Data {
  return { id, price, status, time };
}

const rows = [
  createData('1', '200 OURS', "In Progress", 124),
  createData('2', '200 OURS', "In Progress", 124),
  createData('3', '200 OURS', "In Progress", 124),
  createData('4', '200 OURS', "In Progress", 124),
  createData('5', '200 OURS', "In Progress", 124),
  createData('21', '200 OURS', "In Progress", 124),
  createData('22', '200 OURS', "In Progress", 124),
  createData('32', '200 OURS', "In Progress", 124),
  createData('42', '200 OURS', "In Progress", 124),
  createData('52', '200 OURS', "In Progress", 124),
  createData('13', '200 OURS', "In Progress", 124),
  createData('24', '200 OURS', "In Progress", 124),
  createData('34', '200 OURS', "In Progress", 124),
  createData('44', '200 OURS', "In Progress", 124),
  createData('54', '200 OURS', "In Progress", 124),


];

export const LotteryTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
          {/* <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      // const value = columns[row.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {row.id}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody> */}
              <TableBody sx={{border: "1px solid black"}}>
                {rows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell align="center">{row.price}</TableCell>
                    <TableCell align="center">{row.status}</TableCell>
                    <TableCell align="center">{row.time}</TableCell>
                    <TableCell align="center"> <button> XXX </button></TableCell>
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
