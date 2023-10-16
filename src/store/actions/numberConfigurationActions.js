export const setNumberConfiguration = (
  numberOfAlternatives,
  numberOfCriteria,
  numberOfLinguisticTermsForAlternatives,
  numberOfLinguisticTermsForCriteria,
  numberOfExperts
) => {
  return {
    type: "SET_NUMBER_CONFIGURATION",
    payload: {
      numberOfAlternatives,
      numberOfCriteria,
      numberOfLinguisticTermsForAlternatives,
      numberOfLinguisticTermsForCriteria,
      numberOfExperts,
    },
  };
};
