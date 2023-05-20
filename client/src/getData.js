export const getUserData = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:5001/api/userData", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Failed to fetch user data");
  }
};

export const getRecord = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:5001/api/record", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Failed to fetch records");
  }
};

// export const getAllRecords = async () =>{
//   const token = localStorage.getItem("token")
//   const response = await fetch("http://localhost:5001/api/allRecords",{
//     headers:{
//       Authorization: "Bearer" + token,
//     },
//   });
//   if(response.ok){
//     const data = await response.json()
//     return data;
//   }else{
//     throw new Error("Failed to fetch all records")
//   }
// }
