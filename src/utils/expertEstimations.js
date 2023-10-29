const generateExpertEstimations = (
  expertNumbers,
  alternativeNumbers,
  criteriaNumbers
) => {
  const generatedExpertEstimations = {};

  for (let i = 0; i < expertNumbers; i++) {
    for (let j = 0; j < alternativeNumbers; j++) {
      for (let y = 0; y < criteriaNumbers; y++) {
        const key = `e${i + 1}-a${j + 1}-c${y + 1}`;
        generatedExpertEstimations[key] = {
          data: {
            id: 0,
            linguisticTerm: "",
            confines: [0, 0, 0],
            normalizedConfines: [0, 0, 0],
          },
          criteria: y + 1,
          alternative: j + 1,
          expertId: i + 1,
        };
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
  const multiplyConfines = confines.reduce((accumulator, currentValue) => {
    return accumulator * currentValue;
  }, 1);

  return Math.pow(multiplyConfines, 1 / experts);
};

const getAlternativesIntervalValuedNumbers = (estimation, experts) => {
  const intervalValuedNumbers = {};

  const leftConfines = {};
  const middleConfines = {};
  const rightConfines = {};

  const leftPerformanceRating = {};
  const middlePerformanceRating = {};
  const rightPerformanceRating = {};

  console.log(estimation);
  Object.keys(estimation).forEach((itemId) => {
    estimation[itemId].data.forEach((item) => {
      const left = item.normalizedConfines[0];
      const middle = item.normalizedConfines[1];
      const right = item.normalizedConfines[2];

      const criteriaKey = itemId;

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

      if (!middlePerformanceRating[criteriaKey]) {
        middlePerformanceRating[criteriaKey] = [];
      }
      if (!rightPerformanceRating[criteriaKey]) {
        rightPerformanceRating[criteriaKey] = [];
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

    return intervalValuedNumbers;
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
  console.log(intervalValuedNumbers);
  return intervalValuedNumbers;
};

const getCriteriaIntervalValuedNumbers = (estimation, experts) => {
  const intervalValuedNumbers = {};
  const leftConfines = {};
  const middleConfines = {};
  const rightConfines = {};

  const leftPerformanceRating = {};
  const middlePerformanceRating = {};
  const rightPerformanceRating = {};

  Object.keys(estimation).forEach((itemId) => {
    const currentItem = estimation[itemId];

    const left = currentItem.normalizedConfines[0];
    const middle = currentItem.normalizedConfines[1];
    const right = currentItem.normalizedConfines[2];

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

    if (!middlePerformanceRating[criteriaKey]) {
      middlePerformanceRating[criteriaKey] = [];
    }
    if (!rightPerformanceRating[criteriaKey]) {
      rightPerformanceRating[criteriaKey] = [];
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

const aggregateEstimations = (selectedItems) => {
  const aggregatedEstimations = {};
  for (const key in selectedItems) {
    const item = selectedItems[key];
    const { alternative, criteria, expertId, data } = item;
    const aggregationKey = `a${alternative}-c${criteria}`;

    // Create the aggregation key if it doesn't exist
    if (!aggregatedEstimations[aggregationKey]) {
      aggregatedEstimations[aggregationKey] = {
        alternative: alternative,
        criteria: criteria,
        experts: [expertId],
        data: [data],
      };
    } else {
      // If the aggregation key already exists, push the data to the existing object
      aggregatedEstimations[aggregationKey].experts.push(expertId);
      aggregatedEstimations[aggregationKey].data.push(data);
    }
  }
  return aggregatedEstimations;
};

export {
  generateExpertEstimations,
  getCriteriaIntervalValuedNumbers,
  getAlternativesIntervalValuedNumbers,
  aggregateEstimations,
};
