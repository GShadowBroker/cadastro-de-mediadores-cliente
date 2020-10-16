import React, { useState, useEffect } from "react";
import {
  Fade,
  Grow,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Tooltip,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  InputLabel,
} from "@material-ui/core";
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
import styled from "styled-components";
import courts from "../assets/data/courts";

const SForm = styled.form`
  display: flex;
  align-items: center;
`;

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

  //filters
  const [filterName, setFilterName] = useState("");
  const [filterUnits, setFilterUnits] = useState([]);

  useEffect(() => {
    if (filterName || (filterUnits && filterUnits.length)) return;
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
  }, [mediators, dispatch, limit, offset, filterName, filterUnits]);

  if (loading) return <TableSkeleton />;

  const columns = [
    {
      name: "nome",
      label: "Nome",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "unidades de atuação",
      label: "Unidades de atuação",
      options: {
        filter: true,
        sort: false,
        filterType: "custom",
        filterList: filterUnits,
        filterOptions: {
          fullWidth: true,
          display: (filterList, onChange, index, column) => {
            const optionValues = courts;
            return (
              <FormControl>
                <InputLabel htmlFor="filtrar-unidades-atuacao">
                  Unidades
                </InputLabel>
                <Select
                  id="filtrar-unidades-atuacao"
                  multiple
                  value={filterList[index]}
                  renderValue={(selected) => selected.join(", ")}
                  onChange={(event) => {
                    filterList[index] = event.target.value;
                    onChange(filterList[index], index, column);
                    setFilterUnits(filterList[index]);
                  }}
                >
                  {optionValues.map((item) => (
                    <MenuItem key={item} value={item}>
                      <Checkbox
                        color="primary"
                        checked={filterList[index].indexOf(item) > -1}
                      />
                      <ListItemText primary={item} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            );
          },
        },
      },
    },
    {
      name: "cidades de atuação",
      label: "Cidades de atuação",
      options: {
        filter: true,
        sort: false,
        filterType: "textField",
        filterOptions: {
          fullWidth: true,
        },
      },
    },
    {
      name: "qualificação",
      label: "Qualificação",
      options: {
        filter: true,
        sort: false,
        filterType: "multiselect",
        filterOptions: {
          fullWidth: true,
          names: [
            "1 estrela",
            "2 estrelas",
            "3 estrelas",
            "4 estrelas",
            "5 estrelas",
          ],
        },
      },
    },
    {
      name: "valor médio",
      label: "Valor médio",
      options: {
        filter: true,
        sort: false,
        filterType: "multiselect",
        filterOptions: {
          fullWidth: true,
          names: [
            "Voluntário",
            "Patamar básico",
            "Patamar intermediário",
            "Patamar avançado",
            "Patamar extraordinário",
          ],
        },
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
      getMediatorsList({ limit, offset: nextOffset, filterName, filterUnits })
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
      getMediatorsList({ limit, offset: prevOffset, filterName, filterUnits })
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
    getMediatorsList({
      limit: newRowsPerPage,
      offset: 0,
      filterName,
      filterUnits,
    })
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
    getMediatorsList({ limit, offset: 0, filterName: search, filterUnits })
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
    setFilterName("");
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
      <Grow in={true}>
        <SForm
          onSubmit={(e) => {
            e.preventDefault();
            handleSearchClick(filterName);
          }}
        >
          <TextField
            id="pesquisar mediadores"
            name="search"
            placeholder="pesquisar mediador"
            size="small"
            value={filterName}
            onChange={({ target }) => setFilterName(target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              "aria-label": "pesquisar",
            }}
          />
          <IconButton onClick={handleSearchClear} disabled={!filterName}>
            <CloseIcon fontSize="small" />
          </IconButton>
          {searchLoading ? (
            <Button variant="contained" disabled>
              <Spinner />
              <span style={{ marginLeft: 5 }}>processando</span>
            </Button>
          ) : (
            <Button variant="contained" type="submit" disabled={!filterName}>
              Pesquisar
            </Button>
          )}
          <Tooltip title="Resetar lista de mediadores">
            <Button
              variant="text"
              onClick={(e) => {
                e.preventDefault();
                handleSearchClear();
              }}
              size="small"
              style={{ marginLeft: "1rem" }}
            >
              resetar
            </Button>
          </Tooltip>
        </SForm>
      </Grow>
    ),
    searchOpen: !!filterName,
    confirmFilters: true,
    customFilterDialogFooter: (currentFilterList, applyNewFilters) => {
      return (
        <div style={{ marginTop: "40px" }}>
          <Button
            variant="contained"
            onClick={() => {
              setLoading(true);
              getMediatorsList({
                limit,
                offset: 0,
                filterName,
                filterUnits,
              })
                .then((data) => {
                  dispatch(initMediators(data.rows, data.count));
                  setOffset(0);
                  setLoading(false);
                  applyNewFilters();
                })
                .catch((err) => {
                  setSnackOpen(true);
                  setSnackMessage(errorHandler(err));
                  setLoading(false);
                });
            }}
          >
            Aplicar Filtros
          </Button>
        </div>
      );
    },
    onFilterChipClose: (index, removedFilter, filterList) => {
      switch (index) {
        case 1:
          console.log("removing unit");
          const newFiltersList = [...filterUnits].filter(
            (item) => item !== removedFilter
          );
          setFilterUnits(newFiltersList);
          setLoading(true);
          getMediatorsList({
            limit,
            offset: 0,
            filterName,
            filterUnits: newFiltersList,
          })
            .then((data) => {
              dispatch(initMediators(data.rows, data.count));
              setOffset(0);
              setLoading(false);
            })
            .catch((err) => {
              setSnackOpen(true);
              setSnackMessage(errorHandler(err));
              setLoading(false);
            });

          break;
        case 2:
          console.log("removing city");
          break;
        case 3:
          console.log("removing qualification");
          break;
        case 4:
          console.log("removing average value");
          break;
        default:
          break;
      }
    },
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
