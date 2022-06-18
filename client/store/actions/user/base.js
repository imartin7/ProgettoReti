export const setUserData = (user) => {
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

export const setUserFeed = (user) => {
  return {
    type: "SET_USER_FEED",
    user
  }
}
