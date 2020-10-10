import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  makeStyles,
  Fade,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  root: {
    flexGrow: 1,
    margin: "1rem 0",
  },
});

const MediatorsTable = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <TablePagination
        rowsPerPageOptions={[40, 60, 100]}
        labelRowsPerPage="Ítens por página"
        component="div"
        count={40}
        page={0}
        onChangePage={() => {}}
        rowsPerPage={40}
        onChangeRowsPerPage={() => {}}
      />
      <Fade in={true}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell align="right">Unidades de atuação</TableCell>
                <TableCell align="right">Cidades de atuação</TableCell>
                <TableCell align="right">Qualificação</TableCell>
                <TableCell align="right">Valor Médio</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from(Array(40).keys()).map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    <Skeleton variant="text" width={100} />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton variant="text" width={100} />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton variant="text" width={100} />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton variant="text" width={100} />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton variant="text" width={100} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Fade>
      <TablePagination
        rowsPerPageOptions={[40, 60, 100]}
        labelRowsPerPage="Ítens por página"
        component="div"
        count={40}
        page={0}
        onChangePage={() => {}}
        rowsPerPage={40}
        onChangeRowsPerPage={() => {}}
      />
    </React.Fragment>
  );
};

export default MediatorsTable;
