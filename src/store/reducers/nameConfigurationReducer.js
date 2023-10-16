export const SET_NAME_CONFIGURATION = "SET_NAME_CONFIGURATION";

const initialState = {
  alternativeNames: [],
  criteriaNames: [],
  linguisticTermsForAlternativesNames: [],
  linguisticTermsForCriteriaNames: [],
  expertNames: [],
};
const nameConfigurationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NAME_CONFIGURATION:
      return {
        ...state,
        alternativeNames: action.payload.alternativeNames,
        criteriaNames: action.payload.criteriaNames,
        linguisticTermsForAlternativesNames:
          action.payload.linguisticTermsForAlternativesNames,
        linguisticTermsForCriteriaNames:
          action.payload.linguisticTermsForCriteriaNames,
        expertNames: action.payload.expertNames,
      };
    default:
      return state;
  }
};

export default nameConfigurationReducer;
