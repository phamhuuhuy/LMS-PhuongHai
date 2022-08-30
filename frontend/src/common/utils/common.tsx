export const setHeader = () => {
  const token = JSON.parse(localStorage.getItem("user") as any)?.accessToken;

  console.log("token:", token);
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
