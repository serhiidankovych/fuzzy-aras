const generateExpertEstimations = (names, type) => {
  const generatedExpertEstimations = [];

  const expertNames = names?.expertNames;
  const alternativeNames = names?.alternativeNames;
  const criteriaNames = names?.criteriaNames;

  const isExpertsType = type === "experts";

  const namesArray = isExpertsType ? expertNames : alternativeNames;

  if (namesArray && criteriaNames) {
    for (let i = 0; i < namesArray.length; i++) {
      for (let j = 0; j < criteriaNames.length; j++) {
        const labelPrefix = isExpertsType ? "e" : "a";
        generatedExpertEstimations.push({
          id: `${labelPrefix}${i + 1}-c${j + 1}`,
          label: `${labelPrefix}${i + 1}-c${j + 1}`,
          alternative: `${labelPrefix}${i + 1}`,
          criteria: `c${j + 1}`,
          selectedLinguisticTerms: [],
        });
      }
    }
  }

  return generatedExpertEstimations;
};

export { generateExpertEstimations };
