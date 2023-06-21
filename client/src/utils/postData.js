const dbPort = "http://localhost:5001";

export const postCat = async (formData) =>{
  const {cough, phlegm, chest, breathless, activity, house, sleep, energy} = formData
  const token = localStorage.getItem("token")

    await fetch(`${dbPort}/api/cat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        cough: cough,
        phlegm: phlegm,
        chest: chest,
        breathless: breathless,
        activity: activity,
        house: house,
        sleep: sleep,
        energy: energy,
      }),
    });
  };