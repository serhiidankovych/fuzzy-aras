export const setNameConfiguration = (
  alternativeNames,
  criteriaNames,
  linguisticTermsForAlternativesNames,
  linguisticTermsForCriteriaNames,
  expertNames
) => {
  return {
    type: "SET_NAME_CONFIGURATION",
    payload: {
      alternativeNames,
      criteriaNames,
      linguisticTermsForAlternativesNames,
      linguisticTermsForCriteriaNames,
      expertNames,
    },
  };
};
