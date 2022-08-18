export const setHeader = () => {
  const token = JSON.parse(localStorage.getItem("user") as any)?.accessToken;
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
