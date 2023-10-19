const transformToTriangleForm = (linguisticTerms, setLinguisticTerms) => {
  let minTriangularNumber = Infinity; // Initialize with a high value
  let maxTriangularNumber = -Infinity; // Initialize with a low value

  const triangularNumbers = linguisticTerms?.map((linguisticTerm) => {
    const { confines } = linguisticTerm;
    return {
      ...linguisticTerm,
      triangularChart: [
        { x: confines[0], y: 0 },
        { x: confines[1], y: 1 },
        { x: confines[2], y: 0 },
      ],
    };
  });

  triangularNumbers?.forEach((triangularNumber) => {
    const { triangularChart } = triangularNumber;
    triangularChart.forEach((point) => {
      minTriangularNumber = Math.min(minTriangularNumber, point.x);
      maxTriangularNumber = Math.max(maxTriangularNumber, point.x);
    });
  });

  const triangularNumbersNormalized = triangularNumbers?.map(
    (linguisticTerm) => {
      const { confines } = linguisticTerm;
      return {
        ...linguisticTerm,
        normalizedConfines: [
          normalizeValue(confines[0], minTriangularNumber, maxTriangularNumber),
          normalizeValue(confines[1], minTriangularNumber, maxTriangularNumber),
          normalizeValue(confines[2], minTriangularNumber, maxTriangularNumber),
        ],
        normalizedTriangularChart: [
          {
            x: normalizeValue(
              confines[0],
              minTriangularNumber,
              maxTriangularNumber
            ),
            y: 0,
          },
          {
            x: normalizeValue(
              confines[1],
              minTriangularNumber,
              maxTriangularNumber
            ),
            y: 1,
          },
          {
            x: normalizeValue(
              confines[2],
              minTriangularNumber,
              maxTriangularNumber
            ),
            y: 0,
          },
        ],
      };
    }
  );

  setLinguisticTerms(triangularNumbersNormalized);
};
const normalizeValue = (value, minTriangularNumber, maxTriangularNumber) => {
  if (value === 0 && minTriangularNumber === 0 && maxTriangularNumber === 0) {
    return 0;
  } else {
    return (
      (value - minTriangularNumber) /
      (maxTriangularNumber - minTriangularNumber)
    );
  }
};

const generateContrastColor = (index, total) => {
  // Calculate hue to evenly distribute colors in the color spectrum
  const hue = (360 / total) * index;

  // Convert HSL to RGB color
  const h = hue / 360;
  const r = Math.round(255 * hue2rgb(h + 1 / 3));
  const g = Math.round(255 * hue2rgb(h));
  const b = Math.round(255 * hue2rgb(h - 1 / 3));

  return `rgb(${r}, ${g}, ${b})`;
};

const hue2rgb = (p) => {
  if (p < 0) p += 1;
  if (p > 1) p -= 1;
  if (p < 1 / 6) return 6 * p;
  if (p < 0.5) return 1;
  if (p < 2 / 3) return (2 / 3 - p) * 6;
  return 0;
};

const handleLinguisticTermsChange = (
  index,
  value,
  confinesIndex,
  linguisticTerms,
  setLinguisticTerms
) => {
  const updatedLinguisticTerms = [...linguisticTerms];

  updatedLinguisticTerms[index] = {
    ...updatedLinguisticTerms[index],
    confines: [
      ...updatedLinguisticTerms[index].confines.slice(0, confinesIndex),
      value === "" ? "" : Number(value),
      ...updatedLinguisticTerms[index].confines.slice(confinesIndex + 1),
    ],
  };

  transformToTriangleForm(updatedLinguisticTerms, setLinguisticTerms);
};

export {
  transformToTriangleForm,
  normalizeValue,
  generateContrastColor,
  hue2rgb,
  handleLinguisticTermsChange,
};