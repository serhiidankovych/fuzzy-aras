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

const findMinValue = (arr) => {
  return Math.min(...arr);
};
const findMinValues = (data) => {
  const minValues = {};
  for (const key in data) {
    minValues[key] = findMinValue(data[key]);
  }
  return minValues;
};

const findMaxValue = (arr) => {
  return Math.max(...arr);
};
const findMaxValues = (data) => {
  const minValues = {};
  for (const key in data) {
    minValues[key] = findMaxValue(data[key]);
  }
  return minValues;
};

const calculatePerformanceRating = (confines, experts) => {
  return Math.pow(confines[0] * confines[1] * confines[2], 1 / experts);
};

const getIntervalValuedNumbers = (estimation, experts) => {
  const intervalValuedNumbers = {};
  const leftConfines = {};
  const middleConfines = {};
  const rightConfines = {};

  const leftPerformanceRating = {};
  const middlePerformanceRating = {};
  const rightPerformanceRating = {};

  Object.keys(estimation).forEach((itemId) => {
    const currentItem = estimation[itemId];

    const left = currentItem.confines[0];
    const middle = currentItem.confines[1];
    const right = currentItem.confines[2];

    const key = itemId.split("-");
    const criteriaKey = key[1];

    if (!leftConfines[criteriaKey]) {
      leftConfines[criteriaKey] = [];
    }

    if (!rightConfines[criteriaKey]) {
      rightConfines[criteriaKey] = [];
    }
    if (!middleConfines[criteriaKey]) {
      middleConfines[criteriaKey] = [];
    }

    leftConfines[criteriaKey].push(left);
    middleConfines[criteriaKey].push(middle);
    rightConfines[criteriaKey].push(right);

    if (!leftPerformanceRating[criteriaKey]) {
      leftPerformanceRating[criteriaKey] = [];
    }
    leftPerformanceRating[criteriaKey] = calculatePerformanceRating(
      leftConfines[criteriaKey],
      experts
    );
    middlePerformanceRating[criteriaKey] = calculatePerformanceRating(
      middleConfines[criteriaKey],
      experts
    );
    rightPerformanceRating[criteriaKey] = calculatePerformanceRating(
      rightConfines[criteriaKey],
      experts
    );
  });

  const minLeftConfines = findMinValues(leftConfines);
  const maxRightConfines = findMaxValues(rightConfines);

  Object.keys(minLeftConfines).forEach((itemId) => {
    intervalValuedNumbers[itemId] = [
      minLeftConfines[itemId],
      leftPerformanceRating[itemId],
      middlePerformanceRating[itemId],
      rightPerformanceRating[itemId],
      maxRightConfines[itemId],
    ];
  });

  return intervalValuedNumbers;
};

export { generateExpertEstimations, getIntervalValuedNumbers };
