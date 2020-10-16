const initialState = {
  currentList: [],
  count: 0,
  limit: 50,
  offset: 0,
  page: 0,
  filters: {
    filterName: "",
    filterUnits: [],
    filterAverageValues: [],
    filterQualifications: [],
    filterCity: "",
    filterUf: "",
  },
};

const camarasReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CAMARAS":
      return {
        ...state,
        currentList: action.camaras,
        count: action.count,
      };
    case "CLEAR_CAMARAS":
      return initialState;

    case "CHANGE_CAMARAS_OFFSET":
      return {
        ...state,
        offset: action.payload,
      };

    case "CHANGE_CAMARAS_LIMIT":
      return {
        ...state,
        limit: action.payload,
      };

    case "CHANGE_CAMARAS_PAGE":
      return {
        ...state,
        page: action.payload,
      };

    case "CHANGE_CAMARAS_FILTER_NAME":
      return {
        ...state,
        filters: {
          ...state.filters,
          filterName: action.payload,
        },
      };

    case "CHANGE_CAMARAS_FILTER_UNITS":
      return {
        ...state,
        filters: {
          ...state.filters,
          filterUnits: action.payload,
        },
      };

    case "CHANGE_CAMARAS_FILTER_AVERAGE_VALUES":
      return {
        ...state,
        filters: {
          ...state.filters,
          filterAverageValues: action.payload,
        },
      };

    case "CHANGE_CAMARAS_FILTER_QUALIFICATIONS":
      return {
        ...state,
        filters: {
          ...state.filters,
          filterQualifications: action.payload,
        },
      };

    case "CHANGE_CAMARAS_FILTER_CITY":
      return {
        ...state,
        filters: {
          ...state.filters,
          filterCity: action.payload,
        },
      };

    case "CHANGE_CAMARAS_FILTER_UF":
      return {
        ...state,
        filters: {
          ...state.filters,
          filterUf: action.payload,
        },
      };
    default:
      return state;
  }
};

export const initCamaras = (camaras, count) => ({
  type: "ADD_CAMARAS",
  camaras,
  count,
});

export const onChangeOffset = (offset) => ({
  type: "CHANGE_CAMARAS_OFFSET",
  payload: offset,
});

export const onChangeLimit = (limit) => ({
  type: "CHANGE_CAMARAS_LIMIT",
  payload: limit,
});

export const onChangePage = (page) => ({
  type: "CHANGE_CAMARAS_PAGE",
  payload: page,
});

export const onChangeFilterName = (name) => ({
  type: "CHANGE_CAMARAS_FILTER_NAME",
  payload: name,
});

export const onChangeFilterUnits = (units) => ({
  type: "CHANGE_CAMARAS_FILTER_UNITS",
  payload: units,
});

export const onChangeFilterAverageValues = (average_value) => ({
  type: "CHANGE_CAMARAS_FILTER_AVERAGE_VALUES",
  payload: average_value,
});

export const onChangeFilterQualifications = (qualifications) => ({
  type: "CHANGE_CAMARAS_FILTER_QUALIFICATIONS",
  payload: qualifications,
});

export const onChangeFilterCity = (city) => ({
  type: "CHANGE_CAMARAS_FILTER_CITY",
  payload: city,
});

export const onChangeFilterUf = (uf) => ({
  type: "CHANGE_CAMARAS_FILTER_UF",
  payload: uf,
});

export default camarasReducer;
