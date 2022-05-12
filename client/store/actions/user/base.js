export const setUserData = (user) => {
  console.log("DATA: ", user)
  return {
    type: "SET_USER_DATA",
    user
  }
}