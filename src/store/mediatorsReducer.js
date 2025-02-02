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

const mediatorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_MEDIATORS":
      return {
        ...state,
        currentList: action.mediators,
        count: action.count,
      };
    case "CLEAR_MEDIATORS":
      return initialState;

    case "CHANGE_MEDIATORS_OFFSET":
      return {
        ...state,
        offset: action.payload,
      };

    case "CHANGE_MEDIATORS_LIMIT":
      return {
        ...state,
        limit: action.payload,
      };

    case "CHANGE_MEDIATORS_PAGE":
      return {
        ...state,
        page: action.payload,
      };

    case "CHANGE_MEDIATORS_FILTER_NAME":
      return {
        ...state,
        filters: {
          ...state.filters,
          filterName: action.payload,
        },
      };

    case "CHANGE_MEDIATORS_FILTER_UNITS":
      return {
        ...state,
        filters: {
          ...state.filters,
          filterUnits: action.payload,
        },
      };

    case "CHANGE_MEDIATORS_FILTER_AVERAGE_VALUES":
      return {
        ...state,
        filters: {
          ...state.filters,
          filterAverageValues: action.payload,
        },
      };

    case "CHANGE_MEDIATORS_FILTER_QUALIFICATIONS":
      return {
        ...state,
        filters: {
          ...state.filters,
          filterQualifications: action.payload,
        },
      };

    case "CHANGE_MEDIATORS_FILTER_CITY":
      return {
        ...state,
        filters: {
          ...state.filters,
          filterCity: action.payload,
        },
      };

    case "CHANGE_MEDIATORS_FILTER_UF":
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

export const initMediators = (mediators, count) => ({
  type: "ADD_MEDIATORS",
  mediators,
  count,
});

export const onChangeOffset = (offset) => ({
  type: "CHANGE_MEDIATORS_OFFSET",
  payload: offset,
});

export const onChangeLimit = (limit) => ({
  type: "CHANGE_MEDIATORS_LIMIT",
  payload: limit,
});

export const onChangePage = (page) => ({
  type: "CHANGE_MEDIATORS_PAGE",
  payload: page,
});

export const onChangeFilterName = (name) => ({
  type: "CHANGE_MEDIATORS_FILTER_NAME",
  payload: name,
});

export const onChangeFilterUnits = (units) => ({
  type: "CHANGE_MEDIATORS_FILTER_UNITS",
  payload: units,
});

export const onChangeFilterAverageValues = (average_value) => ({
  type: "CHANGE_MEDIATORS_FILTER_AVERAGE_VALUES",
  payload: average_value,
});

export const onChangeFilterQualifications = (qualifications) => ({
  type: "CHANGE_MEDIATORS_FILTER_QUALIFICATIONS",
  payload: qualifications,
});

export const onChangeFilterCity = (city) => ({
  type: "CHANGE_MEDIATORS_FILTER_CITY",
  payload: city,
});

export const onChangeFilterUf = (uf) => ({
  type: "CHANGE_MEDIATORS_FILTER_UF",
  payload: uf,
});

export default mediatorsReducer;
