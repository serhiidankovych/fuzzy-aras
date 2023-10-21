export const ADD_CRITERIA = "ADD_CRITERIA";
export const UPDATE_CRITERIA = "UPDATE_CRITERIA";
export const SET_CRITERIA_LT = "SET_CRITERIA_LT";

export const setCriteriaConfiguration = (linguisticTerms) => ({
  type: SET_CRITERIA_LT,
  payload: linguisticTerms,
});

export const addCriteriaConfiguration = (criteriaLinguisticTerm) => ({
  type: ADD_CRITERIA,
  payload: criteriaLinguisticTerm,
});

export const updateCriteriaConfiguration = (criteriaLinguisticTerm) => ({
  type: UPDATE_CRITERIA,
  payload: criteriaLinguisticTerm,
});
