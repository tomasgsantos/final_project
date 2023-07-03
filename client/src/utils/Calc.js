/*Formulas para o calculo do Wellness Value 

  tanto o calcSitWvStand como o calcWalkWvResults têm falhas na calibração e pessoalmente acho que 
  os valores de calibração devia ser algo fixo definido pelo profissional de saude apropriado, 
  visto que este metodo de calibração é bastante incerto pois depende do estado fisico e psicologico do paciente
  e da vontade que este tem de realizar os testes.
*/


export const calcSitWvStand = (sitStand) => {
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

  let testResults = 50 + finalCount + finalPulsation;
  
  if (testResults > 100){
    testResults = 100;
  }else if (testResults < 0 ){
    testResults = 0
  }
  return testResults;
};

export const calcWalkWvResults = (walkResults) => {
  const calibration = walkResults[0];
  const current = walkResults[1];


  const calPulsation = (calibration.initialpulsation + calibration.finalpulsation) / 2;
  const resPulsation = (current.initialpulsation + current.finalpulsation) / 2;

  const finalPulsation = (calPulsation - resPulsation) * 2;
  const finalSteps = (current.numbersteps - calibration.numbersteps) * 5;

  let testResults = 50 + finalSteps + finalPulsation;

  if(testResults > 100){
    testResults = 100;
  }else if(testResults < 0 ){
    testResults = 0
  }
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
        pao2Impact = ((value - 30) / (108 - 30)) * 100; 
        break;

      case "paco2":
        paco2Impact = ((value - 35) / (80 - 35)) * 100; 
        break;

      case "temperature":      
        temperatureImpact = ((value - 36) / (42 - 36)) * 100; 
        break;

      case "respiratoryFrequency":
        respiratoryFrequencyImpact = ((value - 10) / (150 - 10)) * 100; 
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

export const calcCatResults = (cat) => {
  const { cough, phlegm, chest, breathless, activity, energy, sleep, house } =
    cat;

  const catAdd =
    cough + phlegm + chest + breathless + activity + energy + sleep + house;
  const catEq = (catAdd / 40) * 100;
  const catFinal =
    100 -
    catEq; /* porque quanto menor o valor melhor, tem de ser normalizado para ir de acordo com o resto das variaveis que impactuam o wellness value*/

  return catFinal;
};
