export const ADD_ALTERNATIVE = "ADD_ALTERNATIVE";
export const UPDATE_ALTERNATIVE = "UPDATE_ALTERNATIVE";
export const SET_ALTERNATIVE = "SET_ALTERNATIVE";

export const setAlternativeConfiguration = (linguisticTerms) => ({
  type: SET_ALTERNATIVE,
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
