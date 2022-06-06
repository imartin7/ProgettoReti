export const setUserData = (user) => {
  console.log("USER: ", user)
  return {
    type: "SET_USER_DATA",
    user
  }
}

export const cleanUserData = (user) => {
  return {
    type: "CLEAN_USER_DATA",
    user
  }
}