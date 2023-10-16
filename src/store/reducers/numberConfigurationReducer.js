export const SET_NUMBER_CONFIGURATION = "SET_NUMBER_CONFIGURATION";

const initialState = {
  numberOfAlternatives: 0,
  numberOfCriteria: 0,
  numberOfLinguisticTermsForAlternatives: 0,
  numberOfLinguisticTermsForCriteria: 0,
  numberOfExperts: 0,
};

const numberConfigurationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NUMBER_CONFIGURATION:
      return {
        ...state,
        numberOfAlternatives: action.payload.numberOfAlternatives,
        numberOfCriteria: action.payload.numberOfCriteria,
        numberOfLinguisticTermsForAlternatives:
          action.payload.numberOfLinguisticTermsForAlternatives,
        numberOfLinguisticTermsForCriteria:
          action.payload.numberOfLinguisticTermsForCriteria,
        numberOfExperts: action.payload.numberOfExperts,
      };
    default:
      return state;
  }
};

export default numberConfigurationReducer;
