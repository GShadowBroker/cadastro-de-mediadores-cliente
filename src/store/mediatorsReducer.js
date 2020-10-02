const initialState = {
  mediators: [],
  mediatorsCount: 0,
  camaras: [],
  camarasCount: 0,
};

const mediatorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_MEDIATORS":
      return {
        ...state,
        mediators: action.mediators,
        mediatorsCount: action.count,
      };
    case "CLEAR_MEDIATORS":
      return {
        ...state,
        mediators: initialState.mediators,
        mediatorsCount: initialState.mediatorsCount,
      };
    case "ADD_CAMARAS":
      return { ...state, camaras: action.camaras, camarasCount: action.count };
    case "CLEAR_CAMARAS":
      return {
        ...state,
        camaras: initialState.camaras,
        camarasCount: initialState.camarasCount,
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

export const initCamaras = (camaras, count) => ({
  type: "ADD_CAMARAS",
  camaras,
  count,
});

export default mediatorsReducer;
