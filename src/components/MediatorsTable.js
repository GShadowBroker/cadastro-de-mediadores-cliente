import React, { useState, useEffect } from "react";
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
import { Rating } from "@material-ui/lab";
import { useSelector, useDispatch } from "react-redux";
import { getMediatorsList } from "../services/mediatorsService";
import { initMediators } from "../store/mediatorsReducer";
import Snackbar from "./utils/Snackbar";
import errorHandler from "../utils/errorHandler";
import { Link } from "react-router-dom";

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
  const [loading, setLoading] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const mediators = useSelector((state) => state.mediatorsReducer.mediators);
  const mediatorsCount = useSelector(
    (state) => state.mediatorsReducer.mediatorsCount
  );
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(40);
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (!mediators || mediators.length === 0) {
      setLoading(true);
      getMediatorsList({ limit, offset })
        .then((data) => {
          dispatch(initMediators(data.rows, data.count));
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setSnackOpen(true);
          setSnackMessage(errorHandler(err));
        });
    }
  }, [mediators, dispatch, limit, offset]);

  const classes = useStyles();

  const createData = (id, fullname, units, cities, rating, average_value) => {
    return { id, fullname, units, cities, rating, average_value };
  };

  if (loading) return <h1>Carregando...</h1>;

  const rows =
    (mediators &&
      mediators.map((m) =>
        createData(
          m.id,
          m.fullname,
          m.actuation_units,
          m.actuation_cities,
          Math.ceil(Math.random() * 5),
          m.average_value
        )
      )) ||
    [];

  const handleChangePage = (event, newPage) => {
    if (newPage > page) {
      // Next page
      setPage(newPage);
      const nextOffset = offset + limit;
      getMediatorsList({ limit, offset: nextOffset })
        .then((data) => {
          dispatch(initMediators(data.rows, data.count));
          setOffset(nextOffset);
        })
        .catch((err) => {
          setSnackOpen(true);
          setSnackMessage(errorHandler(err));
        });
      window.scrollTo(0, 0);
    } else {
      // Previous page
      setPage(newPage);
      const prevOffset = offset - limit;
      getMediatorsList({ limit, offset: prevOffset })
        .then((data) => {
          dispatch(initMediators(data.rows, data.count));
          setOffset(prevOffset);
        })
        .catch((err) => {
          setSnackOpen(true);
          setSnackMessage(errorHandler(err));
        });
      window.scrollTo(0, 0);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setLimit(+event.target.value);
    setPage(0);
    setOffset(0);
    getMediatorsList({ limit: +event.target.value, offset: 0 })
      .then((data) => {
        dispatch(initMediators(data.rows, data.count));
      })
      .catch((err) => {
        setSnackOpen(true);
        setSnackMessage(errorHandler(err));
      });
  };

  return (
    <React.Fragment>
      <TablePagination
        rowsPerPageOptions={[40, 60, 100]}
        labelRowsPerPage="Mediadores por página"
        component="div"
        count={mediatorsCount}
        page={page}
        onChangePage={handleChangePage}
        rowsPerPage={limit}
        onChangeRowsPerPage={handleChangeRowsPerPage}
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
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  component={Link}
                  to={`/perfil/publico/mediador/${row.id}`}
                >
                  <TableCell component="th" scope="row">
                    {row.fullname}
                  </TableCell>
                  <TableCell align="right">{row.units.join(", ")}</TableCell>
                  <TableCell align="right">{row.cities.join(", ")}</TableCell>
                  <TableCell align="right">
                    <Rating
                      name="half-rating"
                      value={row.rating}
                      precision={0.5}
                      readOnly
                    />
                  </TableCell>
                  <TableCell align="right">{row.average_value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Fade>
      <TablePagination
        rowsPerPageOptions={[40, 60, 100]}
        labelRowsPerPage="Mediadores por página"
        component="div"
        count={mediatorsCount}
        page={page}
        onChangePage={handleChangePage}
        rowsPerPage={limit}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <Snackbar
        message={snackMessage}
        severity="error"
        autoHideDuration={6000}
        snackOpen={snackOpen}
        setSnackOpen={setSnackOpen}
      />
    </React.Fragment>
  );
};

export default MediatorsTable;
