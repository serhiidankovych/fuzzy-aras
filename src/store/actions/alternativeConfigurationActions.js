export const ADD_ALTERNATIVE = "ADD_ALTERNATIVE";
export const UPDATE_ALTERNATIVE = "UPDATE_ALTERNATIVE";
export const SET_ALTERNATIVES_LT = "SET_ALTERNATIVES_LT";

export const setAlternativeConfiguration = (linguisticTerms) => ({
  type: SET_ALTERNATIVES_LT,
  payload: linguisticTerms,
});

export const addAlternativeConfiguration = (alternativeLinguisticTerm) => ({
  type: ADD_ALTERNATIVE,
  payload: alternativeLinguisticTerm,
});

export const updateAlternativeConfiguration = (alternativeLinguisticTerm) => ({
  type: UPDATE_ALTERNATIVE,
  payload: alternativeLinguisticTerm,
});
