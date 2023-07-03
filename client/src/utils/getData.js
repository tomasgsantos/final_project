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

export const getSitWvStand = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${dbPort}/api/sitWvStand`, {
    headers: {
      Authorization: `Bearer ${token} `,
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Failed to fetch SitWv to Stand Data");
  }
};

export const getWalkWvTest = async () =>{
  const token = localStorage.getItem('token');
  const response = await fetch(`${dbPort}/api/walkWvTest`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  }
}

export const getAllWalkData = async () =>{
  const token = localStorage.getItem('token');
  const response = await fetch(`${dbPort}/api/allWalkData`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  }
export const getAllSitData = async () =>{
  const token = localStorage.getItem('token');
  const response = await fetch(`${dbPort}/api/allSitData`, {
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

export const getWV = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${dbPort}/api/getWV`,{
    headers:{
      Authorization: 'Bearer ' + token,
    },
  });
  if(response.ok){
    const data = await response.json();
    return data;
  }
}

export const getAllWv = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${dbPort}/api/getWvChart`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  if(response.ok){
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
  const response = await fetch(`${dbPort}/api/getSensor/${id}`, {
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
