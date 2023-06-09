const dbPort = "http://localhost:5001";

export const postCat = async (formData) =>{
  const {cough, phlegm, chest, breathless, activity, house, sleep, energy} = formData
  const token = localStorage.getItem("token")

  if (
    cough.length === 0 ||
    phlegm.length === 0 ||
    chest.length === 0 ||
    breathless.length === 0 ||
    activity.length === 0 ||
    house.length === 0 ||
    sleep.length === 0 ||
    energy.length === 0 
  ){
    alert("Please fill all the fields");
  }else{
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
  }
} ;