const user = {};

export const getUser = () => user;
export const setUser = data => {
  Object.assign(user, data);
};
