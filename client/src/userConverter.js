export const convertUser = (data) => {
  if (!data) return null;

  const {
    email,
    password,
    name,
    date_birth_mmddaaaa,
    copd_severity,
    heightincm,
    weightinkg,
  } = data;

  return {
    email,
    password,
    name,
    dateOfBirth: new Date(date_birth_mmddaaaa),
    copdSeverity: copd_severity,
    heightInCm: heightincm,
    weightInKg: weightinkg,
  };
};

export const convertRecords = (data) =>{
  if(!data) return null;

  const {
    paco2, 
    pao2,
    respiratory_freq,
    temperature,
    timestamp,

  } = data;

  return {
    paco2 : paco2,
    pao2 : pao2,
    temperature : temperature,
    respiratory_freq : respiratory_freq,
    timestamp : timestamp,
  }
};
