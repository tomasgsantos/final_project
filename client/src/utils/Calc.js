export const calcSitStand = (sitStand) => {
  const sitStandResults = sitStand[0];
  const sitStandCalibration = sitStand[1];

  const calPulsation =
    (sitStandCalibration.initialpulsation +
      sitStandCalibration.finalpulsation) /
    2;
  const resPulsation =
    (sitStandResults.initialpulsation + sitStandResults.finalpulsation) / 2;

  const finalPulsation = (calPulsation - resPulsation) * 2;
  const finalCount =
    (sitStandCalibration.countcycles - sitStandResults.countcycles) * 5;

  const testResults = 50 + finalCount + finalPulsation;

  return testResults
};

export const calcWalkResults = (walkResults) => {
  const calibration = walkResults[0];
  const current = walkResults[1];

  const calPulsation =
    (calibration.initialpulsation +
      calibration.finalpulsation) /
    2;
  const resPulsation =
    (current.initialpulsation + current.finalpulsation) / 2;

  const finalPulsation = (calPulsation - resPulsation) * 2;
  const finalSteps =
    (calibration.numbersteps - current.numbersteps) * 5;

  const testResults = 50 + finalSteps + finalPulsation;

  return testResults;
};