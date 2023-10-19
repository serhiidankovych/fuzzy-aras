import {
  SET_CRITERIA,
  ADD_CRITERIA,
  UPDATE_CRITERIA,
} from "../actions/criteriaConfigurationActions";

const initialState = {
  criteriaLinguisticTerms: [],
};

const criteriaConfigurationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CRITERIA:
      return {
        ...state,
        criteriaLinguisticTerms: action.payload,
      };

    case ADD_CRITERIA:
      return {
        ...state,
        criteriaLinguisticTerms: [
          ...state.criteriaLinguisticTerms,
          action.payload,
        ],
      };

    case UPDATE_CRITERIA:
      const updatedTerms = state.criteriaLinguisticTerms.map((term) =>
        term.criteriaLinguisticTerms === action.payload.criteriaLinguisticTerms
          ? action.payload
          : term
      );
      return {
        ...state,
        criteriaLinguisticTerms: updatedTerms,
      };

    default:
      return state;
  }
};

export default criteriaConfigurationReducer;