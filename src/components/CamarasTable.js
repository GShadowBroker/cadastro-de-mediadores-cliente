import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  makeStyles,
  TablePagination,
  Fade,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { useSelector, useDispatch } from "react-redux";
import { getCamarasList } from "../services/mediatorsService";
import { initCamaras } from "../store/mediatorsReducer";
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

const CamarasTable = () => {
  const [loading, setLoading] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const dispatch = useDispatch();
  const camaras = useSelector((state) => state.mediatorsReducer.camaras);
  const camarasCount = useSelector(
    (state) => state.mediatorsReducer.camarasCount
  );
  const [limit, setLimit] = useState(40);
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (!camaras || camaras.length === 0) {
      setLoading(true);
      getCamarasList({ limit, offset })
        .then((data) => {
          dispatch(initCamaras(data.rows, data.count));
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setSnackOpen(true);
          setSnackMessage(errorHandler(err));
        });
    }
  }, [camaras, dispatch, offset, limit]);

  const classes = useStyles();

  const createData = (
    id,
    nome_fantasia,
    units,
    cities,
    rating,
    average_value
  ) => {
    return { id, nome_fantasia, units, cities, rating, average_value };
  };
  const rows =
    (camaras &&
      camaras.map((c) =>
        createData(
          c.id,
          c.nome_fantasia,
          c.actuation_units,
          c.actuation_cities,
          Math.ceil(Math.random() * 5),
          c.average_value
        )
      )) ||
    [];

  const handleChangePage = (event, newPage) => {
    if (newPage > page) {
      // Next page
      setPage(newPage);
      const nextOffset = offset + limit;
      getCamarasList({ limit, offset: nextOffset })
        .then((data) => {
          dispatch(initCamaras(data.rows, data.count));
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
      getCamarasList({ limit, offset: prevOffset })
        .then((data) => {
          dispatch(initCamaras(data.rows, data.count));
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
    getCamarasList({ limit: +event.target.value, offset: 0 })
      .then((data) => {
        dispatch(initCamaras(data.rows, data.count));
      })
      .catch((err) => {
        setSnackOpen(true);
        setSnackMessage(errorHandler(err));
      });
  };

  if (loading) return <h1>Carregando...</h1>;

  return (
    <React.Fragment>
      <TablePagination
        rowsPerPageOptions={[40, 60, 100]}
        labelRowsPerPage="Câmaras por página"
        component="div"
        count={camarasCount}
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
                  to={`/perfil/publico/camara/${row.id}`}
                >
                  <TableCell component="th" scope="row">
                    {row.nome_fantasia}
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
        labelRowsPerPage="Câmaras por página"
        component="div"
        count={camarasCount}
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

export default CamarasTable;
