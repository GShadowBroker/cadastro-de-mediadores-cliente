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
import AutorenewIcon from "@material-ui/icons/Autorenew";
import { Rating } from "@material-ui/lab";
import MUIDataTable from "mui-datatables";
import { useSelector, useDispatch } from "react-redux";
import { getMediatorsList } from "../services/mediatorsService";
import {
  initMediators,
  onChangeFilterName,
  onChangeFilterUnits,
  onChangeFilterAverageValues,
  onChangeFilterQualifications,
  onChangeFilterCity,
  onChangeFilterUf,
  onChangeOffset,
  onChangeLimit,
  onChangePage,
} from "../store/mediatorsReducer";
import Snackbar from "./utils/Snackbar";
import errorHandler from "../utils/errorHandler";
import { useHistory } from "react-router-dom";
import TableSkeleton from "./skeletons/TableSkeleton";
import Spinner from "./utils/Spinner";
import styled from "styled-components";
import courts from "../assets/data/courts";
import states from "../assets/data/uf";
import capitalizeWord from "../utils/capitalizeWord";

const SForm = styled.form`
  display: flex;
  align-items: center;
`;

const ResetContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const MediatorsTable = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const mediatorsState = useSelector((state) => state.mediatorsReducer);

  const mediators = mediatorsState.currentList;
  const mediatorsCount = mediatorsState.count;
  const limit = mediatorsState.limit;
  const offset = mediatorsState.offset;
  const page = mediatorsState.page;

  //filters
  const filterName = mediatorsState.filters.filterName;
  const filterUnits = mediatorsState.filters.filterUnits;
  const filterAverageValues = mediatorsState.filters.filterAverageValues;
  const filterQualifications = mediatorsState.filters.filterQualifications;
  const filterCity = mediatorsState.filters.filterCity;
  const filterUf = mediatorsState.filters.filterUf;

  const formatCity = (uf, city) => {
    if (!uf || !city) return "";
    return `${capitalizeWord(city)}/${uf}`;
  };

  useEffect(() => {
    const hasFilters = () => {
      if (
        filterName ||
        filterUnits.length > 0 ||
        filterAverageValues.length > 0 ||
        filterQualifications.length > 0 ||
        filterCity ||
        filterUf
      ) {
        return true;
      }
      return false;
    };

    if (hasFilters()) return;
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
  }, [
    mediators,
    dispatch,
    limit,
    offset,
    filterName,
    filterUnits,
    filterAverageValues,
    filterQualifications,
    filterCity,
    filterUf,
  ]);

  const hasFilters = () => {
    if (
      filterUnits.length > 0 ||
      filterAverageValues.length > 0 ||
      filterQualifications.length > 0 ||
      filterCity ||
      filterUf
    ) {
      return true;
    }
    return false;
  };

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
                  Unidades de atuação
                </InputLabel>
                <Select
                  id="filtrar-unidades-atuacao"
                  multiple
                  value={filterList[index]}
                  renderValue={(selected) => selected.join(", ")}
                  onChange={(event) => {
                    filterList[index] = event.target.value;
                    onChange(filterList[index], index, column);
                    dispatch(onChangeFilterUnits(filterList[index]));
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
        filterType: "custom",
        filterList: filterCity ? [filterCity] : [],
        filterOptions: {
          fullWidth: true,
          display: (filterList, onChange, index, column) => {
            return (
              <FormControl>
                <div>
                  <InputLabel htmlFor="filtrar-uf">UF</InputLabel>
                  <Select
                    id="filtrar-uf"
                    label="UF"
                    value={filterUf}
                    onChange={(event) => {
                      dispatch(onChangeFilterUf(event.target.value));
                    }}
                  >
                    <MenuItem value="">selecione</MenuItem>
                    {states.map((state) => (
                      <MenuItem key={state.sigla} value={state.sigla}>
                        {state.sigla}
                      </MenuItem>
                    ))}
                  </Select>
                  <TextField
                    id="filtrar-cidade"
                    name="filter_city"
                    label="Cidade de atuação"
                    value={filterCity}
                    onChange={(event) => {
                      dispatch(onChangeFilterCity(event.target.value));
                    }}
                    style={{ marginLeft: "1rem" }}
                  />
                </div>
              </FormControl>
            );
          },
        },
      },
    },
    {
      name: "qualificação",
      label: "Qualificação",
      options: {
        filter: true,
        sort: false,
        filterType: "custom",
        filterList: filterQualifications,
        filterOptions: {
          fullWidth: true,
          display: (filterList, onChange, index, column) => {
            const optionValues = [
              "5 estrelas",
              "4 estrelas",
              "3 estrelas",
              "2 estrelas",
              "1 estrela",
            ];
            return (
              <FormControl>
                <InputLabel htmlFor="filtrar-qualificacao">
                  Qualificação
                </InputLabel>
                <Select
                  id="filtrar-qualificacao"
                  multiple
                  value={filterList[index]}
                  renderValue={(selected) => selected.join(", ")}
                  onChange={(event) => {
                    filterList[index] = event.target.value;
                    onChange(filterList[index], index, column);
                    dispatch(onChangeFilterQualifications(filterList[index]));
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
      name: "valor médio",
      label: "Valor médio",
      options: {
        filter: true,
        sort: false,
        filterType: "custom",
        filterList: filterAverageValues,
        filterOptions: {
          fullWidth: true,
          display: (filterList, onChange, index, column) => {
            const optionValues = [
              { value: "voluntario", label: "Voluntário" },
              { value: "$", label: "Patamar básico" },
              { value: "$$", label: "Patamar intermediário" },
              { value: "$$$", label: "Patamar avançado" },
              { value: "$$$$", label: "Patamar extraordinário" },
            ];
            return (
              <FormControl>
                <InputLabel htmlFor="filtrar-valor-medio">
                  Valor médio
                </InputLabel>
                <Select
                  id="filtrar-valor-medio"
                  multiple
                  value={filterList[index]}
                  renderValue={(selected) => selected.join(", ")}
                  onChange={(event) => {
                    filterList[index] = event.target.value;
                    onChange(filterList[index], index, column);
                    dispatch(onChangeFilterAverageValues(filterList[index]));
                  }}
                >
                  {optionValues.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      <Checkbox
                        color="primary"
                        checked={filterList[index].indexOf(item.value) > -1}
                      />
                      <ListItemText primary={item.label} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            );
          },
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
      dispatch(onChangePage(newPage));
      getMediatorsList({
        limit,
        offset: nextOffset,
        filterName,
        filterUnits,
        filterAverageValues,
        filterQualifications,
        filterCity: formatCity(filterUf, filterCity),
      })
        .then((data) => {
          dispatch(initMediators(data.rows, data.count));
          dispatch(onChangeOffset(nextOffset));
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
      dispatch(onChangePage(newPage));
      getMediatorsList({
        limit,
        offset: prevOffset,
        filterName,
        filterUnits,
        filterAverageValues,
        filterQualifications,
        filterCity: formatCity(filterUf, filterCity),
      })
        .then((data) => {
          dispatch(initMediators(data.rows, data.count));
          dispatch(onChangeOffset(prevOffset));
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
    dispatch(onChangeOffset(0));
    dispatch(onChangePage(0));
    dispatch(onChangeLimit(newRowsPerPage));
    getMediatorsList({
      limit: newRowsPerPage,
      offset: 0,
      filterName,
      filterUnits,
      filterAverageValues,
      filterQualifications,
      filterCity: formatCity(filterUf, filterCity),
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
    getMediatorsList({
      limit,
      offset: 0,
      filterName: search,
      filterUnits,
      filterAverageValues,
      filterQualifications,
      filterCity: formatCity(filterUf, filterCity),
    })
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
    dispatch(onChangeFilterName(""));
    dispatch(onChangePage(0));
    getMediatorsList({
      limit,
      offset: 0,
      filterUnits,
      filterAverageValues,
      filterQualifications,
      filterCity: formatCity(filterUf, filterCity),
    })
      .then((data) => {
        dispatch(initMediators(data.rows, data.count));
      })
      .catch((err) => {
        setSnackOpen(true);
        setSnackMessage(errorHandler(err));
      });
  };

  const resetAllFilters = () => {
    setLoading(true);
    dispatch(onChangeFilterName(""));
    dispatch(onChangeFilterUnits([]));
    dispatch(onChangeFilterAverageValues([]));
    dispatch(onChangeFilterQualifications([]));
    dispatch(onChangeFilterUf(""));
    dispatch(onChangeFilterCity(""));
    dispatch(onChangePage(0));
    getMediatorsList({
      limit,
      offset: 0,
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
            onChange={({ target }) =>
              dispatch(onChangeFilterName(target.value))
            }
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
            disabled={!hasFilters()}
            variant="contained"
            onClick={() => {
              setLoading(true);
              getMediatorsList({
                limit,
                offset: 0,
                filterName,
                filterUnits,
                filterAverageValues,
                filterQualifications,
                filterCity: formatCity(filterUf, filterCity),
              })
                .then((data) => {
                  dispatch(initMediators(data.rows, data.count));
                  dispatch(onChangeOffset(0));
                  dispatch(onChangePage(0));
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
          const newFiltersList = [...filterUnits].filter(
            (item) => item !== removedFilter
          );
          dispatch(onChangeFilterUnits(newFiltersList));
          setLoading(true);
          getMediatorsList({
            limit,
            offset: 0,
            filterName,
            filterUnits: newFiltersList,
            filterAverageValues,
            filterQualifications,
            filterCity: formatCity(filterUf, filterCity),
          })
            .then((data) => {
              dispatch(initMediators(data.rows, data.count));
              dispatch(onChangeOffset(0));
              setLoading(false);
            })
            .catch((err) => {
              setSnackOpen(true);
              setSnackMessage(errorHandler(err));
              setLoading(false);
            });

          break;
        case 2:
          dispatch(onChangeFilterCity(""));
          dispatch(onChangeFilterUf(""));
          setLoading(true);
          getMediatorsList({
            limit,
            offset: 0,
            filterName,
            filterUnits,
            filterAverageValues,
            filterQualifications,
            filterCity: null,
          })
            .then((data) => {
              dispatch(initMediators(data.rows, data.count));
              dispatch(onChangeOffset(0));
              setLoading(false);
            })
            .catch((err) => {
              setSnackOpen(true);
              setSnackMessage(errorHandler(err));
              setLoading(false);
            });
          break;
        case 3:
          const newQualifList = [...filterQualifications].filter(
            (item) => item !== removedFilter
          );
          dispatch(onChangeFilterQualifications(newQualifList));
          setLoading(true);
          getMediatorsList({
            limit,
            offset: 0,
            filterName,
            filterUnits,
            filterAverageValues,
            filterQualifications: newQualifList,
            filterCity: formatCity(filterUf, filterCity),
          })
            .then((data) => {
              dispatch(initMediators(data.rows, data.count));
              dispatch(onChangeOffset(0));
              setLoading(false);
            })
            .catch((err) => {
              setSnackOpen(true);
              setSnackMessage(errorHandler(err));
              setLoading(false);
            });
          break;
        case 4:
          const newFilteredAverages = [...filterAverageValues].filter(
            (item) => item !== removedFilter
          );
          dispatch(onChangeFilterAverageValues(newFilteredAverages));
          setLoading(true);
          getMediatorsList({
            limit,
            offset: 0,
            filterName,
            filterUnits,
            filterAverageValues: newFilteredAverages,
            filterQualifications,
            filterCity: formatCity(filterUf, filterCity),
          })
            .then((data) => {
              dispatch(initMediators(data.rows, data.count));
              dispatch(onChangeOffset(0));
              setLoading(false);
            })
            .catch((err) => {
              setSnackOpen(true);
              setSnackMessage(errorHandler(err));
              setLoading(false);
            });
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
        <div>
          {hasFilters() && (
            <ResetContainer>
              <Button
                size="small"
                startIcon={<AutorenewIcon />}
                color="secondary"
                onClick={resetAllFilters}
              >
                limpar todos os filtros
              </Button>
            </ResetContainer>
          )}
          <MUIDataTable
            title={"Lista de mediadores"}
            data={data}
            columns={columns}
            options={options}
          />
        </div>
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
