const initialState = {
  accountType: "usuario",
  personal: {
    cpf: "",
    fullname: "",
    sex: "",
    birthday: "2000-01-01",
  },
  professional: {
    certification: "",
    average_value: "",
    attachment: "",
    specialization: [],
    lattes: "",
    resume: "",
    actuation_units: [],
    actuation_city: "",
    actuation_uf: "",
  },
  contact: {
    email: "",
    alternative_email: "",
    phone: "",
    cellphone: "",
  },
  confirm: {
    password: "",
    acceptTerms: false,
  },
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_ACCOUNTTYPE":
      return { ...state, accountType: action.payload };
    case "UPDATE_PERSONAL":
      return { ...state, personal: action.payload };
    case "UPDATE_PROFESSIONAL":
      return { ...state, professional: action.payload };
    case "UPDATE_CONTACT":
      return { ...state, contact: action.payload };
    case "UPDATE_CONFIRM":
      return { ...state, confirm: action.payload };
    case "RESET_FORM":
      return { ...initialState };
    default:
      return state;
  }
};

export const submitAccountType = (accountType) => ({
  type: "UPDATE_ACCOUNTTYPE",
  payload: accountType,
});

export const submitPersonal = (personal) => ({
  type: "UPDATE_PERSONAL",
  payload: personal,
});

export const submitProfessional = (professional) => ({
  type: "UPDATE_PROFESSIONAL",
  payload: professional,
});

export const submitContact = (contact) => ({
  type: "UPDATE_CONTACT",
  payload: contact,
});

export const submitConfirm = (confirm) => ({
  type: "UPDATE_CONFIRM",
  payload: confirm,
});

export const resetForm = () => ({
  type: "RESET_FORM",
});

export const submitForm = (formData) => {
  console.log(formData);
};

export default authReducer;
