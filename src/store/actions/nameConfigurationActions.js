export const SET_NAME = "SET_NAME";
export const setNameConfiguration = (
  alternativeNames,
  criteriaNames,
  linguisticTermsForAlternativesNames,
  linguisticTermsForCriteriaNames,
  expertNames
) => {
  return {
    type: SET_NAME,
    payload: {
      alternativeNames,
      criteriaNames,
      linguisticTermsForAlternativesNames,
      linguisticTermsForCriteriaNames,
      expertNames,
    },
  };
};
