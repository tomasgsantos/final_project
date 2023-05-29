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
    role,
  } = data;

  return {
    email,
    password,
    name,
    dateOfBirth: new Date(date_birth_mmddaaaa),
    copdSeverity: copd_severity,
    heightInCm: heightincm,
    weightInKg: weightinkg,
    role,
  };
};


export const convertRecords = (data) => {
  if (!data) return null;

  let parsedData = data;
  if (typeof data === "string") {
    try {
      parsedData = JSON.parse(data);
    } catch (error) {
      console.error("Error parsing JSON data:", error);
      return null;
    }
  }

  return parsedData.map((record) => {
    const { value, timestamp, sensor_purpose } = record;

    return {
      value,
      timestamp,
      sensorPurpose: sensor_purpose,
    };
  });
};
