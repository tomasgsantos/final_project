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

export const calcVarResults = (userRecords) => {
  let pao2Impact = 0;
  let paco2Impact = 0;
  let temperatureImpact = 0;
  let respiratoryFrequencyImpact = 0;

  userRecords.forEach((record) => {
    const { value, sensorPurpose } = record;

    switch (sensorPurpose) {
      case "pao2":
        pao2Impact = ((value - 30)/(108-30))*100; // Example calculation
        break;

      case "paco2":
        paco2Impact = ((value - 35)/(80-35))*100; // Example calculation
        break;

      case "temperature":
        // Calculate the impact for temperature
        // Replace the placeholder calculations with your logic
        temperatureImpact = ((value - 36)/(42-36))*100; // Example calculation
        break;

      case "respiratoryFrequency":
        // Calculate the impact for respiratory frequency
        // Replace the placeholder calculations with your logic
        respiratoryFrequencyImpact = ((value - 10)/(150-10))*100; // Example calculation
        break;

      default:
        break;
    }
  });

  // Calculate the allVariables impact
  const allVariablesImpact =
    (pao2Impact +
      paco2Impact +
      temperatureImpact +
      respiratoryFrequencyImpact) *
    0.25;

  return {
    pao2Impact,
    paco2Impact,
    temperatureImpact,
    respiratoryFrequencyImpact,
    allVariablesImpact,
  };
};

export const calcCatResults = (cat) =>{
  const {cough, phlegm, chest, breathless, activity, energy, sleep, house} = cat

  const catAdd = cough + phlegm + chest + breathless + activity + energy + sleep + house
  const catEq = (catAdd / 40) * 100
  const catFinal = 100 - catEq /* porque quanto menor o valor melhor, tem de ser normalizado para ir de acordo com o resto das variaveis que impactuam o wellness value*/

  return catFinal
}