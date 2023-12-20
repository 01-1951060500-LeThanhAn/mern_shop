export const saveToken = (token) => {
  localStorage.setItem("tokenAdmmin", JSON.stringify(token));
};
