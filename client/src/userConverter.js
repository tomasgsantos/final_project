// userConverter.js
export const convertUser = (data) => {
  if (!data) return null;

  const {
    first_name,
    last_name,
    date_of_birth,
    email,
    phone_number,
    address,
    username,
    role,
  } = data;

  return {
    firstName: first_name,
    lastName: last_name,
    dateOfBirth: new Date(date_of_birth),
    email,
    phoneNumber: phone_number,
    address,
    username,
    role,
  };
};
