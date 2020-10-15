import React, { useState, useEffect } from "react";
import { Fade, InputBase, IconButton, Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { Rating } from "@material-ui/lab";
import MUIDataTable from "mui-datatables";
import { useSelector, useDispatch } from "react-redux";
import { getMediatorsList } from "../services/mediatorsService";
import { initMediators } from "../store/mediatorsReducer";
import Snackbar from "./utils/Snackbar";
import errorHandler from "../utils/errorHandler";
import { useHistory } from "react-router-dom";
import TableSkeleton from "./skeletons/TableSkeleton";
import Spinner from "./utils/Spinner";

const MediatorsTable = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const mediators = useSelector((state) => state.mediatorsReducer.mediators);
  const mediatorsCount = useSelector(
    (state) => state.mediatorsReducer.mediatorsCount
  );
  const dispatch = useDispatch();

  const [limit, setLimit] = useState(50);
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

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

  if (loading) return <TableSkeleton />;

  const columns = [
    {
      name: "nome",
      label: "Nome",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "unidades de atuação",
      label: "Unidades de atuação",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "cidades de atuação",
      label: "Cidades de atuação",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "qualificação",
      label: "Qualificação",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "valor médio",
      label: "Valor médio",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  const getAverageValueLabel = (average_value) => {
    switch (average_value) {
      case "voluntario":
        return "Voluntário";
      case "$":
        return "Patamar básico";
      case "$$":
        return "Patamar intermediário";
      case "$$$":
        return "Patamar avançado";
      case "$$$$":
        return "Patamar extraordinário";
      default:
        return "Indefinido";
    }
  };

  const data =
    (mediators &&
      mediators.map((m) => [
        m.fullname,
        m.actuation_units.join(", "),
        m.actuation_cities.join(", "),
        <Rating
          name="half-rating"
          value={Math.ceil(Math.random() * 5)}
          precision={0.5}
          readOnly
        />,
        getAverageValueLabel(m.average_value),
      ])) ||
    [];

  const changePage = (newPage) => {
    setLoading(true);
    if (newPage > page) {
      // Next page
      const nextOffset = offset + limit;
      setPage(newPage);
      getMediatorsList({ limit, offset: nextOffset, fullname: searchTerm })
        .then((data) => {
          dispatch(initMediators(data.rows, data.count));
          setOffset(nextOffset);
          setLoading(false);
        })
        .catch((err) => {
          setSnackOpen(true);
          setSnackMessage(errorHandler(err));
          setLoading(false);
        });
      window.scrollTo(0, 0);
    } else {
      // Previous page
      const prevOffset = offset - limit;
      setPage(newPage);
      getMediatorsList({ limit, offset: prevOffset, fullname: searchTerm })
        .then((data) => {
          dispatch(initMediators(data.rows, data.count));
          setOffset(prevOffset);
          setLoading(false);
        })
        .catch((err) => {
          setSnackOpen(true);
          setSnackMessage(errorHandler(err));
          setLoading(false);
        });
      window.scrollTo(0, 0);
    }
  };

  const changeRowsPerPage = (newRowsPerPage) => {
    setLoading(true);
    setOffset(0);
    setPage(0);
    setLimit(newRowsPerPage);
    getMediatorsList({ limit: newRowsPerPage, offset: 0, fullname: searchTerm })
      .then((data) => {
        dispatch(initMediators(data.rows, data.count));
        setLoading(false);
      })
      .catch((err) => {
        setSnackOpen(true);
        setSnackMessage(errorHandler(err));
        setLoading(false);
      });
    window.scrollTo(0, 0);
  };

  const handleSearchClick = (search) => {
    setSearchLoading(true);
    getMediatorsList({ limit, offset: 0, fullname: search })
      .then((data) => {
        dispatch(initMediators(data.rows, data.count));
        setSearchLoading(false);
      })
      .catch((err) => {
        setSnackOpen(true);
        setSnackMessage(errorHandler(err));
        setSearchLoading(false);
      });
  };
  const handleSearchClear = () => {
    setSearchTerm("");
    setPage(0);
    getMediatorsList({ limit, offset: 0 })
      .then((data) => {
        dispatch(initMediators(data.rows, data.count));
      })
      .catch((err) => {
        setSnackOpen(true);
        setSnackMessage(errorHandler(err));
      });
  };

  const options = {
    filterType: "checkbox",
    responsive: "simple",
    elevation: 0,
    textLabels: {
      body: {
        noMatch: "Desculpe, nenhum resultado encontrado",
        toolTip: "Ordenar",
        columnHeaderTooltip: (column) => `Ordenar por ${column.label}`,
      },
      pagination: {
        next: "Próxima página",
        previous: "Página anterior",
        rowsPerPage: "Linhas por página:",
        displayRows: "de",
      },
      toolbar: {
        search: "Pesquisar",
        downloadCsv: "Baixar CSV",
        print: "Imprimir",
        viewColumns: "Mostrar Colunas",
        filterTable: "Filtrar Tabela",
      },
      filter: {
        all: "Tudo",
        title: "FILTROS",
        reset: "RESETAR",
      },
      viewColumns: {
        title: "Mostrar Colunas",
        titleAria: "Mostrar/Esconder Colunas da Tabela",
      },
      selectedRows: {
        text: "mediador(es) selecionado(s)",
        delete: "Excluir",
        deleteAria: "Excluir Mediadores Selecionadas",
      },
    },
    serverSide: true,
    page: page,
    count: mediatorsCount,
    rowsPerPage: limit,
    rowsPerPageOptions: [50, 80, 100],
    onTableChange: (action, tableState) => {
      switch (action) {
        case "changePage":
          changePage(tableState.page);
          break;
        case "changeRowsPerPage":
          changeRowsPerPage(tableState.rowsPerPage);
          break;
        case "rowSelectionChange":
          break;
        case "search":
          break;
        default:
          break;
      }
    },
    customSearchRender: (searchText, handleSearch, hideSearch, options) => (
      <div>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <InputBase
          placeholder="Pesquisar mediador"
          inputProps={{ "aria-label": "pesquisar por mediador" }}
          value={searchTerm}
          onChange={({ target }) => setSearchTerm(target.value)}
        />
        <IconButton onClick={handleSearchClear} disabled={!searchTerm}>
          <CloseIcon fontSize="small" />
        </IconButton>
        {searchLoading ? (
          <Button variant="contained" disabled>
            <Spinner />
            <span style={{ marginLeft: 5 }}>processando</span>
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={() => handleSearchClick(searchTerm)}
            disabled={!searchTerm}
          >
            Pesquisar
          </Button>
        )}
      </div>
    ),
    searchOpen: !!searchTerm,
    onRowClick: (rowData, rowMeta) => {
      history.push(
        `/perfil/publico/mediador/${mediators[+rowMeta.dataIndex].id}`
      );
    },
  };

  return (
    <React.Fragment>
      <Fade in={true}>
        <MUIDataTable
          title={"Lista de mediadores"}
          data={data}
          columns={columns}
          options={options}
        />
      </Fade>
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
