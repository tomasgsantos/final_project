const dbPort = "http://localhost:5001";

export const getUserData = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${dbPort}/api/userData`, {
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

export const getSitStand = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${dbPort}/api/sitStand`, {
    headers: {
      Authorization: `Bearer ${token} `,
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Failed to fetch Sit to Stand Data");
  }
};

export const getWalkTest = async () =>{
  const token = localStorage.getItem('token');
  const response = await fetch(`${dbPort}/api/walkTest`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  }
}

export const getCat = async ()=>{
  const token = localStorage.getItem('token');
  const response = await fetch(`${dbPort}/api/cat`,{
    headers: {
      Authorization: `Bearer ${token}`,
  },
});
  if(response.ok) {
    const data = await response.json();
    return data;
  }
}

export const getRecord = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${dbPort}/api/record`, {
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

export const getChartData = async (id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`dbPort/api/getSensor/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Failed to fetch Chart data");
  }
};

export const getFaq = async () => {
  const response = await fetch(`${dbPort}/api/getFaq`);
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Failed to fetch Faq data");
  }
};

// export const getAllRecords = async () =>{
//   const token = localStorage.getItem("token")
//   const response = await fetch(`${dbPort}/api/allRecords`,{
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
